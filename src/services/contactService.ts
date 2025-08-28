interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy?: boolean;
}

// Function to get the base URL for API requests
const getBaseUrl = (): string => {
  // In production, use relative URL (Vercel will handle the domain)
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  // In development, use the local server
  return 'http://localhost:3000';
};

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const baseUrl = getBaseUrl();
    const endpoint = `${baseUrl}/api/contact`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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