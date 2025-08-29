// Vercel API endpoint for health check
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Set CORS headers for all responses
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }
  
  // Only allow GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ 
      success: false, 
      message: 'Método no permitido. Solo se permiten solicitudes GET.' 
    });
  }

  try {
    response.status(200).json({ 
      success: true, 
      message: 'API is working correctly',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in health check:', error);
    
    response.status(500).json({ 
      success: false, 
      message: 'Error en la verificación de salud de la API.' 
    });
  }
}