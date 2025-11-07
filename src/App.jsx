// src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Importamos TODOS nuestros componentes
import BibliotecaJuegos from './components/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego';
import ListaResenas from './components/ListaResenas';
import FormularioResena from './components/FormularioResena';
import EstadisticasPersonales from './components/EstadisticasPersonales'; // <-- 1. IMPORTAMOS

function App() {
  // --- ESTADOS ---
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);

  // --- FETCH JUEGOS ---
  const fetchJuegos = () => {
    axios.get('http://localhost:3001/api/juegos')
      .then(response => {
        setJuegos(response.data); 
      })
      .catch(error => {
        console.error('¡Hubo un error al obtener los juegos!', error);
      });
  };

  // --- FETCH RESEÑAS ---
  const fetchResenas = () => {
    axios.get('http://localhost:3001/api/resenas')
      .then(response => {
        setResenas(response.data);
      })
      .catch(error => {
        console.error('¡Hubo un error al obtener las reseñas!', error);
      });
  };

  // --- useEffect ---
  useEffect(() => {
    fetchJuegos();
    fetchResenas();
  }, []); 

  // --- MANEJADORES DE JUEGOS ---
  const handleDelete = (idDelJuego) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      axios.delete(`http://localhost:3001/api/juegos/${idDelJuego}`)
        .then(response => {
          console.log(response.data.message);
          fetchJuegos(); 
          fetchResenas();
        })
        .catch(error => {
          console.error('¡Hubo un error al eliminar el juego!', error);
        });
    }
  };

  const handleToggleCompletado = (idDelJuego, estadoActual) => {
    const nuevoEstado = { completado: !estadoActual };
    axios.put(`http://localhost:3001/api/juegos/${idDelJuego}`, nuevoEstado)
      .then(response => {
        console.log('Juego actualizado:', response.data);
        fetchJuegos();
      })
      .catch(error => {
        console.error('¡Hubo un error al actualizar el juego!', error);
      });
  };

  // --- MANEJADOR DE RESEÑAS ---
  const handleDeleteResena = (idDeLaResena) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      axios.delete(`http://localhost:3001/api/resenas/${idDeLaResena}`)
        .then(response => {
          console.log(response.data.message);
          fetchResenas();
        })
        .catch(error => {
          console.error('¡Hubo un error al eliminar la reseña!', error);
        });
    }
  };

  return (
    <div>
      <h1>Mi GameTracker</h1>

      {/* 2. MOSTRAMOS EL DASHBOARD y le pasamos ambos estados */}
      <EstadisticasPersonales juegos={juegos} resenas={resenas} />

      <hr /> 
      
      <FormularioJuego onJuegoAgregado={fetchJuegos} />
      <FormularioResena juegos={juegos} onResenaAgregada={fetchResenas} />
      
      <hr /> 

      <BibliotecaJuegos 
        juegos={juegos} 
        onEliminarJuego={handleDelete} 
        onActualizarJuego={handleToggleCompletado}
      />

      <hr /> 

      <ListaResenas resenas={resenas} onResenaEliminada={handleDeleteResena} />

    </div>
  );
}

export default App;