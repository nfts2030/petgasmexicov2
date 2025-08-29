# Contact Form Implementation

## Overview

The contact form implementation uses a serverless function deployed on Vercel to handle form submissions and send emails via Nodemailer.

## API Endpoint

- **URL**: `/api/contact`
- **Method**: `POST`
- **Content-Type**: `application/json`

## Request Body

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "privacy": "boolean"
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

## Validation

The API performs the following validations:

1. All required fields must be present (name, email, subject, message)
2. Privacy policy must be accepted
3. Email must be in a valid format

## Error Handling

- **400 Bad Request**: Missing required fields or invalid data
- **405 Method Not Allowed**: Invalid HTTP method
- **500 Internal Server Error**: Email sending failed

## Email Configuration

The contact form uses Nodemailer to send emails with the following configuration:

- **Host**: mail.petgas.com.mx
- **Port**: 465
- **Secure**: true
- **Authentication**: Uses credentials stored in the API code

## Client-Side Implementation

The contact form is implemented in `src/pages/ContactoPage.tsx` with:

- Form validation
- Loading states
- Error handling
- Success messages
- Retry mechanism for failed submissions

## Testing

To test the contact form API endpoint:

1. Deploy to Vercel
2. Visit `/api-test.html` to verify the API is working
3. Submit a test form to verify email delivery