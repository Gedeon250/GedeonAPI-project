/* ===== VIDEO CALL APPLICATION ===== */

// #1 - Initialize Agora RTC Client
const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});

// #2 - Configuration object - AGORA SETUP
const config = {
    // Your Agora App ID (Free tier: 10,000 minutes per month)
    appid: '5a0fbb96ac9d41f6bb111b397a5f1930',
    
    // Token: Generated from Agora Console for channel 'test-channel'
    // This token will expire in 24 hours - generate a new one when needed
    token: '007eJxTYNjLkbfmu8w6s+bzBod+vva2XThHxHX/wml3b5nGLtLaIZemwGCaaJCWlGRplphsmWJimGaWlGRoaJhkbGmeaJpmaGlskFJfl9EQyMhwSWs+AyMUgvg8DCWpxSW6yRmJeXmpOQwMALWcI2g=',
    
    uid: null, // Will be set from username input
    channel: 'test-channel', // You can change this channel name
    demoMode: false, // Will auto-enable if credentials are invalid
};

// Instructions for getting FREE Agora credentials:
// 1. Go to https://console.agora.io/
// 2. Sign up for a FREE account
// 3. Create a new project
// 4. Get your App ID from the project dashboard
// 5. Replace 'YOUR_FREE_APP_ID_HERE' with your actual App ID
// 6. For testing: leave token as null
// 7. For production: generate a temporary token in the Agora console

// Demo mode flag - automatically enabled if Agora credentials fail
let isDemoMode = false;

// #3 - Local tracks for the current user
let localTracks = {
    audioTrack: null,
    videoTrack: null,
};

// #4 - State management for local user's audio/video
let localTrackState = {
    audioTrackMuted: false,
    videoTrackMuted: false,
};

// #5 - Remote tracks to store other users
let remoteTracks = {};


/* ===== EVENT HANDLERS ===== */

// Join button event handler with enhanced validation
document.getElementById('join-btn').addEventListener('click', async () => {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    
    // Enhanced username validation
    const validation = validateUsername(username);
    if (!validation.valid) {
        showNotification(validation.message, 'error');
        usernameInput.focus();
        usernameInput.select(); // Select text for easy correction
        return;
    }
    
    config.uid = username;
    
    // Disable join button to prevent multiple clicks
    const joinBtn = document.getElementById('join-btn');
    joinBtn.disabled = true;
    joinBtn.textContent = 'Joining...';
    
    try {
        await joinStreams();
        toggleUI('call');
    } catch (error) {
        console.error('Failed to join stream:', error);
        
        // Check for different types of credential errors and enable demo mode
        if (error.message && (
            error.message.includes('invalid vendor key') ||
            error.message.includes('dynamic use static key') ||
            error.message.includes('CAN_NOT_GET_GATEWAY_SERVER')
        )) {
            isDemoMode = true;
            
            if (error.message.includes('dynamic use static key')) {
                showNotification('Token required! Generate a token from Agora Console - Running in demo mode', 'error');
            } else {
                showNotification('Invalid Agora credentials - Running in demo mode', 'error');
            }
            
            startDemoMode();
            toggleUI('call');
        } else {
            showNotification('Failed to join the call. Please try again.', 'error');
        }
    } finally {
        // Re-enable join button
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join Stream';
    }
});

// Microphone toggle event handler
document.getElementById('mic-btn').addEventListener('click', async () => {
    if (!localTracks.audioTrack) return;
    
    try {
        const micBtn = document.getElementById('mic-btn');
        
        if (!localTrackState.audioTrackMuted) {
            await localTracks.audioTrack.setMuted(true);
            localTrackState.audioTrackMuted = true;
            micBtn.style.backgroundColor = 'rgba(255, 80, 80, 0.8)';
            showNotification('Microphone muted', 'info');
        } else {
            await localTracks.audioTrack.setMuted(false);
            localTrackState.audioTrackMuted = false;
            micBtn.style.backgroundColor = 'var(--secondary-color)';
            showNotification('Microphone unmuted', 'info');
        }
    } catch (error) {
        console.error('Failed to toggle microphone:', error);
        showNotification('Failed to toggle microphone', 'error');
    }
});

// Camera toggle event handler
document.getElementById('camera-btn').addEventListener('click', async () => {
    if (!localTracks.videoTrack) return;
    
    try {
        const cameraBtn = document.getElementById('camera-btn');
        
        if (!localTrackState.videoTrackMuted) {
            await localTracks.videoTrack.setMuted(true);
            localTrackState.videoTrackMuted = true;
            cameraBtn.style.backgroundColor = 'rgba(255, 80, 80, 0.8)';
            showNotification('Camera turned off', 'info');
        } else {
            await localTracks.videoTrack.setMuted(false);
            localTrackState.videoTrackMuted = false;
            cameraBtn.style.backgroundColor = 'var(--secondary-color)';
            showNotification('Camera turned on', 'info');
        }
    } catch (error) {
        console.error('Failed to toggle camera:', error);
        showNotification('Failed to toggle camera', 'error');
    }
});

// Leave call event handler
document.getElementById('leave-btn').addEventListener('click', async () => {
    try {
        // Stop and close all local tracks
        for (const trackName in localTracks) {
            const track = localTracks[trackName];
            if (track) {
                track.stop();
                track.close();
                localTracks[trackName] = null;
            }
        }
        
        // Leave the channel
        await client.leave();
        
        // Reset UI and state
        toggleUI('join');
        remoteTracks = {};
        
        // Reset button styles
        document.getElementById('mic-btn').style.backgroundColor = 'var(--secondary-color)';
        document.getElementById('camera-btn').style.backgroundColor = 'var(--secondary-color)';
        
        // Reset track states
        localTrackState.audioTrackMuted = false;
        localTrackState.videoTrackMuted = false;
        
        showNotification('You left the call', 'info');
    } catch (error) {
        console.error('Failed to leave call:', error);
        showNotification('Error leaving the call', 'error');
    }
});

/* ===== UTILITY FUNCTIONS ===== */

// Toggle UI between join screen and call screen
function toggleUI(mode) {
    const joinWrapper = document.getElementById('join-wrapper');
    const footer = document.getElementById('footer');
    const userStreams = document.getElementById('user-streams');
    
    if (mode === 'call') {
        joinWrapper.style.display = 'none';
        footer.style.display = 'flex';
        
        // Show demo mode indicator if active
        if (isDemoMode) {
            showDemoModeIndicator();
        }
    } else {
        joinWrapper.style.display = 'block';
        footer.style.display = 'none';
        userStreams.innerHTML = '';
        hideDemoModeIndicator();
    }
}

// Validate username input with enhanced checks
function validateUsername(username) {
    if (!username || username.trim().length === 0) {
        return { valid: false, message: 'Please enter your name before joining' };
    }
    
    if (username.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long' };
    }
    
    if (username.trim().length > 50) {
        return { valid: false, message: 'Name must be less than 50 characters' };
    }
    
    // Check for special characters that might cause issues
    if (!/^[a-zA-Z0-9\s_-]+$/.test(username.trim())) {
        return { valid: false, message: 'Name can only contain letters, numbers, spaces, hyphens, and underscores' };
    }
    
    return { valid: true, message: 'Valid username' };
}

// Demo mode functions
function showDemoModeIndicator() {
    let demoIndicator = document.getElementById('demo-indicator');
    if (!demoIndicator) {
        demoIndicator = document.createElement('div');
        demoIndicator.id = 'demo-indicator';
        demoIndicator.innerHTML = `
            <div style="
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #ff6b6b;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                z-index: 10001;
                font-family: var(--font-primary);
                font-size: 0.9rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                cursor: pointer;
            " onclick="window.open('https://console.agora.io/', '_blank')">
                🆓 DEMO MODE - Click here to get FREE Agora credentials (10,000 min/month)
            </div>
        `;
        document.body.appendChild(demoIndicator);
    }
}

function hideDemoModeIndicator() {
    const demoIndicator = document.getElementById('demo-indicator');
    if (demoIndicator) {
        demoIndicator.remove();
    }
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            transition: opacity 0.3s ease;
            font-family: var(--font-primary);
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const colors = {
        info: '#00b894',
        error: '#e74c3c',
        success: '#2ecc71'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    notification.style.opacity = '1';
    
    // Auto-hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}

// Create video player HTML with accessibility attributes
function createVideoPlayer(uid) {
    return `
        <div class="video-containers" id="video-wrapper-${uid}" role="region" aria-label="Video stream for ${uid}">
            <p class="user-uid" aria-label="User information">
                <img class="volume-icon" id="volume-${uid}" src="./assets/volume-on.svg" alt="Volume indicator for ${uid}" />
                <span>${uid}</span>
            </p>
            <div class="video-player player" id="stream-${uid}" aria-label="Video player for ${uid}"></div>
        </div>
    `;
}

/* ===== DEMO MODE FUNCTIONS ===== */

/**
 * Starts demo mode when Agora credentials are invalid
 * This allows users to see the interface without actual video calling
 */
function startDemoMode() {
    console.log('Starting demo mode - simulating video call interface');
    
    // Create a demo video placeholder
    const demoPlayerHTML = `
        <div class="video-containers demo-container" id="video-wrapper-${config.uid}" role="region" aria-label="Demo video stream">
            <p class="user-uid" aria-label="Demo user information">
                <img class="volume-icon" id="volume-${config.uid}" src="./assets/volume-on.svg" alt="Volume indicator" />
                <span>${config.uid} (Demo)</span>
            </p>
            <div class="video-player player demo-player" id="stream-${config.uid}">
                <div class="demo-content">
                    <div class="demo-avatar">🆓</div>
                    <h3>Demo Mode Active</h3>
                    <p><strong>Get FREE Agora credentials!</strong></p>
                    <p>✅ 10,000 minutes/month FREE</p>
                    <p>✅ No credit card required</p>
                    <p>✅ 5 minutes to setup</p>
                    <a href="https://console.agora.io/" target="_blank" rel="noopener noreferrer" class="demo-link">
                        🚀 Get Free Credentials Now
                    </a>
                    <p class="demo-small">Then update your App ID in script.js</p>
                </div>
            </div>
        </div>
    `;
    
    // Add demo styles if they don't exist
    addDemoStyles();
    
    // Insert the demo player
    document.getElementById('user-streams').insertAdjacentHTML('beforeend', demoPlayerHTML);
    
    showNotification('Demo mode active - Interface preview only', 'info');
}

/**
 * Adds styles for demo mode elements
 */
function addDemoStyles() {
    let demoStyles = document.getElementById('demo-styles');
    if (!demoStyles) {
        demoStyles = document.createElement('style');
        demoStyles.id = 'demo-styles';
        demoStyles.textContent = `
            .demo-container {
                border: 3px dashed #00b894;
                background: rgba(0, 184, 148, 0.1);
            }
            
            .demo-player {
                background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
            }
            
            .demo-content {
                padding: 2rem;
                max-width: 400px;
            }
            
            .demo-content h3 {
                margin: 1rem 0;
                font-size: 1.5rem;
                color: #fff;
            }
            
            .demo-avatar {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: bounce 2s infinite;
            }
            
            .demo-content p {
                margin: 0.5rem 0;
                font-size: 1rem;
            }
            
            .demo-link {
                display: inline-block;
                background: #fff;
                color: #00b894;
                padding: 0.8rem 1.5rem;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                margin: 1rem 0;
                transition: transform 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            .demo-link:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            
            .demo-small {
                font-size: 0.8rem;
                opacity: 0.9;
                font-style: italic;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(demoStyles);
    }
}

/* ===== MAIN FUNCTIONS ===== */

// Main function to join video streams
const joinStreams = async () => {
    // Set up event listeners
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);


    // Enable audio volume indicator
    client.enableAudioVolumeIndicator();
    client.on('volume-indicator', (evt) => {
        evt.forEach(({ uid, level }) => {
            const volumeIcon = document.getElementById(`volume-${uid}`);
            if (volumeIcon) {
                volumeIcon.src = level > 0 ? './assets/volume-on.svg' : './assets/volume-off.svg';
            }
        });
    });

    // Initialize local user tracks
    try {
        showNotification('Initializing camera and microphone...', 'info');
        
        [config.uid, localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
            client.join(config.appid, config.channel, config.token || null, config.uid || null),
            AgoraRTC.createMicrophoneAudioTrack(),
            AgoraRTC.createCameraVideoTrack()
        ]);
        
        showNotification('Successfully joined the call!', 'success');
    } catch (err) {
        console.error('Failed to initialize video call:', err);
        
        // Enhanced error handling with user-friendly messages
        let errorMessage = 'Failed to start video call';
        
        switch (err.name || err.code) {
            case 'NotFoundError':
                errorMessage = 'Camera or microphone not found. Please check your devices.';
                break;
            case 'NotAllowedError':
                errorMessage = 'Camera or microphone access denied. Please allow permissions and refresh.';
                break;
            case 'NotReadableError':
                errorMessage = 'Camera or microphone is being used by another application.';
                break;
            case 'INVALID_PARAMS':
                errorMessage = 'Invalid configuration. Please check your app ID and token.';
                break;
            default:
                errorMessage = `Failed to start video call: ${err.message}`;
        }
        
        showNotification(errorMessage, 'error');
        throw err; // Re-throw to be caught by caller
    }
    
    // Create and display local user video
    const playerHTML = createVideoPlayer(config.uid);
    document.getElementById('user-streams').insertAdjacentHTML('beforeend', playerHTML);
    localTracks.videoTrack.play(`stream-${config.uid}`);
    
    // Publish local tracks to channel
    await client.publish([localTracks.audioTrack, localTracks.videoTrack]);
};


/* ===== EVENT HANDLERS FOR REMOTE USERS ===== */

// Handle when a remote user joins and publishes media
const handleUserJoined = async (user, mediaType) => {
    console.log('User joined:', user.uid, 'Media type:', mediaType);
    
    // Add user to remote users list
    remoteTracks[user.uid] = user;
    
    // Subscribe to remote user with enhanced error handling
    try {
        await client.subscribe(user, mediaType);
        console.log('Successfully subscribed to user:', user.uid);
    } catch (err) {
        console.error('Failed to subscribe to user:', user.uid, err);
        showNotification(`Failed to connect to ${user.uid}`, 'error');
        return;
    }
    
    // Handle video media type
    if (mediaType === 'video') {
        // Remove existing player if it exists
        const existingPlayer = document.getElementById(`video-wrapper-${user.uid}`);
        if (existingPlayer) {
            existingPlayer.remove();
        }
        
        // Create new video player for remote user
        const playerHTML = createVideoPlayer(user.uid);
        document.getElementById('user-streams').insertAdjacentHTML('beforeend', playerHTML);
        
        // Play remote user's video track
        user.videoTrack.play(`stream-${user.uid}`);
        
        showNotification(`${user.uid} joined the call`, 'info');
    }
    
    // Handle audio media type
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
};

// Handle when a remote user leaves the call
const handleUserLeft = (user) => {
    console.log('User left:', user.uid);
    
    // Remove user from remote users list
    delete remoteTracks[user.uid];
    
    // Remove user's video container from DOM
    const userContainer = document.getElementById(`video-wrapper-${user.uid}`);
    if (userContainer) {
        userContainer.remove();
    }
    
    showNotification(`${user.uid} left the call`, 'info');
};

