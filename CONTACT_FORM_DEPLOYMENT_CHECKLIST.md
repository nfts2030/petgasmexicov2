# Contact Form Deployment Checklist

## Pre-Deployment Verification

### ✅ API Endpoints
- [ ] `/api/contact` endpoint exists and is properly configured
- [ ] `/api/health` endpoint exists and is properly configured
- [ ] `/api/test-email` endpoint exists for debugging (optional in production)

### ✅ Email Configuration
- [ ] SMTP server settings verified (host, port, security)
- [ ] Authentication credentials tested and working
- [ ] "From" and "To" email addresses verified
- [ ] TLS/SSL settings properly configured

### ✅ Vercel Configuration
- [ ] `vercel.json` includes all API endpoints in builds
- [ ] `vercel.json` has correct rewrites for API endpoints
- [ ] No conflicting routing configurations
- [ ] Environment variables set in Vercel dashboard (if needed)

### ✅ Security
- [ ] CORS headers properly configured
- [ ] Content-Type headers set correctly
- [ ] Rate limiting considered (if needed)
- [ ] Input validation implemented

## Deployment Steps

### 1. Vercel Dashboard Configuration
- [ ] Set environment variables in Vercel project settings:
  - `NODE_ENV=production`
  - Any email-related variables if using external services

### 2. Deploy to Vercel
- [ ] Push latest code to GitHub
- [ ] Verify Vercel auto-deployment starts
- [ ] Monitor deployment logs for errors

### 3. Post-Deployment Testing
- [ ] Visit deployed site
- [ ] Navigate to `/email-test.html` (if included)
- [ ] Test health endpoint: `GET /api/health`
- [ ] Test connection endpoint: `POST /api/test-email`
- [ ] Submit test contact form
- [ ] Verify email is received

## Common Post-Deployment Issues

### 1. Function Not Found
**Problem**: 404 errors for API endpoints
**Solution**: 
- Verify `vercel.json` configuration
- Check that API files are in the correct location
- Ensure builds are properly configured

### 2. Email Not Sending
**Problem**: Form submits but no email received
**Solution**:
- Check Vercel function logs
- Verify SMTP credentials
- Test with alternative email service

### 3. CORS Errors
**Problem**: Browser blocks requests due to CORS
**Solution**:
- Verify CORS headers in API responses
- Check allowed origins
- Ensure proper preflight handling

### 4. Timeout Errors
**Problem**: Requests time out or take too long
**Solution**:
- Add timeout handling in API functions
- Optimize email sending process
- Consider async processing with queue system

## Monitoring and Maintenance

### ✅ Regular Checks
- [ ] Monitor Vercel function logs weekly
- [ ] Test contact form monthly
- [ ] Verify email deliverability
- [ ] Check for security updates

### ✅ Backup Plan
- [ ] Document alternative contact methods
- [ ] Have backup email service ready
- [ ] Maintain list of recent successful submissions
- [ ] Set up monitoring alerts for API failures

## Emergency Procedures

### If Contact Form Stops Working:
1. **Immediate**: 
   - Add temporary message on contact page with alternative contact methods
   - Notify team of the issue

2. **Investigation**:
   - Check Vercel function logs
   - Test email configuration
   - Verify SMTP server status

3. **Resolution**:
   - Fix configuration issues
   - Implement temporary workaround if needed
   - Test thoroughly before going live

4. **Communication**:
   - Update status page if applicable
   - Notify users of resolution
   - Document the issue and solution

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Nodemailer Documentation**: https://nodemailer.com/
- **Contact Form Troubleshooting Guide**: `CONTACT_FORM_TROUBLESHOOTING.md`
- **Deployment Summary**: `DEPLOYMENT_SUMMARY.md`