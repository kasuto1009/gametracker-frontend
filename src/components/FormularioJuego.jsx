// src/components/FormularioJuego.jsx

import React, { useState } from 'react';
import axios from 'axios';

// 1. El componente ahora recibe la función "onJuegoAgregado" como prop
function FormularioJuego({ onJuegoAgregado }) { 
  
  const [formData, setFormData] = useState({
    titulo: '', genero: '', plataforma: '', añoLanzamiento: 2024,
    desarrollador: '', imagenPortada: '', descripcion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    axios.post('http://localhost:3001/api/juegos', formData)
      .then(response => {
        console.log('¡Juego agregado!', response.data);
        
        // 2. ¡AQUÍ ESTÁ LA MAGIA!
        // Después de agregar el juego, llamamos a la función
        // que nos pasó App.jsx para refrescar la lista.
        onJuegoAgregado(); 
        
        // Limpiamos el formulario
        setFormData({
          titulo: '', genero: '', plataforma: '', añoLanzamiento: 2024,
          desarrollador: '', imagenPortada: '', descripcion: ''
        });
        
        // Ya no necesitamos la alerta, se verá al instante
        // alert('¡Juego agregado con éxito!'); 
      })
      .catch(error => {
        console.error('¡Hubo un error al agregar el juego!', error);
      });
  };

  // ... (Todos los estilos 'formStyles', 'inputGroupStyles', etc. se quedan igual)
  const formStyles = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '20px',
    maxWidth: '500px'
  };
  const inputGroupStyles = {
    marginBottom: '10px'
  };
  const labelStyles = {
    display: 'block',
    marginBottom: '5px'
  };
  const inputStyles = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2>Agregar Nuevo Juego</h2>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="titulo">Título:</label>
        <input style={inputStyles} type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </div>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="genero">Género:</label>
        <input style={inputStyles} type="text" name="genero" value={formData.genero} onChange={handleChange} />
      </div>
      
      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="plataforma">Plataforma:</label>
        <input style={inputStyles} type="text" name="plataforma" value={formData.plataforma} onChange={handleChange} />
      </div>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="imagenPortada">URL de la Portada:</label>
        <input style={inputStyles} type="text" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} />
      </div>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="descripcion">Descripción:</label>
        <textarea style={inputStyles} name="descripcion" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>

      <button type="submit">Agregar Juego</button>
    </form>
  );
}

export default FormularioJuego;