#!/bin/bash

# Script to start both frontend and backend servers for development

echo "🚀 Starting PETGAS Mobile Development Environment..."
echo ""

# Start the API server in the background
echo "📡 Starting API server on port 3001..."
npm run server &
API_PID=$!

# Wait a moment for API server to start
sleep 2

# Start the frontend development server
echo "🌐 Starting frontend development server on port 3000..."
npm run dev &
FRONTEND_PID=$!

# Wait for both servers to be ready
echo ""
echo "⏳ Waiting for servers to start..."
sleep 3

# Check if both servers are running
if kill -0 $API_PID 2>/dev/null && kill -0 $FRONTEND_PID 2>/dev/null; then
    echo ""
    echo "✅ Both servers are running!"
    echo "📧 API Server: http://localhost:3001"
    echo "🌐 Frontend: http://localhost:3000"
    echo "📝 Contact Form: http://localhost:3000/contacto"
    echo ""
    echo "Press Ctrl+C to stop both servers"
    echo ""

    # Wait for user to stop
    wait $FRONTEND_PID
else
    echo "❌ One or both servers failed to start"
    exit 1
fi

# Cleanup when script ends
trap "echo '🛑 Stopping servers...'; kill $API_PID $FRONTEND_PID 2>/dev/null" EXIT
