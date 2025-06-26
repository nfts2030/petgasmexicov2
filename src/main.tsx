import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import 'normalize.css';

// Configuración del Router con basename para soporte en subdirectorios
const basename = process.env.PUBLIC_URL || '';

// Función para verificar si la ruta existe en el servidor
const isRouteHandledByServer = (path: string): boolean => {
  // Lista de rutas que deben ser manejadas por el servidor
  const serverRoutes = ['/api', '/_next', '/static', '/service-worker.js', '/manifest.json'];
  return serverRoutes.some(route => path.startsWith(route));
};

// Función para renderizar la aplicación
const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  
  root.render(
    <React.StrictMode>
      <Router basename={basename}>
        <App />
      </Router>
    </React.StrictMode>
  );
};

// Verificar si la ruta actual debe ser manejada por el servidor
if (!isRouteHandledByServer(window.location.pathname)) {
  // Renderizar la aplicación solo si la ruta no debe ser manejada por el servidor
  renderApp();
}

export default renderApp;
