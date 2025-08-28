// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import 'normalize.css';
import './i18n';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Set the basename for the router
const basename = import.meta.env.PROD ? '/' : '/';

// Get the root container
const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

// Create a root
const root = createRoot(container);

// Log environment for debugging
console.log('Environment:', import.meta.env.MODE);

// Render the app with error boundary
root.render(
  <StrictMode>
    <ErrorBoundary>
      <Router basename={basename}>
        <App />
      </Router>
    </ErrorBoundary>
  </StrictMode>
);
