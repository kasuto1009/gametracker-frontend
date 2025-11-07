// src/components/EstadisticasPersonales.jsx

import React from 'react';

// 1. Recibimos la lista de "juegos" y "resenas"
function EstadisticasPersonales({ juegos, resenas }) {

  // 2. Calculamos las estadísticas
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(juego => juego.completado).length;
  
  // Sumamos todas las horas jugadas de todas las reseñas
  const totalHorasJugadas = resenas.reduce((total, resena) => {
    // Asegurarnos de que horasJugadas es un número
    return total + (Number(resena.horasJugadas) || 0); 
  }, 0); // Empezamos el total en 0

  // Estilos
  const statsStyles = {
    padding: '20px',
    margin: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-around' // Para espaciar los items
  };
  const statItemStyles = {
    textAlign: 'center'
  };
  const statNumberStyles = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333'
  };
  const statLabelStyles = {
    fontSize: '0.9em',
    color: '#666'
  };


  return (
    <div>
      <h2>Mis Estadísticas</h2>
      <div style={statsStyles}>
        
        <div style={statItemStyles}>
          <div style={statNumberStyles}>{totalJuegos}</div>
          <div style={statLabelStyles}>Juegos en la Biblioteca</div>
        </div>

        <div style={statItemStyles}>
          <div style={statNumberStyles}>{juegosCompletados}</div>
          <div style={statLabelStyles}>Juegos Completados</div>
        </div>

        <div style={statItemStyles}>
          <div style={statNumberStyles}>{totalHorasJugadas}</div>
          <div style={statLabelStyles}>Horas Jugadas (según reseñas)</div>
        </div>

      </div>
    </div>
  );
}

export default EstadisticasPersonales;