import { useState } from 'react';
import type { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';
import { submitContactForm } from '../services/contactService';
import { useLanguage } from '../contexts/LanguageContext';

// Styled Components
const ContactContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
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

const Alert = styled.div<{ $show: boolean; type: 'success' | 'error' }>`
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
  display: ${props => props.$show ? 'block' : 'none'};
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
  const { t } = useLanguage();
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
      showAlert(t('contact.alert_fill_fields'), false);
      return;
    }
    
    if (!formData.privacy) {
      showAlert(t('contact.alert_accept_privacy'), false);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      // Mostrar mensaje de éxito
      showAlert(result.message, true);
      
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
      const errorMessage = error instanceof Error ? error.message : t('contact.alert_error');
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
    <PageLayout title={t('contact.title')}>
      {/* Alertas */}
      <Alert 
        $show={submitStatus.show} 
        type={submitStatus.success ? 'success' : 'error'}
        onClick={() => setSubmitStatus(prev => ({ ...prev, show: false }))}
      >
        {submitStatus.message}
      </Alert>

      <ContactContainer>
        <Form onSubmit={handleSubmit} id="contactForm">
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#0a4b2a' }}>{t('contact.form_title')}</h3>
          <p style={{ marginTop: '-1rem', marginBottom: '1.5rem', color: '#555' }}>{t('contact.form_subtitle')}</p>
          
          <FormGroup>
            <label htmlFor="name">{t('contact.full_name')}</label>
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
            <label htmlFor="email">{t('contact.email_address')}</label>
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
            <label htmlFor="phone">{t('contact.phone_number')}</label>
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
            <label htmlFor="subject">{t('contact.subject')}</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">{t('contact.select_subject')}</option>
              <option value="cotizacion">{t('contact.quote_request')}</option>
              <option value="ventas">{t('contact.sales_info')}</option>
              <option value="soporte">{t('contact.technical_support')}</option>
              <option value="trabajo">{t('contact.job_openings')}</option>
              <option value="prensa">{t('contact.press_media')}</option>
              <option value="otro">{t('contact.other')}</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">{t('contact.message')}</label>
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
            <label htmlFor="privacy" style={{ margin: 0, fontWeight: 'normal', fontSize: '0.9rem' }} dangerouslySetInnerHTML={{ __html: t('contact.privacy_policy') }} />
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            style={{ backgroundColor: isSubmitting ? '#ccc' : '#0a4b2a' }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                {t('contact.sending')}
              </>
            ) : t('contact.send_message')}
          </SubmitButton>
        </Form>
      </ContactContainer>
    </PageLayout>
  );
};

export default ContactoPage;
