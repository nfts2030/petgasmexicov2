import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

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

function App() {
  console.log('App se está renderizando');
  
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
