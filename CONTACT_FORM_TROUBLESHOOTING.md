# Contact Form Troubleshooting Guide

## Common Issues and Solutions

### 1. 500 Internal Server Error

**Symptoms**: 
- Contact form returns "Error de conexión con el servidor"
- Browser console shows 500 error for `/api/contact`

**Solutions**:
1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Deployments → Select latest deployment
   - Click on the "Functions" tab
   - Look for errors in the `/api/contact` function logs

2. **Verify SMTP Configuration**:
   - Test email configuration at `/email-test.html`
   - Check credentials in `api/contact.ts`
   - Verify server settings (host, port, security)

3. **Network Issues**:
   - Ensure the SMTP server is accessible from Vercel
   - Check if firewall rules block outgoing connections
   - Verify DNS resolution for the mail server

### 2. Email Not Being Sent

**Symptoms**: 
- Form submits successfully but no email received
- No errors in browser console

**Solutions**:
1. **Check Spam/Junk Folder**:
   - Look for emails in spam or junk folders
   - Check email filters and rules

2. **Verify Recipient Address**:
   - Confirm the "to" address in `api/contact.ts`
   - Test with a different recipient email

3. **Check Email Content**:
   - Ensure the email content is not flagged as spam
   - Verify HTML and text formats are correct

### 3. Timeout Issues

**Symptoms**: 
- Form takes too long to submit
- "Server timeout" error messages

**Solutions**:
1. **Optimize SMTP Settings**:
   - Try different ports (587, 25, 2525)
   - Test with different security settings (SSL/TLS)
   - Consider using a more reliable email service

2. **Add Connection Pooling**:
   - Implement connection pooling for better performance
   - Use connection reuse where possible

### 4. Authentication Failures

**Symptoms**: 
- "Authentication failed" errors
- "Invalid credentials" messages

**Solutions**:
1. **Verify Credentials**:
   - Double-check username and password
   - Ensure credentials are correct for the SMTP server

2. **Use App Passwords**:
   - For Gmail, use App Passwords instead of regular passwords
   - Generate app-specific passwords for better security

3. **Check Account Security**:
   - Ensure 2FA is properly configured
   - Verify account is not locked or restricted

## Testing Steps

### 1. Local Testing
```bash
# Test the API endpoint locally
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test Message",
    "privacy": true
  }'
```

### 2. Online Testing
1. Visit `/email-test.html` on your deployed site
2. Run the SMTP connection test
3. Submit a test email form

### 3. Vercel Function Logs
1. Go to Vercel Dashboard
2. Select your project
3. Go to the "Functions" tab
4. Find the `/api/contact` function
5. Check logs for any error messages

## Alternative Email Solutions

If the current SMTP setup continues to fail, consider these alternatives:

### 1. EmailJS
- Easy to integrate with no backend required
- Good for simple contact forms
- Free tier available

### 2. SendGrid
- Reliable email delivery service
- Good integration with Vercel
- Transactional email focused

### 3. Nodemailer with Gmail
- Use Gmail SMTP with App Passwords
- Reliable and well-documented
- Good for small volumes

## Emergency Contact Form Fix

If the email system is completely down, you can temporarily:

1. Save form submissions to a JSON file
2. Display a message with alternative contact methods
3. Set up a notification system for manual follow-up

## Support

If you're unable to resolve the issue:

1. Document the exact error messages
2. Include screenshots of the problem
3. Note when the issue started occurring
4. Contact the development team with this information