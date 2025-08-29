// Development proxy server for API requests
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Handle API requests
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname.startsWith('/api/')) {
      // Proxy API requests to the development API
      return handleApiRequest(req, res, pathname);
    }

    // Handle other requests with Next.js
    return handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

function handleApiRequest(req, res, pathname) {
  // For development, we'll simulate the API responses
  if (pathname === '/api/contact') {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      res.setHeader('Access-Control-Max-Age', '86400');
      res.status(200).end();
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          
          // Log the request data
          console.log('=== CONTACT FORM SUBMISSION (DEVELOPMENT) ===');
          console.log('Data:', data);
          console.log('=============================================');
          
          // Simulate processing delay
          setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({ 
              success: true, 
              message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
            });
          }, 1000);
        } catch (error) {
          res.setHeader('Content-Type', 'application/json');
          res.status(400).json({ 
            success: false, 
            message: 'Invalid JSON data' 
          });
        }
      });
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
    return;
  }
  
  // Handle other API routes
  if (pathname === '/api/health') {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      res.setHeader('Access-Control-Max-Age', '86400');
      res.status(200).end();
      return;
    }
    
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({ 
        success: true, 
        message: 'API is working correctly',
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
    return;
  }
  
  // API route not found
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
}