# Vercel Deployment Configuration for Contact Form

## Overview
This document explains how the contact form is configured to work with Vercel deployment.

## Configuration Files

### 1. vercel.json
The `vercel.json` file has been updated to support both static file serving and API routes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

This configuration tells Vercel to:
1. Build the static frontend using `@vercel/static-build`
2. Handle API routes using `@vercel/node` for TypeScript files in the `api/` directory
3. Route `/api/*` requests to the corresponding API functions
4. Route all other requests to `index.html` for client-side routing

### 2. API Endpoint
The contact form API endpoint is implemented in `api/contact.ts` using Node.js and Nodemailer:

- **Local Development**: Uses `/api/contact.php` (PHP implementation)
- **Vercel Deployment**: Uses `/api/contact` (Node.js implementation)

### 3. Contact Service
The `src/services/contactService.ts` file automatically detects the environment and uses the appropriate API endpoint:

```typescript
const isVercel = process.env.NODE_ENV === 'production' || window.location.hostname.includes('vercel.app');
const apiEndpoint = isVercel ? '/api/contact' : '/api/contact.php';
```

## How It Works

1. **Local Development**: 
   - Runs PHP server on port 8080
   - Contact form sends requests to `/api/contact.php`
   - PHP script handles email sending

2. **Vercel Deployment**:
   - Static files served by Vercel CDN
   - Contact form sends requests to `/api/contact`
   - Vercel Node.js function handles email sending with Nodemailer

## Environment Detection
The contact service automatically detects the environment:
- In production or on vercel.app domains: Uses Node.js API
- In development: Uses PHP API

## SMTP Configuration
The Node.js API uses the same SMTP credentials as the PHP version:
- Host: mail.petgas.com.mx
- Port: 465
- Secure: true (SSL)
- Username: contacto@petgas.com.mx
- Password: NyeaR[QcW;tP

## Testing
To test the Vercel deployment:
1. Deploy to Vercel
2. Visit the contact page
3. Fill out and submit the form
4. Check that you receive a success message

## Troubleshooting
If the contact form doesn't work on Vercel:
1. Check the Vercel function logs
2. Verify SMTP credentials are correct
3. Ensure the API route is properly configured in vercel.json
4. Confirm that nodemailer is installed