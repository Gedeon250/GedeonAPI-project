/* ===== AGORA TOKEN SERVER ===== */
/* This server automatically generates Agora tokens on-demand */

const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static(path.join(__dirname)));

// SECURITY NOTE: In production, use environment variables
const APP_ID = '5a0fbb96ac9d41f6bb111b397a5f1930'; // Your App ID
const APP_CERTIFICATE = '01469a3863384e53bb88a91ee60fb0a4'; // Primary App Certificate

/**
 * Generate token endpoint
 * POST /generate-token
 * Body: { channelName: "string", uid: "string" }
 */
app.post('/generate-token', (req, res) => {
    console.log('🎯 Token request received:', req.body);
    console.log('📋 Request headers:', req.headers);
    
    try {
        const { channelName, uid } = req.body;
        
        console.log('📝 Extracted params:', { channelName, uid });
        
        // Validation
        if (!channelName || !uid) {
            console.log('❌ Validation failed: Missing channelName or uid');
            return res.status(400).json({
                success: false,
                error: 'channelName and uid are required'
            });
        }
        
        console.log('🔑 Starting token generation...');
        console.log('📊 Using APP_ID:', APP_ID);
        console.log('🔒 APP_CERTIFICATE length:', APP_CERTIFICATE?.length || 'undefined');
        
        // Token expires in 24 hours (86400 seconds)
        const expirationTimeInSeconds = 24 * 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        
        console.log('⏰ Token expiration timestamp:', privilegeExpiredTs);
        
        // Generate the token
        const token = RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channelName,
            uid,
            RtcRole.PUBLISHER, // User can publish and subscribe
            privilegeExpiredTs
        );
        
        console.log('✅ Token generated successfully, length:', token?.length || 0);
        
        const response = {
            success: true,
            token: token,
            expiresAt: privilegeExpiredTs,
            uid: uid,
            channelName: channelName
        };
        
        console.log('📤 Sending response:', { ...response, token: token?.substring(0, 20) + '...' });
        
        res.json(response);
        
    } catch (error) {
        console.error('❌ Token generation error:', error);
        console.error('📚 Error stack:', error.stack);
        
        res.status(500).json({
            success: false,
            error: 'Failed to generate token: ' + error.message
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

/**
 * Debug endpoint to test token generation
 */
app.get('/debug-token', (req, res) => {
    try {
        console.log('🔧 Debug token request');
        
        const token = RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            'test-channel',
            'test-user',
            RtcRole.PUBLISHER,
            Math.floor(Date.now() / 1000) + 3600
        );
        
        res.json({
            success: true,
            message: 'Token generation working',
            tokenLength: token.length,
            appId: APP_ID,
            certificateLength: APP_CERTIFICATE?.length
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
});

app.listen(PORT, () => {
    console.log(`Agora Token Server running on port ${PORT}`);
    console.log(`Generate tokens at: POST http://localhost:${PORT}/generate-token`);
    console.log(`Health check at: GET http://localhost:${PORT}/health`);
});
