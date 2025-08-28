// Vercel API endpoint for contact form
import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Handle CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (request.method !== 'POST') {
    response.status(405).json({ 
      success: false, 
      message: 'Método no permitido. Solo se permiten solicitudes POST.' 
    });
    return;
  }

  try {
    const { name, email, phone, subject, message, privacy } = request.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      response.status(400).json({ 
        success: false, 
        message: 'Por favor, completa todos los campos requeridos.' 
      });
      return;
    }

    if (!privacy) {
      response.status(400).json({ 
        success: false, 
        message: 'Debes aceptar la política de privacidad.' 
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      response.status(400).json({ 
        success: false, 
        message: 'Por favor, ingresa un correo electrónico válido.' 
      });
      return;
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransporter({
      host: 'mail.petgas.com.mx',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'contacto@petgas.com.mx',
        pass: 'NyeaR[QcW;tP',
      },
    });

    // Create email content
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
      `,
      text: `
        Nuevo mensaje de contacto
        
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone || 'No proporcionado'}
        Asunto: ${subject}
        
        Mensaje:
        ${message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    response.status(200).json({ 
      success: true, 
      message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    response.status(500).json({ 
      success: false, 
      message: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
    });
  }
}