# Complete Contact Form Solution for Local and Vercel Deployment

## Overview
This document explains how the contact form works in both local development and Vercel deployment environments.

## Architecture

### Local Development
- **Frontend**: React/TypeScript application
- **Backend**: PHP server running on port 8080
- **API Endpoint**: `/api/contact.php`
- **Email Sending**: PHPMailer with SMTP or PHP's mail() function
- **Data Storage**: JSON files as backup

### Vercel Deployment
- **Frontend**: Static files served by Vercel CDN
- **Backend**: Node.js serverless functions
- **API Endpoint**: `/api/contact`
- **Email Sending**: Nodemailer with SMTP
- **Data Storage**: None (emails sent directly)

## How It Works

### 1. Environment Detection
The contact service automatically detects the environment using a robust detection function:
```typescript
const isVercelDeployment = (): boolean => {
  // Check multiple conditions to determine if we're on Vercel
  return (
    (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) ||
    (typeof window !== 'undefined' && window.location.hostname.includes('petgasmobile')) ||
    process.env.NODE_ENV === 'production'
  );
};
```

### 2. Request Formatting
Based on the environment, the service formats requests appropriately:
- **Local (PHP)**: URL-encoded form data
- **Vercel (Node.js)**: JSON data

### 3. API Implementation
- **Local**: `api/contact.php` - PHP script with PHPMailer
- **Vercel**: `api/contact.ts` - Node.js function with Nodemailer

## Configuration Files

### vercel.json
Configures Vercel to handle both static files and API routes:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
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

## SMTP Configuration
Both implementations use the same credentials:
- Host: mail.petgas.com.mx
- Port: 465
- Secure: SSL
- Username: contacto@petgas.com.mx
- Password: NyeaR[QcW;tP

## Testing

### Local Development
1. Start PHP server: `php -S localhost:8080 -t api`
2. Start Vite server: `npm run dev`
3. Visit http://localhost:3000/contacto
4. Fill and submit form

### Vercel Deployment
1. Deploy to Vercel
2. Visit the contact page
3. Fill and submit form
4. Check for success message

## Error Handling
The implementation includes comprehensive error handling:
- Form validation
- Network error detection
- SMTP authentication errors
- Fallback to file storage (local only)

## File Structure
```
src/
  services/
    contactService.ts    # Environment-aware contact service
api/
  contact.php           # PHP implementation for local development
  contact.ts            # Node.js implementation for Vercel
  contact_old.php       # Backup of original PHP implementation
```

## Troubleshooting

### 405 Error (Method Not Allowed)
This typically occurs when the API endpoint is not properly configured. Ensure:
1. vercel.json is correctly configured
2. API files are in the correct location
3. Vercel is rebuilding after changes
4. Environment detection is working correctly

### Email Not Sending
1. Verify SMTP credentials
2. Check Vercel function logs
3. Test credentials locally with PHP script

### Form Validation Errors
1. Ensure all required fields are filled
2. Check browser console for JavaScript errors
3. Verify network requests in developer tools

## Best Practices

1. **Environment Detection**: Automatic detection prevents configuration errors
2. **Multiple Email Methods**: Fallback mechanisms ensure reliability
3. **Data Persistence**: Local backup ensures no data loss
4. **Error Handling**: User-friendly messages improve experience
5. **Security**: Input validation and sanitization prevent issues

## Recent Improvements

1. **Enhanced Environment Detection**: More robust detection logic that checks multiple conditions
2. **Better Error Messages**: Clearer error messages for different failure scenarios
3. **Improved Testing**: Added test files to verify functionality
4. **Documentation Updates**: Comprehensive documentation for troubleshooting