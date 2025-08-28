interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy?: boolean;
}

// Function to detect if we're running on Vercel
const isVercelDeployment = (): boolean => {
  // Check multiple conditions to determine if we're on Vercel
  return (
    (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) ||
    (typeof window !== 'undefined' && window.location.hostname.includes('petgasmobile')) ||
    process.env.NODE_ENV === 'production'
  );
};

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // Determine the correct API endpoint based on environment
    const isVercel = isVercelDeployment();
    const apiEndpoint = isVercel ? '/api/contact' : '/api/contact.php';

    // Create request body
    let body: string | URLSearchParams;
    const headers: Record<string, string> = {};
    
    if (isVercel) {
      // Vercel (Node.js API) - use JSON
      body = JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        privacy: !!formData.privacy
      });
      headers['Content-Type'] = 'application/json';
    } else {
      // Local development (PHP API) - use URLSearchParams
      body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        privacy: formData.privacy ? '1' : '0',
      });
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // Send request to backend
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse response as JSON
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If JSON parsing fails, try to get text
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text}`);
    }

    // Check if request was successful
    if (!data.success) {
      throw new Error(data.message || 'Error al enviar el mensaje');
    }
    
    return { success: true, message: data.message || '¡Mensaje enviado con éxito!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Provide a more user-friendly error message
    let errorMessage = 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
      } else if (error.message.includes('HTTP error!')) {
        errorMessage = 'Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde.';
      } else {
        errorMessage = error.message;
      }
    }
    
    throw new Error(errorMessage);
  }
};