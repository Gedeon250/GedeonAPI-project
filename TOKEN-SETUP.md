# Quick Token Setup Guide

## Fix "dynamic use static key" Error

Your App ID `5a0fbb96ac9d41f6bb111b397a5f1930` is configured to require a token. Here's how to generate one quickly:

## Step-by-Step Token Generation

### 1. Go to Agora Console
Visit: https://console.agora.io/

### 2. Find Your Project
- Look for your project with App ID: `5a0fbb96ac9d41f6bb111b397a5f1930`
- Click on the project

### 3. Generate Token
- Click on "Generate Token" or go to "Token" section
- Fill in the form:
  ```
  Channel Name: test-channel
  Role: Publisher (or Broadcaster)
  UID: 0 (or leave empty)
  Expiration Time: 24 hours
  ```

### 4. Copy and Paste Token
- Copy the generated token (it will look like a long string)
- Open `script.js` in your project
- Find line 14 where it says:
  ```javascript
  token: 'PASTE_YOUR_GENERATED_TOKEN_HERE',
  ```
- Replace `PASTE_YOUR_GENERATED_TOKEN_HERE` with your actual token

### 5. Example Configuration
After pasting your token, it should look like:
```javascript
const config = {
    appid: '5a0fbb96ac9d41f6bb111b397a5f1930',
    token: '007eJxTYBBZE2T8t/aF2...', // Your actual token here
    uid: null,
    channel: 'test-channel',
    demoMode: false,
};
```

##  Important Notes

### Token Expiration
- Tokens expire! The one you generate will work for the time period you set (e.g., 24 hours)
- When it expires, you'll need to generate a new one
- For production apps, you'd typically generate tokens dynamically on your server

### Free Tier Benefits
- 10,000 minutes per month FREE
-  No credit card required
-  Full features available

##  Testing Steps

1. Generate and paste your token in `script.js`
2. Save the file
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Try joining the call again

##  If You Still Have Issues

1. **Double-check the token** - Make sure it's pasted correctly with no extra spaces
2. **Check channel name** - Must match exactly (`test-channel`)
3. **Verify expiration** - Generate a new token if the old one expired
4. **Clear browser cache** - Hard refresh the page

---

**Need help?** The demo mode will still work to show you the interface while you set up the token!
