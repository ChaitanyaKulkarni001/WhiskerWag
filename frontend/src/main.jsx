// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './ThemeContext.jsx';
// import { ThemeProvider } from './ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className='bg-gradient-to-r from-pink-500 via-orange-400 to-purple-600'>
    <ThemeProvider>

      <App />
    </ThemeProvider>
      </div>
  </StrictMode>,
);
