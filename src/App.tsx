import { Suspense, lazy, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import WhatsAppButton from './components/common/WhatsAppButton';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext'; // Import LanguageProvider

// Importar estilos globales
import './App.css';

// Páginas (lazy loaded)
const HomePage = lazy(() => import('./pages/HomePage'));
const MaquinasPage = lazy(() => import('./pages/MaquinasPage'));
const CombustiblesPage = lazy(() => import('./pages/CombustiblesPage'));
const CreditosPage = lazy(() => import('./pages/CreditosPage'));
const ContactoPage = lazy(() => import('./pages/ContactoPage'));
const IntranetPage = lazy(() => import('./pages/IntranetPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Estilos globales para el layout
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-image: 
    var(--bg-gradient-secondary),
    url('/img/04/fdoverdeiconos.jpg');
  background-size: cover, cover;
  background-position: center, center;
  background-attachment: fixed, fixed;
  background-repeat: no-repeat, no-repeat;
  
  /* Fallback background in case the image fails to load */
  background-color: #0d7a3d;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 40px 0 0 0;
  padding: 0;
  overflow: hidden;
  
  @media (min-width: 768px) {
    margin-top: 46px;
  }
`;

// Error Boundary Component for Routes
const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Route error:', event.error);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  return <>{children}</>;
};

// Memoize the main App component
const App: React.FC = () => {
  // Efecto de montaje
  useEffect(() => {
    // Aquí puedes agregar lógica de inicialización si es necesario
    console.log('App mounted');
  }, []);
  
  // Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/maquinas" element={<MaquinasPage />} />
      <Route path="/combustibles" element={<CombustiblesPage />} />
      <Route path="/creditos" element={<CreditosPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/intranet" element={<IntranetPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ), []);
  
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContainer>
          <Header />
          <MainContent>
            <RouteErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                {routes}
              </Suspense>
            </RouteErrorBoundary>
          </MainContent>
          <Footer />
          <WhatsAppButton />
        </AppContainer>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
