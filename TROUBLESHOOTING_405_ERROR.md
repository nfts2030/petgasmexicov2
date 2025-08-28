# Troubleshooting 405 Error in Contact Form

## Overview
A 405 error means "Method Not Allowed" and typically occurs when trying to access an API endpoint that doesn't exist or doesn't accept the HTTP method being used.

## Common Causes and Solutions

### 1. Incorrect API Endpoint
**Problem**: The frontend is trying to access `/api/contact.php` on Vercel where only `/api/contact` (Node.js) exists.

**Solution**: 
- Verify that the environment detection in `src/services/contactService.ts` is working correctly
- Check that the hostname detection includes your domain
- Ensure the API endpoint is correctly determined based on the environment

**Test**: Create a simple HTML file to test environment detection:
```html
<script>
  const isVercel = window.location.hostname.includes('vercel.app') || 
                   window.location.hostname.includes('petgasmobile') ||
                   process.env.NODE_ENV === 'production';
  const apiEndpoint = isVercel ? '/api/contact' : '/api/contact.php';
  console.log('Hostname:', window.location.hostname);
  console.log('Is Vercel:', isVercel);
  console.log('API Endpoint:', apiEndpoint);
</script>
```

### 2. Vercel Configuration Issues
**Problem**: The `vercel.json` file is not properly configured to handle API routes.

**Solution**:
- Ensure `vercel.json` includes the Node.js build configuration:
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
  ]
}
```
- Verify the routes configuration includes API handling:
```json
"routes": [
  { "handle": "filesystem" },
  { "src": "/api/(.*)", "dest": "/api/$1" },
  { "src": "/.*", "dest": "/index.html" }
]
```

### 3. API File Issues
**Problem**: The Node.js API file (`api/contact.ts`) has errors or is not properly exported.

**Solution**:
- Verify that `api/contact.ts` exports a default function named `handler`
- Check that all required dependencies are installed (`@vercel/node`, `nodemailer`)
- Ensure there are no TypeScript compilation errors

### 4. Deployment Issues
**Problem**: Vercel hasn't rebuilt the project after changes or there are caching issues.

**Solution**:
- Trigger a new deployment on Vercel
- Clear the build cache if necessary
- Check the Vercel logs for build errors

## Debugging Steps

### 1. Check Browser Console
1. Open Developer Tools (F12)
2. Go to the Network tab
3. Submit the contact form
4. Look for the failed request to `/api/contact.php`
5. Check the response status and headers

### 2. Verify API Endpoint
1. Visit `https://your-domain.vercel.app/api/contact` in your browser
2. You should see a JSON response indicating the API is working
3. If you get a 404, the API is not deployed correctly

### 3. Test Environment Detection
Add logging to the contact service:
```typescript
console.log('Hostname:', window.location.hostname);
console.log('Is Vercel:', isVercelDeployment());
console.log('API Endpoint:', apiEndpoint);
```

### 4. Check Vercel Logs
1. Go to your Vercel dashboard
2. Select your project
3. Check the deployment logs for any errors
4. Look at the function logs for the contact API

## Prevention

### 1. Robust Environment Detection
Use multiple conditions to detect the environment:
```typescript
const isVercelDeployment = (): boolean => {
  return (
    (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) ||
    (typeof window !== 'undefined' && window.location.hostname.includes('petgasmobile')) ||
    process.env.NODE_ENV === 'production'
  );
};
```

### 2. Comprehensive Testing
- Test locally with PHP backend
- Test on Vercel with Node.js backend
- Verify environment detection works correctly
- Check API endpoints are accessible

### 3. Clear Documentation
- Document the environment-specific configurations
- Provide troubleshooting steps
- Keep deployment instructions up to date

## Quick Fix Checklist

- [ ] Verify `vercel.json` is correctly configured
- [ ] Check that `api/contact.ts` exists and is properly formatted
- [ ] Confirm environment detection is working
- [ ] Ensure the correct API endpoint is being used
- [ ] Trigger a new deployment on Vercel
- [ ] Check Vercel logs for errors
- [ ] Test the API endpoint directly in the browser