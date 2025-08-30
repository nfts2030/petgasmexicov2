import { useState } from 'react';
import type { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';

// Styled Components
const TestContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const TestCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TestHeader = styled.div<{ $status?: 'idle' | 'loading' | 'success' | 'error' }>`
  padding: 1rem;
  background-color: ${props =>
    props.$status === 'loading' ? '#007bff' :
    props.$status === 'success' ? '#28a745' :
    props.$status === 'error' ? '#dc3545' : '#6c757d'};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestBody = styled.div`
  padding: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'success' | 'danger' }>`
  background-color: ${props =>
    props.$variant === 'secondary' ? '#6c757d' :
    props.$variant === 'success' ? '#28a745' :
    props.$variant === 'danger' ? '#dc3545' : '#007bff'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CodeBlock = styled.pre`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
  margin: 0.5rem 0;
`;

const StatusIndicator = styled.div<{ $status: 'idle' | 'loading' | 'success' | 'error' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.$status === 'loading' ? '#ffc107' :
    props.$status === 'success' ? '#28a745' :
    props.$status === 'error' ? '#dc3545' : '#6c757d'};

  ${props => props.$status === 'loading' && `
    animation: ${pulse} 2s infinite;
  `}
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  input, select, textarea {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
  duration?: number;
}

interface TestEndpoint {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  method: string;
  payload?: any;
}

const PruebasEmail: FC = () => {
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [formData, setFormData] = useState({
    name: 'Usuario de Prueba',
    email: 'test@example.com',
    phone: '555-1234',
    subject: 'cotizacion',
    message: 'Este es un mensaje de prueba desde la página de pruebas.',
    privacy: true
  });

  const endpoints: TestEndpoint[] = [
    {
      id: 'diagnose',
      name: 'Diagnóstico Email',
      description: 'Prueba las conexiones SMTP y DNS sin enviar emails',
      endpoint: '/api/diagnose-email',
      method: 'POST',
      payload: { sendTestEmail: false }
    },
    {
      id: 'test-smtp',
      name: 'Test SMTP',
      description: 'Prueba básica de conexión SMTP',
      endpoint: '/api/test-email',
      method: 'POST'
    },
    {
      id: 'contact-original',
      name: 'Contact Original',
      description: 'Formulario de contacto original con SMTP',
      endpoint: '/api/contact',
      method: 'POST',
      payload: 'form'
    },
    {
      id: 'contact-v2',
      name: 'Contact V2',
      description: 'Nuevo formulario con múltiples métodos de envío',
      endpoint: '/api/contact-v2',
      method: 'POST',
      payload: 'form'
    },
    {
      id: 'contact-sendgrid',
      name: 'Contact SendGrid',
      description: 'Formulario usando SendGrid (requiere API key)',
      endpoint: '/api/contact-sendgrid',
      method: 'POST',
      payload: 'form'
    }
  ];

  const runTest = async (endpoint: TestEndpoint) => {
    const startTime = Date.now();

    setResults(prev => ({
      ...prev,
      [endpoint.id]: { status: 'loading' }
    }));

    try {
      const payload = endpoint.payload === 'form' ? formData : endpoint.payload;

      const response = await fetch(endpoint.endpoint, {
        method: endpoint.method,
        headers: endpoint.payload ? {
          'Content-Type': 'application/json',
        } : {},
        body: payload ? JSON.stringify(payload) : undefined,
      });

      const duration = Date.now() - startTime;
      const data = await response.json();

      setResults(prev => ({
        ...prev,
        [endpoint.id]: {
          status: response.ok ? 'success' : 'error',
          data,
          duration
        }
      }));

    } catch (error) {
      const duration = Date.now() - startTime;
      setResults(prev => ({
        ...prev,
        [endpoint.id]: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Error desconocido',
          duration
        }
      }));
    }
  };

  const runAllTests = async () => {
    // Run all non-form tests first
    const nonFormTests = endpoints.filter(e => e.payload !== 'form');
    for (const endpoint of nonFormTests) {
      await runTest(endpoint);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const clearResults = () => {
    setResults({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Status color logic removed as it's not being used

  const getStatusText = (status: 'idle' | 'loading' | 'success' | 'error') => {
    switch (status) {
      case 'loading': return 'Ejecutando...';
      case 'success': return 'Éxito';
      case 'error': return 'Error';
      default: return 'Listo';
    }
  };

  return (
    <PageLayout title="Pruebas de Email">
      <TestContainer>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#0a4b2a', marginBottom: '1rem' }}>
            🧪 Pruebas de Sistema de Email
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Esta página permite probar todos los endpoints de email en tiempo real
          </p>

          <div style={{ marginTop: '1rem' }}>
            <Button onClick={runAllTests} $variant="primary">
              🚀 Ejecutar Pruebas Básicas
            </Button>
            <Button onClick={clearResults} $variant="secondary">
              🗑️ Limpiar Resultados
            </Button>
          </div>
        </div>

        {/* Form Data Configuration */}
        <FormContainer>
          <h3 style={{ marginBottom: '1rem', color: '#0a4b2a' }}>
            📝 Configuración de Datos de Prueba
          </h3>
          <FormGrid>
            <FormGroup>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="subject">Asunto:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
              >
                <option value="cotizacion">Cotización</option>
                <option value="ventas">Ventas</option>
                <option value="soporte">Soporte</option>
                <option value="trabajo">Trabajo</option>
                <option value="otro">Otro</option>
              </select>
            </FormGroup>
          </FormGrid>
          <FormGroup>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
            />
          </FormGroup>
        </FormContainer>

        {/* Test Results */}
        <TestGrid>
          {endpoints.map((endpoint) => {
            const result = results[endpoint.id] || { status: 'idle' };
            return (
              <TestCard key={endpoint.id}>
                <TestHeader $status={result.status}>
                  <div>
                    <h4 style={{ margin: 0 }}>{endpoint.name}</h4>
                    <small style={{ opacity: 0.8 }}>
                      {endpoint.method} {endpoint.endpoint}
                    </small>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusIndicator $status={result.status} />
                    <span style={{ fontSize: '0.9rem' }}>
                      {getStatusText(result.status)}
                    </span>
                  </div>
                </TestHeader>

                <TestBody>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    {endpoint.description}
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <Button
                      onClick={() => runTest(endpoint)}
                      disabled={result.status === 'loading'}
                      $variant="primary"
                    >
                      {result.status === 'loading' ? '⏳ Ejecutando...' : '▶️ Ejecutar'}
                    </Button>
                  </div>

                  {result.duration && (
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>
                      Duración: {result.duration}ms
                    </p>
                  )}

                  {result.error && (
                    <div>
                      <strong style={{ color: '#dc3545' }}>Error:</strong>
                      <CodeBlock>{result.error}</CodeBlock>
                    </div>
                  )}

                  {result.data && (
                    <div>
                      <strong style={{ color: '#28a745' }}>Respuesta:</strong>
                      <CodeBlock>{JSON.stringify(result.data, null, 2)}</CodeBlock>
                    </div>
                  )}
                </TestBody>
              </TestCard>
            );
          })}
        </TestGrid>

        {/* Instructions */}
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ color: '#0a4b2a', marginBottom: '1rem' }}>
            📋 Instrucciones de Uso
          </h3>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <h4>Tipos de Prueba:</h4>
            <ul>
              <li><strong>Diagnóstico Email:</strong> Verifica conectividad SMTP y DNS sin enviar emails</li>
              <li><strong>Test SMTP:</strong> Prueba básica de conexión al servidor de correo</li>
              <li><strong>Contact Original:</strong> Usa el endpoint original con nodemailer</li>
              <li><strong>Contact V2:</strong> Nueva versión con múltiples métodos de fallback</li>
              <li><strong>Contact SendGrid:</strong> Requiere variable SENDGRID_API_KEY configurada</li>
            </ul>

            <h4>Interpretación de Resultados:</h4>
            <ul>
              <li>🔵 <strong>Azul:</strong> Prueba en ejecución</li>
              <li>🟢 <strong>Verde:</strong> Prueba exitosa</li>
              <li>🔴 <strong>Rojo:</strong> Prueba falló</li>
              <li>⚫ <strong>Gris:</strong> No ejecutada</li>
            </ul>

            <h4>Notas:</h4>
            <ul>
              <li>Los endpoints de formulario usan los datos configurados arriba</li>
              <li>Puedes modificar los datos de prueba antes de ejecutar</li>
              <li>Los emails de prueba no se envían a direcciones reales</li>
            </ul>
          </div>
        </div>
      </TestContainer>
    </PageLayout>
  );
};

export default PruebasEmail;
