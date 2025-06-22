import React, { useState } from 'react';
import type { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';
import { submitContactForm } from '../services/contactService';

// Styled Components
const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  h3 {
    color: #0a4b2a;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  .icon {
    background-color: #0a4b2a;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .details {
    h4 {
      margin: 0 0 0.25rem 0;
      color: #333;
    }
    
    p, a {
      margin: 0;
      color: #666;
      text-decoration: none;
      display: block;
      
      &:hover {
        color: #0a4b2a;
      }
    }
  }
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #0a4b2a;
      box-shadow: 0 0 0 2px rgba(10, 75, 42, 0.2);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background-color: #0a4b2a;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: #0d6a3a;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Animación para las alertas
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Alert = styled.div<{ show: boolean; type: 'success' | 'error' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 9999;
  max-width: 400px;
  animation: ${fadeIn} 0.3s ease-out;
  background-color: ${props => props.type === 'success' ? '#4CAF50' : '#F44336'};
  display: ${props => props.show ? 'block' : 'none'};
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface SubmitStatus {
  show: boolean;
  success: boolean;
  message: string;
}

const ContactoPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ 
    show: false, 
    success: false, 
    message: '' 
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    } as FormData));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar el formulario
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showAlert('Por favor completa todos los campos requeridos', false);
      return;
    }
    
    if (!formData.privacy) {
      showAlert('Debes aceptar la política de privacidad', false);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      
      // Mostrar mensaje de éxito
      showAlert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', true);
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Hubo un error al enviar el mensaje';
      showAlert(errorMessage, false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const showAlert = (message: string, success: boolean) => {
    setSubmitStatus({
      show: true,
      success,
      message
    });
    
    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
      setSubmitStatus(prev => ({
        ...prev,
        show: false
      }));
    }, 5000);
  };
  
  return (
    <PageLayout title="Contáctanos">
      {/* Alertas */}
      <Alert 
        show={submitStatus.show} 
        type={submitStatus.success ? 'success' : 'error'}
        onClick={() => setSubmitStatus(prev => ({ ...prev, show: false }))}
      >
        {submitStatus.message}
      </Alert>

      <ContactContainer>
        <ContactInfo>
          <h3>Información de Contacto</h3>
          <p>
            Estamos aquí para ayudarte. Si tienes alguna pregunta sobre nuestros productos o servicios, 
            no dudes en contactarnos a través del formulario o utilizando cualquiera de los siguientes medios.
          </p>
          
          <InfoItem>
            <div className="icon">📍</div>
            <div className="details">
              <h4>Dirección</h4>
              <p>Ciudad de México, México</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">📞</div>
            <div className="details">
              <h4>Teléfono</h4>
              <p><a href="tel:+522295484549" style={{ color: '#2c3e50', textDecoration: 'none' }}>+52 229 548 4549</a></p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">✉️</div>
            <div className="details">
              <h4>Correo Electrónico</h4>
              <p><a href="mailto:enlace@petgas.com.mx" style={{ color: '#2c3e50', textDecoration: 'none' }}>enlace@petgas.com.mx</a></p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">⏰</div>
            <div className="details">
              <h4>Horario de Atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 2:00 PM</p>
            </div>
          </InfoItem>

          <div className="social-links">
            <h4>Síguenos en Redes Sociales</h4>
            <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://twitter.com/petgasmx" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter" style={{ color: '#2c3e50', fontSize: '1.5rem' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/petgasmx/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram" style={{ color: '#2c3e50', fontSize: '1.5rem' }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@PETGASMX" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube" style={{ color: '#2c3e50', fontSize: '1.5rem' }}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </ContactInfo>
        
        <Form onSubmit={handleSubmit} id="contactForm">
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0a4b2a' }}>Envíanos un Mensaje</h3>
          <p style={{ marginTop: '-1rem', marginBottom: '1.5rem', color: '#555' }}>Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
          
          <FormGroup>
            <label htmlFor="name">Nombre Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="subject">Asunto *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Selecciona un asunto</option>
              <option value="cotizacion">Solicitud de Cotización</option>
              <option value="ventas">Información de Ventas</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="trabajo">Bolsa de Trabajo</option>
              <option value="prensa">Prensa y Medios</option>
              <option value="otro">Otro</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Mensaje *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={5}
            ></textarea>
          </FormGroup>
          
          <FormGroup style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{ marginRight: '0.5rem', marginTop: '0.25rem' }}
            />
            <label htmlFor="privacy" style={{ margin: 0, fontWeight: 'normal', fontSize: '0.9rem' }}>
              Acepto la <a href="#" style={{ color: '#0a4b2a', textDecoration: 'underline' }}>Política de Privacidad</a> *
            </label>
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            style={{ backgroundColor: isSubmitting ? '#ccc' : '#0a4b2a' }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                Enviando...
              </>
            ) : 'Enviar Mensaje'}
          </SubmitButton>
        </Form>
      </ContactContainer>
      
      <div style={{ marginTop: '3rem' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.8570471128795!2d-99.1331847856189!3d19.42702088688986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses-419!2smx!4v1620000000000!5m2!1ses-419!2smx"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          title="Ubicación de PETGAS México"
        ></iframe>
      </div>
    </PageLayout>
  );
};

export default ContactoPage;
