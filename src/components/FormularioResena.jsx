// src/components/FormularioResena.jsx
import React, { useState } from 'react';
import axios from 'axios';

function FormularioResena({ juegos, onResenaAgregada }) {
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
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
          juegoId: '',
          puntuacion: 5,
          textoReseña: '',
          horasJugadas: 0,
          dificultad: 'Normal'
        });
      })
      .catch(error => {
        console.error('¡Hubo un error al agregar la reseña!', error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card fade-in p-6 max-w-md mx-auto text-white"
    >
      <h2 className="text-acento text-2xl font-orbitron mb-6 text-center drop-shadow-md">
        📝 Escribir Nueva Reseña
      </h2>

      {/* Selección de juego */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold tracking-wide text-acento">
          Juego
        </label>
        <select
          className="w-full bg-transparent border border-cyan-400/40 rounded-md p-2 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          name="juegoId"
          value={formData.juegoId}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona un juego --</option>
          {juegos.map((juego) => (
            <option
              key={juego._id}
              value={juego._id}
              className="bg-[#0a0e3f] text-white"
            >
              {juego.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Puntuación */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold tracking-wide text-acento">
          Puntuación (1 - 5)
        </label>
        <input
          className="w-full bg-transparent border border-cyan-400/40 rounded-md p-2 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          type="number"
          name="puntuacion"
          value={formData.puntuacion}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
      </div>

      {/* Horas Jugadas */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold tracking-wide text-acento">
          Horas Jugadas
        </label>
        <input
          className="w-full bg-transparent border border-cyan-400/40 rounded-md p-2 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          type="number"
          name="horasJugadas"
          value={formData.horasJugadas}
          onChange={handleChange}
          min="0"
        />
      </div>

      {/* Dificultad */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold tracking-wide text-acento">
          Dificultad
        </label>
        <select
          className="w-full bg-transparent border border-cyan-400/40 rounded-md p-2 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          name="dificultad"
          value={formData.dificultad}
          onChange={handleChange}
        >
          <option value="Fácil">Fácil</option>
          <option value="Normal">Normal</option>
          <option value="Difícil">Difícil</option>
          <option value="Extrema">Extrema</option>
        </select>
      </div>

      {/* Texto de reseña */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold tracking-wide text-acento">
          Reseña
        </label>
        <textarea
          className="w-full bg-transparent border border-cyan-400/40 rounded-md p-2 h-24 focus:ring-2 focus:ring-cyan-400 outline-none resize-none transition"
          name="textoReseña"
          value={formData.textoReseña}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn-gamer w-full mt-4"
      >
        💾 Agregar Reseña
      </button>
    </form>
  );
}

export default FormularioResena;
