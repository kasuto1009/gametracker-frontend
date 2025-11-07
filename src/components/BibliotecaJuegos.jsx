// src/components/BibliotecaJuegos.jsx

import React from 'react';
import TarjetaJuego from './TarjetaJuego'; 

// 1. Recibimos la nueva prop "onActualizarJuego"
function BibliotecaJuegos({ juegos, onEliminarJuego, onActualizarJuego }) {

  const libraryStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div>
      <h2>Mis Juegos:</h2>
      <div style={libraryStyles}>
        {juegos.map(juego => (
          <TarjetaJuego 
            key={juego._id} 
            juego={juego} 
            onEliminar={onEliminarJuego} 
            // 2. Pasamos la función de actualizar a la tarjeta
            onActualizar={onActualizarJuego} // <-- NUEVA PROP
          />
        ))}
      </div>
    </div>
  );
}

export default BibliotecaJuegos;