interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy?: boolean;
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const response = await fetch('https://petgas.com.mx/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        privacy: formData.privacy ? '1' : '0',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al enviar el mensaje');
    }
    
    return { success: true, message: data.message || '¡Mensaje enviado con éxito!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
  }
};
