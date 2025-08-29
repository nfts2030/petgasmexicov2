#!/bin/bash

# Vercel Configuration Verification Script

echo "🔍 Verifying Vercel configuration..."

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
  echo "❌ vercel.json not found!"
  exit 1
fi

echo "✅ vercel.json found"

# Check if vercel.json is valid JSON
if ! python3 -m json.tool vercel.json > /dev/null 2>&1; then
  echo "❌ vercel.json is not valid JSON!"
  exit 1
fi

echo "✅ vercel.json is valid JSON"

# Check for conflicting configuration
if grep -q '"routes"' vercel.json; then
  if grep -q '"rewrites"\|"redirects"\|"headers"\|"cleanUrls"\|"trailingSlash"' vercel.json; then
    echo "❌ Configuration conflict: Cannot use 'routes' with 'rewrites', 'redirects', 'headers', 'cleanUrls', or 'trailingSlash'"
    exit 1
  fi
fi

echo "✅ No configuration conflicts"

# Check if API files exist
if [ ! -f "api/contact.ts" ]; then
  echo "❌ api/contact.ts not found!"
  exit 1
fi

if [ ! -f "api/health.ts" ]; then
  echo "❌ api/health.ts not found!"
  exit 1
fi

echo "✅ API endpoint files found"

# Check if package.json exists and has build script
if [ ! -f "package.json" ]; then
  echo "❌ package.json not found!"
  exit 1
fi

if ! grep -q '"build"' package.json; then
  echo "❌ No build script found in package.json!"
  exit 1
fi

echo "✅ package.json build script found"

# Check if index.html exists
if [ ! -f "index.html" ]; then
  echo "❌ index.html not found!"
  exit 1
fi

echo "✅ index.html found"

echo "✅ All Vercel configuration checks passed!"
echo "✅ Your project is ready for deployment to Vercel!"