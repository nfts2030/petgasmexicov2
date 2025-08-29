#!/bin/bash

# Test build script for PETGAS Mobile

echo "Testing PETGAS Mobile build process..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Run type check
echo "Running type check..."
npm run type-check

# Run linting
echo "Running linting..."
npm run lint

# Build the application
echo "Building application..."
npm run build

# Check if build was successful
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
  echo "✅ Build completed successfully!"
  echo "📁 Build output is in the dist/ directory"
  echo "📊 Build size:"
  du -sh dist
  echo "📝 Files in dist:"
  ls -la dist
else
  echo "❌ Build failed!"
  echo "Please check the error messages above."
  exit 1
fi

# Test preview
echo "Testing preview server..."
npm run preview &

# Wait a moment for server to start
sleep 5

# Check if server is running
if lsof -i :3000 > /dev/null; then
  echo "✅ Preview server is running on port 3000"
  # Kill the background process
  kill %1
else
  echo "⚠️ Preview server may not have started correctly"
fi

echo "✅ Build test completed!"