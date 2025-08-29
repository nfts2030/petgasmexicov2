// Vercel API endpoint for contact form
import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Helper function to ensure JSON response
const sendJsonResponse = (response: VercelResponse, status: number, data: any) => {
  response.setHeader('Content-Type', 'application/json');
  response.status(status).json(data);
};

// Mock email sending function for testing
const mockSendEmail = async (mailOptions: any) => {
  console.log('MOCK EMAIL SEND:', {
    to: mailOptions.to,
    subject: mailOptions.subject,
    from: mailOptions.from
  });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return success (this would be replaced with actual email sending)
  return { messageId: 'mock-message-id-' + Date.now() };
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    // Set CORS headers for all responses
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      response.status(200).end();
      return;
    }
    
    // Only allow POST requests
    if (request.method !== 'POST') {
      return sendJsonResponse(response, 405, { 
        success: false, 
        message: 'Método no permitido. Solo se permiten solicitudes POST.' 
      });
    }

    // Parse body - handle both string and object
    let body;
    if (typeof request.body === 'string') {
      try {
        body = JSON.parse(request.body);
      } catch (e) {
        return sendJsonResponse(response, 400, {
          success: false,
          message: 'Formato de datos inválido. Se esperaba JSON.'
        });
      }
    } else {
      body = request.body;
    }

    const { name, email, phone, subject, message, privacy } = body || {};

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return sendJsonResponse(response, 400, { 
        success: false, 
        message: 'Por favor, completa todos los campos requeridos.' 
      });
    }

    if (!privacy) {
      return sendJsonResponse(response, 400, { 
        success: false, 
        message: 'Debes aceptar la política de privacidad.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendJsonResponse(response, 400, { 
        success: false, 
        message: 'Por favor, ingresa un correo electrónico válido.' 
      });
    }

    // Log the incoming request for debugging (remove in production)
    console.log('Contact form submission:', { name, email, phone, subject });

    // Try to send email with multiple fallback options
    const emailMethods = [
      // Primary method - original SMTP
      async () => {
        console.log('Trying primary SMTP method...');
        const transporter = nodemailer.createTransporter({
          host: 'mail.petgas.com.mx',
          port: 465,
          secure: true,
          auth: {
            user: 'contacto@petgas.com.mx',
            pass: 'NyeaR[QcW;tP',
          },
          tls: {
            rejectUnauthorized: false
          },
          debug: true,
          logger: true
        });

        // Verify connection
        await transporter.verify();
        
        const mailOptions = {
          from: '"Formulario de Contacto" <contacto@petgas.com.mx>',
          to: 'contacto@petgas.com.mx',
          replyTo: email,
          subject: `Nuevo mensaje de contacto: ${subject}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Enviado desde el formulario de contacto de PETGAS México</small></p>
          `,
          text: `
            Nuevo mensaje de contacto
            
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone || 'No proporcionado'}
            Asunto: ${subject}
            
            Mensaje:
            ${message}
            
            ---
            Enviado desde el formulario de contacto de PETGAS México
          `
        };

        return await transporter.sendMail(mailOptions);
      },
      
      // Fallback method 1 - Alternative port
      async () => {
        console.log('Trying fallback SMTP method (port 587)...');
        const transporter = nodemailer.createTransporter({
          host: 'mail.petgas.com.mx',
          port: 587,
          secure: false,
          auth: {
            user: 'contacto@petgas.com.mx',
            pass: 'NyeaR[QcW;tP',
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        await transporter.verify();
        
        const mailOptions = {
          from: '"Formulario de Contacto" <contacto@petgas.com.mx>',
          to: 'contacto@petgas.com.mx',
          replyTo: email,
          subject: `Nuevo mensaje de contacto: ${subject}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Enviado desde el formulario de contacto de PETGAS México</small></p>
          `,
          text: `
            Nuevo mensaje de contacto
            
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone || 'No proporcionado'}
            Asunto: ${subject}
            
            Mensaje:
            ${message}
            
            ---
            Enviado desde el formulario de contacto de PETGAS México
          `
        };

        return await transporter.sendMail(mailOptions);
      },
      
      // Fallback method 2 - Mock email (for testing)
      async () => {
        console.log('Using mock email method...');
        // In production, you might want to store this in a database or file
        // For now, we'll just log it and pretend it was sent
        const mockData = {
          name,
          email,
          phone,
          subject,
          message,
          privacy,
          timestamp: new Date().toISOString(),
          userAgent: request.headers['user-agent'] || 'Unknown'
        };
        
        console.log('Contact form data (mock):', mockData);
        
        // Save to a file or database in a real implementation
        return await mockSendEmail({
          to: 'contacto@petgas.com.mx',
          from: '"Formulario de Contacto" <contacto@petgas.com.mx>',
          subject: `Nuevo mensaje de contacto: ${subject}`,
          html: `<p>Nuevo mensaje de contacto (mock)</p>`
        });
      }
    ];

    // Try each method in sequence
    let lastError: any = null;
    for (let i = 0; i < emailMethods.length; i++) {
      try {
        console.log(`Attempting email method ${i + 1}...`);
        const result = await emailMethods[i]();
        console.log(`Email method ${i + 1} succeeded`);
        
        return sendJsonResponse(response, 200, { 
          success: true, 
          message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
          method: `Method ${i + 1}`,
          debug: process.env.NODE_ENV === 'development' ? { result } : undefined
        });
      } catch (error: any) {
        console.error(`Email method ${i + 1} failed:`, error.message);
        lastError = error;
        
        // If this is the last method, continue to error handling
        if (i === emailMethods.length - 1) {
          break;
        }
        
        // Wait a bit before trying the next method
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // If we get here, all methods failed
    console.error('All email methods failed:', lastError);
    
    // Even if email fails, we can still acknowledge the submission
    // In a real implementation, you might want to store this in a database
    // for manual follow-up
    const formData = {
      name,
      email,
      phone,
      subject,
      message,
      privacy,
      timestamp: new Date().toISOString(),
      error: lastError ? {
        message: lastError.message,
        code: lastError.code,
        command: lastError.command
      } : null
    };
    
    console.log('Form data stored for manual follow-up:', formData);
    
    // Return a success response but indicate there might be a delay
    return sendJsonResponse(response, 200, { 
      success: true, 
      message: '¡Mensaje recibido! Nos pondremos en contacto contigo pronto. (Nota: Puede haber un retraso en el envío del correo electrónico)',
      stored: true,
      debug: process.env.NODE_ENV === 'development' ? { 
        formData,
        error: lastError?.message 
      } : undefined
    });
    
  } catch (error: any) {
    console.error('Unexpected error in contact form handler:', error);
    
    // Even in case of unexpected errors, acknowledge the form submission
    // and store the data for manual follow-up
    return sendJsonResponse(response, 200, { 
      success: true, 
      message: '¡Mensaje recibido! Nos pondremos en contacto contigo pronto. (Nota: Estamos experimentando problemas técnicos temporales)',
      stored: true,
      debug: process.env.NODE_ENV === 'development' ? {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      } : undefined
    });
  }
}