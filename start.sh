#!/bin/bash

echo " Starting Agora Video Call with Auto Token Generation"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo " Installing dependencies..."
    npm install
fi

# Start the token server in background
echo " Starting token server on port 3000..."
node token-server.js &
TOKEN_SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if curl -s http://localhost:3000/health > /dev/null; then
    echo " Token server is running!"
else
    echo " Failed to start token server"
    kill $TOKEN_SERVER_PID 2>/dev/null
    exit 1
fi

echo " Opening video call application..."
echo " Instructions:"
echo "   1. Allow camera and microphone permissions when prompted"
echo "   2. Enter your username and click 'Join Stream'"
echo "   3. Tokens are automatically generated and refreshed"
echo ""
echo "Tokens will be automatically refreshed every 24 hours"
echo "Press Ctrl+C to stop the token server"

# Open the HTML file in default browser (Linux)
if command -v xdg-open &> /dev/null; then
    xdg-open index.html
elif command -v gnome-open &> /dev/null; then
    gnome-open index.html
else
    echo " Manually open index.html in your browser"
fi

# Keep the script running and handle Ctrl+C
trap "echo ' Stopping token server...'; kill $TOKEN_SERVER_PID 2>/dev/null; exit 0" INT

# Wait for the token server process
wait $TOKEN_SERVER_PID
