# Video Call Application - Usage Instructions

## 🚨 IMPORTANT: How to Run the Application

### ❌ **WRONG WAY** (Will cause CORS errors)
Do NOT open `index.html` directly in your browser by double-clicking it. This will cause:
```
Access to fetch at 'file:///generate-token' from origin 'null' has been blocked by CORS policy
```

### ✅ **CORRECT WAYS to Run the Application**

#### Method 1: Use the Node.js Server (Recommended)
1. Open terminal in the project directory
2. Make sure dependencies are installed: `npm install`
3. Start the server: `npm start`
4. Open your browser and go to: `http://localhost:3000`

#### Method 2: Use Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Method 3: Use Python Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

#### Method 4: Use Other HTTP Servers
Any local HTTP server will work, such as:
- `http-server` (npm package)
- Apache/Nginx
- Any other web server

## 🚀 Production Deployment

The application is deployed at: **https://gedeonapi-project.onrender.com/**

## 🔧 Technical Details

The application automatically detects the environment:
- **File protocol** (`file://`): Uses `http://localhost:3000` for token server
- **Localhost development**: Uses `http://localhost:3000` for token server  
- **Production deployment**: Uses same origin for token server

## 🐛 Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure you're running through an HTTP server, not opening HTML directly
2. **Token fetch failures**: Ensure the token server is running on port 3000
3. **Camera/microphone not working**: Grant browser permissions for media access

### Debug Endpoints:
- Health check: `/health`
- Token debug: `/debug-token`

## 📱 Features

- ✅ Real-time video calling
- ✅ Audio/video controls (mute/unmute, camera on/off)
- ✅ Multiple participants
- ✅ Automatic token management
- ✅ Demo mode for testing without credentials
- ✅ Responsive design
- ✅ Accessibility features
