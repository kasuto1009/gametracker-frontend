// src/components/FormularioResena.jsx

import React, { useState } from 'react';
import axios from 'axios';

function FormularioResena({ juegos, onResenaAgregada }) {
  
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0, // Ya estaba en el estado
    dificultad: 'Normal'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.juegoId) {
      alert('Por favor, selecciona un juego.');
      return;
    }

    axios.post('http://localhost:3001/api/resenas', formData)
      .then(response => {
        console.log('¡Reseña agregada!', response.data);
        onResenaAgregada(); 
        setFormData({
          juegoId: '', puntuacion: 5, textoReseña: '',
          horasJugadas: 0, dificultad: 'Normal' // Reseteamos horas jugadas
        });
      })
      .catch(error => {
        console.error('¡Hubo un error al agregar la reseña!', error);
      });
  };

  // ... (estilos se quedan igual)
  const formStyles = { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px', maxWidth: '500px', backgroundColor: '#fcfcfc' };
  const inputGroupStyles = { marginBottom: '10px' };
  const labelStyles = { display: 'block', marginBottom: '5px' };
  const inputStyles = { width: '100%', padding: '8px', boxSizing: 'border-box' };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2>Escribir Nueva Reseña</h2>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="juegoId">Juego:</label>
        <select style={inputStyles} name="juegoId" value={formData.juegoId} onChange={handleChange} required>
          <option value="">-- Selecciona un juego --</option>
          {juegos.map(juego => (
            <option key={juego._id} value={juego._id}>{juego.titulo}</option>
          ))}
        </select>
      </div>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="puntuacion">Puntuación (1-5):</label>
        <input style={inputStyles} type="number" name="puntuacion" value={formData.puntuacion} onChange={handleChange} min="1" max="5" required />
      </div>

      {/* --- ¡CAMPO AÑADIDO! --- */}
      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="horasJugadas">Horas Jugadas:</label>
        <input 
          style={inputStyles} 
          type="number" 
          name="horasJugadas" 
          value={formData.horasJugadas} 
          onChange={handleChange} 
          min="0" 
        />
      </div>
      {/* --- FIN DE CAMPO AÑADIDO --- */}

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="textoReseña">Reseña:</label>
        <textarea style={inputStyles} name="textoReseña" value={formData.textoReseña} onChange={handleChange}></textarea>
      </div>

      <button type="submit">Agregar Reseña</button>
    </form>
  );
}

export default FormularioResena;