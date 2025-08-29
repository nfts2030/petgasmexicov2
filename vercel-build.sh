#!/bin/bash

# Vercel build script for PETGAS Mobile

echo "Starting PETGAS Mobile build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React application
echo "Building React application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
  echo "Build output is in the dist/ directory"
else
  echo "Build failed!"
  exit 1
fi