/* ===== AGORA TOKEN SERVER ===== */
/* This server automatically generates Agora tokens on-demand */

const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// SECURITY NOTE: In production, use environment variables
const APP_ID = '5a0fbb96ac9d41f6bb111b397a5f1930'; // Your App ID
const APP_CERTIFICATE = '01469a3863384e53bb88a91ee60fb0a4'; // Primary App Certificate

/**
 * Generate token endpoint
 * POST /generate-token
 * Body: { channelName: "string", uid: "string" }
 */
app.post('/generate-token', (req, res) => {
    try {
        const { channelName, uid } = req.body;
        
        // Validation
        if (!channelName || !uid) {
            return res.status(400).json({
                success: false,
                error: 'channelName and uid are required'
            });
        }
        
        // Token expires in 24 hours (86400 seconds)
        const expirationTimeInSeconds = 24 * 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        
        // Generate the token
        const token = RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channelName,
            uid,
            RtcRole.PUBLISHER, // User can publish and subscribe
            privilegeExpiredTs
        );
        
        res.json({
            success: true,
            token: token,
            expiresAt: privilegeExpiredTs,
            uid: uid,
            channelName: channelName
        });
        
    } catch (error) {
        console.error('Token generation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate token'
        });
    }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Agora Token Server running on port ${PORT}`);
    console.log(`Generate tokens at: POST http://localhost:${PORT}/generate-token`);
    console.log(`Health check at: GET http://localhost:${PORT}/health`);
});
