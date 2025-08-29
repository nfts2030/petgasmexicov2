import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import 'normalize.css';
import './i18n';

// Get the root container
const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
