// src/components/ListaResenas.jsx

import React from 'react'; 

// 1. Recibimos la nueva prop "onResenaEliminada"
function ListaResenas({ resenas, onResenaEliminada }) {

  // Estilos
  const listStyles = {
    padding: '20px',
    margin: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };
  const itemStyles = {
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px'
  };
  
  // Estilo para el botón de eliminar
  const deleteButtonStyles = {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '2px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8em',
    marginLeft: '10px'
  };


  return (
    <div style={listStyles}>
      <h2>Reseñas Recientes:</h2>
      {resenas.length === 0 ? (
        <p>Aún no hay reseñas. ¡Escribe una!</p>
      ) : (
        <ul>
          {resenas.map(resena => (
            <li key={resena._id} style={itemStyles}>
              <strong>Puntuación: {resena.puntuacion} ★</strong>
              
              {/* 2. ¡NUEVO BOTÓN DE ELIMINAR! */}
              <button 
                style={deleteButtonStyles}
                onClick={() => onResenaEliminada(resena._id)}
              >
                Eliminar
              </button>
              
              <p>{resena.textoReseña}</p>
              <small>Horas jugadas: {resena.horasJugadas}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ¡¡ESTA ES LA LÍNEA QUE PROBABLEMENTE FALTABA!!
export default ListaResenas;