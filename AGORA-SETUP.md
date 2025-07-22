# Free Agora Setup Guide

## Getting Started with Agora's Free Tier

Agora provides **10,000 minutes per month for FREE** - perfect for development and small projects!

## Step-by-Step Setup

### 1. Create Free Agora Account
- Visit: https://console.agora.io/
- Click "Sign Up" and create a free account
- Verify your email address

### 2. Create a New Project
- After logging in, click "Create Project"
- Choose project name (e.g., "Video Call App")
- Select "Secured mode: APP ID + Token" for production
- Or select "Testing mode: APP ID only" for development

### 3. Get Your App ID
- In your project dashboard, you'll see your **App ID**
- Copy this App ID
- Replace `'YOUR_FREE_APP_ID_HERE'` in `script.js` with your actual App ID

### 4. Token Setup (Choose One)

#### Option A: Testing Mode (Easiest)
```javascript
const config = {
    appid: 'your-actual-app-id-here',
    token: null,  // Keep as null for testing
    channel: 'test-channel'
};
```

#### Option B: Secured Mode (Recommended for Production)
1. In Agora Console, go to your project
2. Click "Generate Token"
3. Enter channel name: `test-channel`
4. Set expiration time (24 hours for testing)
5. Copy the generated token
6. Replace in your code:

```javascript
const config = {
    appid: 'your-actual-app-id-here',
    token: 'your-generated-token-here',
    channel: 'test-channel'
};
```

## Quick Configuration Example

After getting your credentials, update `script.js`:

```javascript
const config = {
    appid: '1234567890abcdef1234567890abcdef', // Your actual App ID
    token: null, // null for testing, or your token for production
    uid: null,
    channel: 'test-channel',
    demoMode: false,
};
```

## Free Tier Limits
- **10,000 minutes/month** of video calling
- **Unlimited** concurrent users
- **Global** infrastructure
- **No credit card required**

##  Testing Your Setup

1. Replace the App ID in `script.js`
2. Start your local server: `python3 -m http.server 8080`
3. Open http://localhost:8080
4. Enter your name and click "Join Stream"
5. Allow camera/microphone permissions
6. You should see your video stream!

## Common Issues

### "Invalid vendor key" Error
- Your App ID is incorrect or not properly pasted
- Make sure there are no extra spaces or quotes

### "Token expired" Error
- Generate a new token from Agora Console
- Tokens expire, so you'll need to refresh them periodically

### Camera/Microphone Issues
- Make sure to allow permissions in your browser
- Check that no other applications are using your camera

## 📞 Support

If you need help:
- Agora Documentation: https://docs.agora.io/
- Agora Community: https://www.agora.io/en/community/
- Free support for developers on their website

---

**Note**: The demo mode will automatically activate if your credentials are invalid, allowing you to see the interface even without working Agora setup.
