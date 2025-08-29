# Troubleshooting Guide

## Common Issues and Solutions

### 1. Blank Page After Deployment

**Symptoms**: 
- Website shows a blank page
- No errors in browser console
- Navigation doesn't work

**Solutions**:
1. Check Vercel build logs for errors
2. Verify `vercel.json` routing configuration
3. Ensure all routes redirect to `index.html` for SPA
4. Check for JavaScript errors in browser console

### 2. Contact Form Not Working

**Symptoms**: 
- Form submission fails
- "500 Internal Server Error" response
- No email received

**Solutions**:
1. Check Vercel function logs for `/api/contact`
2. Verify email credentials in `api/contact.ts`
3. Test email configuration separately
4. Check for network errors in browser dev tools

### 3. Images Not Loading

**Symptoms**: 
- Missing images on the website
- 404 errors for image URLs

**Solutions**:
1. Verify images are in the `public/` directory
2. Check image paths in components
3. Ensure proper URL encoding for image paths
4. Verify Vercel asset routing in `vercel.json`

### 4. Slow Performance

**Symptoms**: 
- Long loading times
- Delayed interactions
- High bundle size

**Solutions**:
1. Run `npm run build:analyze` to check bundle size
2. Optimize images and assets
3. Implement code splitting where possible
4. Use lazy loading for non-critical components

### 5. Mobile Responsiveness Issues

**Symptoms**: 
- Layout breaks on mobile devices
- Elements overlap or are cut off
- Text too small to read

**Solutions**:
1. Test on multiple device sizes
2. Check CSS media queries
3. Verify viewport meta tag in `index.html`
4. Use browser dev tools mobile emulator

### 6. Translation Issues

**Symptoms**: 
- Text not translating
- Missing translation keys
- Language selector not working

**Solutions**:
1. Verify translation files in `src/translations/`
2. Check language context implementation
3. Ensure all text uses the `t()` translation function
4. Test language switching functionality

## Debugging Steps

### 1. Check Vercel Dashboard
- View deployment logs
- Check function logs
- Monitor performance metrics

### 2. Browser Developer Tools
- Check console for errors
- Inspect network requests
- Verify element styles
- Check JavaScript execution

### 3. Local Testing
- Run `npm run dev` locally
- Test all functionality
- Check for build errors
- Verify API endpoints

### 4. Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify variable values are correct

## Contact Support

If you're unable to resolve an issue:

1. Document the problem with screenshots
2. Include error messages and logs
3. Describe steps to reproduce the issue
4. Contact the development team for assistance