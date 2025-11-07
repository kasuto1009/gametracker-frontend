// src/components/TarjetaJuego.jsx

import React from 'react';

// 1. Recibimos la nueva prop "onActualizar"
function TarjetaJuego({ juego, onEliminar, onActualizar }) { 

  // ... (deleteButtonStyles se queda igual)
  const deleteButtonStyles = {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    marginRight: '5px' // Añadido margen
  };

  // --- NUEVOS ESTILOS PARA EL BOTÓN DE ACTUALIZAR ---
  const updateButtonStyles = {
    backgroundColor: '#4CAF50', // Verde
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };
  // --- FIN DE NUEVOS ESTILOS ---

  // ... (cardStyles e imageStyles se quedan igual)
  const cardStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const imageStyles = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    display: juego.imagenPortada ? 'block' : 'none' 
  };

  // 2. Creamos una función manejadora para el clic
  const handleToggle = () => {
    // Llama a la función onActualizar pasándole el ID
    // y el estado "completado" actual del juego
    onActualizar(juego._id, juego.completado);
  };

  return (
    <div style={cardStyles}>
      <img 
        src={juego.imagenPortada} 
        alt={`Portada de ${juego.titulo}`} 
        style={imageStyles} 
      />
      <h3>{juego.titulo}</h3>
      <p>{juego.genero} | {juego.plataforma}</p>
      
      {/* 3. El texto del párrafo ahora depende del estado "completado" */}
      <p>{juego.completado ? '✅ Completado' : '❌ Pendiente'}</p>

      {/* 4. Botón de Eliminar */}
      <button 
        style={deleteButtonStyles} 
        onClick={() => onEliminar(juego._id)}
      >
        Eliminar
      </button>

      {/* 5. ¡NUEVO BOTÓN DE ACTUALIZAR! */}
      {/* El texto del botón cambia dependiendo si está completado o no */}
      <button 
        style={updateButtonStyles}
        onClick={handleToggle} // Llama a la función manejadora
      >
        {juego.completado ? 'Marcar Pendiente' : 'Marcar Completado'}
      </button>
    </div>
  );
}

export default TarjetaJuego;