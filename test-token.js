// Quick test script to verify token generation
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const APP_ID = '5a0fbb96ac9d41f6bb111b397a5f1930';
const APP_CERTIFICATE = '01469a3863384e53bb88a91ee60fb0a4';

// Generate a test token
const channelName = 'videocall';
const uid = 'testuser';
const expirationTimeInSeconds = 24 * 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

try {
    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        RtcRole.PUBLISHER,
        privilegeExpiredTs
    );
    
    console.log('✅ Token generation successful!');
    console.log('Token length:', token.length);
    console.log('Expires at:', new Date(privilegeExpiredTs * 1000).toISOString());
} catch (error) {
    console.error('❌ Token generation failed:', error.message);
}
