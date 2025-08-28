# Contact Form Setup Instructions

## Overview
This document explains how to set up and run the contact form for the Petgas Mobile website.

## Prerequisites
- PHP 7.4 or higher
- Node.js 14 or higher
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies
```bash
cd /path/to/petgasmobile
npm install
```

### 2. Start the Backend Server
The contact form uses a PHP backend to save submissions. Start the PHP built-in server:

```bash
cd /path/to/petgasmobile
php -S localhost:8080 -t api
```

### 3. Start the Frontend Development Server
In a separate terminal, start the Vite development server:

```bash
cd /path/to/petgasmobile
npm run dev
```

### 4. Access the Contact Form
Open your browser and navigate to:
```
http://localhost:3000/contacto
```

## How It Works
1. The contact form collects user data and sends it to `/api/contact.php` via a POST request.
2. The PHP script validates the data and saves it to JSON files.
3. The response is sent back to the frontend as JSON, which displays a success message.

## Viewing Submissions

You can view form submissions in two ways:

1. Visit `http://localhost:3000/view-submissions.html` in your browser
2. Make a GET request to `http://localhost:8080/view-submissions.php`

## Troubleshooting

### Error: "Failed to fetch"
This error occurs when the frontend cannot connect to the backend server. Ensure:
1. The PHP server is running on port 8080
2. The proxy configuration in `vite.config.ts` is correct

### No Data Saved
If form submissions aren't being saved:
1. Check that the API directory is writable
2. Verify that PHP has permission to write files

## Production Deployment

For production deployment with email sending:

1. Restore the email sending functionality in `api/contact.php`:
   - Uncomment the PHPMailer code
   - Verify SMTP credentials are correct:
     - Host: mail.petgas.com.mx
     - Username: contacto@petgas.com.mx
     - Password: NyeaR[QcW;tP
     - Port: 465
     - Encryption: SSL

2. Ensure your web server is configured to serve PHP files
3. Place the `api` directory in a location accessible to your web server
4. Update the proxy settings in `vite.config.ts` if needed
5. Configure proper email sending capabilities on your server

Note: During testing, we found that the SMTP authentication was failing with "535 Incorrect authentication data". This needs to be resolved for email functionality to work.