import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider } from './contexts/SidebarContext';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: '#1e1e2a', color: '#e2e2e8', border: '1px solid #2a2a3a', borderRadius: '12px', fontSize: '14px' },
              success: { iconTheme: { primary: '#22c55e', secondary: '#1e1e2a' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#1e1e2a' } },
            }}
          />
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
