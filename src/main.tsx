import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import 'normalize.css';

// Usar window.location.origin para obtener el origen actual
const basename = process.env.NODE_ENV === 'production' ? '/' : '/';

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

// Renderizar la aplicación directamente
renderApp();

export default renderApp;
