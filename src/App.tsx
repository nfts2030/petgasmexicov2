import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import WhatsAppButton from './components/common/WhatsAppButton';

// Importar estilos globales
import './App.css';

// Páginas (lazy loaded)
const HomePage = lazy(() => import('./pages/HomePage'));
const EquipoPage = lazy(() => import('./pages/EquipoPage'));
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
  background-image: url('/img/04/fdoverdeiconos.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
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

// Memoize the main App component
const App: React.FC = () => {
  // Efecto de montaje
  useEffect(() => {
    // Aquí puedes agregar lógica de inicialización si es necesario
  }, []);
  
  // Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/equipo" element={<EquipoPage />} />
      <Route path="/maquinas" element={<MaquinasPage />} />
      <Route path="/combustibles" element={<CombustiblesPage />} />
      <Route path="/creditos" element={<CreditosPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/intranet" element={<IntranetPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ), []);
  
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Suspense fallback={<LoadingSpinner />}>
          {routes}
        </Suspense>
      </MainContent>
      <Footer />
      <WhatsAppButton />
    </AppContainer>
  );
}

export default App;
