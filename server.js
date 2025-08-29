import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Contact form endpoint (proxied from Vite, so path is without /api prefix)
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, privacy } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, completa todos los campos requeridos.'
      });
    }

    if (!privacy) {
      return res.status(400).json({
        success: false,
        message: 'Debes aceptar la política de privacidad.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, ingresa un correo electrónico válido.'
      });
    }

    // Log the submission (in production, you'd save to database)
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'No proporcionado');
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Privacy Accepted:', privacy);
    console.log('================================');

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, just return success (in production, you'd send actual email)
    res.json({
      success: true,
      message: '¡Mensaje recibido con éxito! Nos pondremos en contacto contigo pronto.',
      stored: true // Indicate the message was stored for manual follow-up
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'No se pudo procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
    });
  }
});

// Health check endpoint (also proxied, so without /api prefix)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Contact API is running'
  });
});

// Simple 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/contact`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Frontend proxy: http://localhost:3000/api/* -> http://localhost:${PORT}/*`);
});
