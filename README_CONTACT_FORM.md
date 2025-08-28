# Petgas Mobile Contact Form

This directory contains the implementation of the contact form for the Petgas Mobile website.

## Files

- `src/pages/ContactoPage.tsx` - The React component for the contact page
- `src/services/contactService.ts` - Service that handles form submission
- `api/contact.php` - PHP backend that processes form data and sends emails
- `api/PHPMailer/` - PHPMailer library for sending emails via SMTP
- `server.js` - Node.js server for proxying requests to PHP (development only)
- `vite.config.ts` - Vite configuration with proxy settings

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the PHP server for the API:
   ```bash
   php -S localhost:8080 -t api
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Navigate to http://localhost:3000/contacto to view the contact form

## How It Works

1. The contact form collects user data (name, email, phone, subject, message)
2. When the user submits the form, the data is sent to `/api/contact.php`
3. The PHP script validates the data and attempts to send an email:
   - First using PHPMailer with SMTP (configured with petgas.com.mx SMTP settings)
   - Falls back to PHP's built-in mail() function if PHPMailer fails
4. The response is sent back as JSON to display success/error messages

## Configuration

The contact form is already configured with the correct SMTP settings:
- Host: mail.petgas.com.mx
- Username: contacto@petgas.com.mx
- Password: NyeaR[QcW;tP
- Port: 465
- Encryption: SSL
- Recipient: contacto@petgas.com.mx

These settings are located in `api/contact.php`.

## Testing

You can test the contact form by:

1. Using the actual website at http://localhost:3000/contacto
2. Using the test file `test-contact-form.html` (open it directly in a browser when the PHP server is running)

## Troubleshooting

If you encounter issues:

1. Make sure the PHP server is running on port 8080
2. Check that all required PHP extensions are installed (curl, openssl)
3. Verify that the PHPMailer library is properly included
4. Check server error logs for any PHP errors