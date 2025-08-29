import { retryApiCall, safeJsonParse } from '../utils/apiUtils';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy?: boolean;
}

export const submitContactForm = async (formData: ContactFormData) => {
  return retryApiCall(async () => {
    try {
      // Use relative URL for both development and production
      const endpoint = '/api/contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message,
          privacy: !!formData.privacy
        }),
      });

      // Safely parse the response
      const data = await safeJsonParse(response);

      // Even if the response indicates storage instead of email sending,
      // we still treat it as a success since the form was received
      if (data.success) {
        const message = data.stored 
          ? (data.message || '¡Mensaje recibido! Nos pondremos en contacto contigo pronto.')
          : (data.message || '¡Mensaje enviado con éxito!');
          
        return { 
          success: true, 
          message,
          stored: !!data.stored
        };
      } else {
        // If the API explicitly returns success: false, treat it as an error
        throw new Error(data.message || 'Error al procesar el mensaje');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Provide a more user-friendly error message
      let errorMessage = 'No se pudo procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
        } else {
          errorMessage = error.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  });
};