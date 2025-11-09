// src/components/TarjetaJuego.jsx
import React from 'react';

function TarjetaJuego({ juego, onEliminar, onActualizar }) {
  // Manejador del botón de actualización
  const handleToggle = () => {
    onActualizar(juego._id, juego.completado);
  };

  return (
    <div
      className="card relative p-4 rounded-2xl overflow-hidden text-white shadow-md hover:shadow-cyan-500/40 transition transform hover:scale-105"
    >
      {/* Imagen de portada */}
      {juego.imagenPortada ? (
        <img
          src={juego.imagenPortada}
          alt={`Portada de ${juego.titulo}`}
          className="w-full h-40 object-cover rounded-lg mb-3 border border-cyan-400/30"
        />
      ) : (
        <div className="w-full h-40 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-400">
          🎮 Sin portada
        </div>
      )}

      {/* Info del juego */}
      <h3 className="text-lg font-orbitron text-acento mb-1 drop-shadow-sm">
        {juego.titulo}
      </h3>
      <p className="text-sm text-gray-300 mb-2 italic">
        {juego.genero} | {juego.plataforma}
      </p>

      {/* Estado */}
      <p
        className={`text-sm font-semibold mb-3 ${
          juego.completado ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {juego.completado ? '✅ Completado' : '❌ Pendiente'}
      </p>

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEliminar(juego._id)}
          className="px-3 py-1 bg-red-600/70 hover:bg-red-600 text-white rounded-md text-sm font-semibold transition-all shadow-md hover:shadow-red-500/30"
        >
          🗑 Eliminar
        </button>

        <button
          onClick={handleToggle}
          className={`px-3 py-1 rounded-md text-sm font-semibold transition-all shadow-md ${
            juego.completado
              ? 'bg-yellow-400/80 hover:bg-yellow-400 text-black hover:shadow-yellow-400/40'
              : 'bg-green-500/80 hover:bg-green-500 text-black hover:shadow-green-400/40'
          }`}
        >
          {juego.completado ? 'Marcar Pendiente' : 'Marcar Completado'}
        </button>
      </div>

      {/* Decoración sutil neón */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border border-cyan-400/10 shadow-[0_0_10px_rgba(0,191,255,0.1)]"></div>
    </div>
  );
}

export default TarjetaJuego;
