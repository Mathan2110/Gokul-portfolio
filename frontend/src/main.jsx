import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AppProvider } from './context/AppContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#12121A',
              color: '#F5F0E8',
              border: '1px solid #2A2A35',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#C9A84C', secondary: '#0A0A0F' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0A0A0F' },
            },
          }}
        />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);