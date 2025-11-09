// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 🔹 Importa TailwindCSS (asegúrate de tener src/index.css configurado)
import './index.css';

// 1️⃣ Importamos las herramientas de Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 2️⃣ Creamos un tema profesional unificado (MUI + Tailwind)
const miTemaProfesional = createTheme({
  palette: {
    mode: 'dark',

    // 🎨 Colores principales
    primary: {
      main: '#00bfff', // Azul neón (acento principal)
    },
    secondary: {
      main: '#ab47bc', // Morado suave (para botones secundarios)
    },

    // 🖤 Fondos coherentes con Tailwind
    background: {
      default: '#0a0e3f', // Azul oscuro (igual que bg-fondo)
      paper: '#111758',   // Azul intermedio (igual que bg-tarjeta)
    },

    text: {
      primary: '#ffffff',
      secondary: '#eeeeee',
    },
  },

  // ✨ Tipografía moderna y legible
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// 3️⃣ Render principal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={miTemaProfesional}>
      <CssBaseline /> {/* Aplica fondo, colores y tipografía base */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
