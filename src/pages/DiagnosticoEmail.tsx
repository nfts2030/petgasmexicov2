import { useState } from 'react';
import type { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';

// Styled Components
const DiagnosticContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  background-color: ${(props) =>
    props.$variant === 'secondary'
      ? '#6c757d'
      : props.$variant === 'danger'
        ? '#dc3545'
        : '#0a4b2a'};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${(props) =>
      props.$variant === 'secondary'
        ? '#5a6268'
        : props.$variant === 'danger'
          ? '#c82333'
          : '#0d6a3a'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TestResult = styled.div<{ $status: 'success' | 'failed' | 'warning' }>`
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border-left: 4px solid
    ${(props) =>
      props.$status === 'success'
        ? '#28a745'
        : props.$status === 'warning'
          ? '#ffc107'
          : '#dc3545'};
  background-color: ${(props) =>
    props.$status === 'success' ? '#d4edda' : props.$status === 'warning' ? '#fff3cd' : '#f8d7da'};
  color: ${(props) =>
    props.$status === 'success' ? '#155724' : props.$status === 'warning' ? '#856404' : '#721c24'};
`;

const LogContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  max-height: 400px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
`;

const StatusIndicator = styled.span<{ $status: 'success' | 'failed' | 'warning' | 'running' }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) =>
    props.$status === 'success'
      ? '#28a745'
      : props.$status === 'warning'
        ? '#ffc107'
        : props.$status === 'running'
          ? '#007bff'
          : '#dc3545'};

  ${(props) =>
    props.$status === 'running' &&
    `
    animation: ${pulse} 2s infinite;
  `}
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

interface DiagnosticResult {
  timestamp: string;
  tests: Array<{
    name: string;
    status: 'SUCCESS' | 'FAILED';
    message?: string;
    error?: string;
    code?: string;
    command?: string;
    messageId?: string;
    resolved_ips?: string[];
  }>;
  summary: {
    total_tests: number;
    successful_tests: number;
    failed_tests: number;
    overall_status: string;
    recommendations: string[];
  };
  environment_details: Record<string, string>;
}

const DiagnosticoEmail: FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string>('');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => `${prev}[${timestamp}] ${message}\n`);
  };

  const runDiagnostic = async (sendTestEmail: boolean = false) => {
    setIsRunning(true);
    setError(null);
    setResults(null);
    setLogs('');

    addLog('Iniciando diagnóstico de email...');

    try {
      addLog('Conectando al servidor de diagnóstico...');

      const response = await fetch('/api/diagnose-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sendTestEmail: sendTestEmail,
        }),
      });

      addLog(`Respuesta recibida: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        addLog('Diagnóstico completado exitosamente');
        setResults(data.diagnostics);
      } else {
        addLog('Diagnóstico completado con errores');
        setResults(data.diagnostics);
        setError(data.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      addLog(`Error durante el diagnóstico: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
    setLogs('');
  };

  const getStatusColor = (status: 'SUCCESS' | 'FAILED'): 'success' | 'failed' => {
    return status === 'SUCCESS' ? 'success' : 'failed';
  };

  return (
    <PageLayout title="Diagnóstico de Email">
      <DiagnosticContainer>
        <Card>
          <h2 style={{ color: '#0a4b2a', marginTop: 0 }}>Diagnóstico del Sistema de Email</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Esta herramienta te permite diagnosticar problemas con el sistema de envío de emails del
            formulario de contacto. Ejecuta las pruebas para identificar posibles problemas de
            conectividad SMTP.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <Button onClick={() => runDiagnostic(false)} disabled={isRunning}>
              {isRunning && <StatusIndicator $status="running" />}
              {isRunning ? 'Ejecutando Diagnóstico...' : 'Ejecutar Diagnóstico'}
            </Button>

            <Button onClick={() => runDiagnostic(true)} disabled={isRunning} $variant="secondary">
              {isRunning && <StatusIndicator $status="running" />}
              {isRunning ? 'Ejecutando...' : 'Diagnóstico + Enviar Email de Prueba'}
            </Button>

            <Button onClick={clearResults} disabled={isRunning} $variant="danger">
              Limpiar Resultados
            </Button>
          </div>
        </Card>

        {/* Logs en tiempo real */}
        {logs && (
          <Card>
            <h3>Logs de Ejecución</h3>
            <LogContainer>{logs}</LogContainer>
          </Card>
        )}

        {/* Error general */}
        {error && (
          <Card>
            <TestResult $status="failed">
              <strong>Error:</strong> {error}
            </TestResult>
          </Card>
        )}

        {/* Resultados del diagnóstico */}
        {results && (
          <>
            <Card>
              <h3>Resumen de Diagnóstico</h3>
              <div style={{ marginBottom: '1rem' }}>
                <p>
                  <strong>Timestamp:</strong> {new Date(results.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Estado General:</strong> {results.summary.overall_status}
                </p>
                <p>
                  <strong>Pruebas Exitosas:</strong> {results.summary.successful_tests}/
                  {results.summary.total_tests}
                </p>
              </div>

              <TestResult
                $status={
                  results.summary.overall_status === 'ALL_FAILED'
                    ? 'failed'
                    : results.summary.overall_status === 'PARTIAL_SUCCESS'
                      ? 'warning'
                      : 'success'
                }
              >
                <strong>Estado:</strong>{' '}
                {results.summary.overall_status === 'ALL_FAILED'
                  ? 'Todas las pruebas fallaron'
                  : results.summary.overall_status === 'PARTIAL_SUCCESS'
                    ? 'Algunas pruebas fallaron'
                    : 'Todas las pruebas exitosas'}
              </TestResult>

              {results.summary.recommendations.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4>Recomendaciones:</h4>
                  <ul>
                    {results.summary.recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            <Card>
              <h3>Detalles de las Pruebas</h3>
              {results.tests.map((test, index) => (
                <TestResult key={index} $status={getStatusColor(test.status)}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <StatusIndicator $status={getStatusColor(test.status)} />
                    <strong>{test.name}</strong>
                  </div>

                  {test.message && (
                    <p>
                      <strong>Mensaje:</strong> {test.message}
                    </p>
                  )}
                  {test.messageId && (
                    <p>
                      <strong>Message ID:</strong> {test.messageId}
                    </p>
                  )}
                  {test.resolved_ips && (
                    <p>
                      <strong>IPs Resueltas:</strong> {test.resolved_ips.join(', ')}
                    </p>
                  )}

                  {test.error && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <p>
                        <strong>Error:</strong> {test.error}
                      </p>
                      {test.code && (
                        <p>
                          <strong>Código:</strong> {test.code}
                        </p>
                      )}
                      {test.command && (
                        <p>
                          <strong>Comando:</strong> {test.command}
                        </p>
                      )}
                    </div>
                  )}
                </TestResult>
              ))}
            </Card>

            <Card>
              <h3>Información del Entorno</h3>
              <LogContainer>{JSON.stringify(results.environment_details, null, 2)}</LogContainer>
            </Card>
          </>
        )}

        <Card>
          <h3>Información Adicional</h3>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <h4>¿Qué hace este diagnóstico?</h4>
            <ul>
              <li>
                <strong>Prueba de Conexión SMTP (Puerto 465):</strong> Verifica si se puede conectar
                al servidor de correo usando SSL
              </li>
              <li>
                <strong>Prueba de Conexión SMTP (Puerto 587):</strong> Verifica si se puede conectar
                usando TLS
              </li>
              <li>
                <strong>Resolución DNS:</strong> Verifica si el servidor de correo es accesible
              </li>
              <li>
                <strong>Envío de Email de Prueba:</strong> Intenta enviar un email real (opcional)
              </li>
            </ul>

            <h4>Posibles Soluciones:</h4>
            <ul>
              <li>
                Si todas las conexiones SMTP fallan, considera usar un servicio como SendGrid o
                Resend
              </li>
              <li>Verifica que las credenciales SMTP sean correctas</li>
              <li>Revisa si Vercel tiene restricciones de firewall para tu servidor de correo</li>
              <li>
                Considera usar variables de entorno para las credenciales en lugar de hardcodearlas
              </li>
            </ul>
          </div>
        </Card>
      </DiagnosticContainer>
    </PageLayout>
  );
};

export default DiagnosticoEmail;
