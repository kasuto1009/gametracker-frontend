// src/components/EstadisticasPersonales.jsx
import React from 'react';

function EstadisticasPersonales({ juegos, resenas }) {
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter((juego) => juego.completado).length;
  const totalHorasJugadas = resenas.reduce(
    (total, resena) => total + (Number(resena.horasJugadas) || 0),
    0
  );

  return (
    <div className="fade-in my-10">
      <h2 className="text-acento text-3xl font-orbitron text-center mb-8 drop-shadow-lg">
        📊 Mis Estadísticas
      </h2>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {/* Tarjeta: Total de juegos */}
        <div className="card w-64 h-40 flex flex-col items-center justify-center text-center p-4 transition transform hover:scale-105 shadow-cyan-500/20">
          <div className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]">
            {totalJuegos}
          </div>
          <p className="text-gray-300 mt-2 text-sm tracking-wide">
            Juegos en la Biblioteca
          </p>
        </div>

        {/* Tarjeta: Juegos Completados */}
        <div className="card w-64 h-40 flex flex-col items-center justify-center text-center p-4 transition transform hover:scale-105 shadow-green-500/20">
          <div className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(0,255,100,0.6)]">
            {juegosCompletados}
          </div>
          <p className="text-gray-300 mt-2 text-sm tracking-wide">
            Juegos Completados
          </p>
        </div>

        {/* Tarjeta: Horas Jugadas */}
        <div className="card w-64 h-40 flex flex-col items-center justify-center text-center p-4 transition transform hover:scale-105 shadow-blue-500/20">
          <div className="text-5xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(50,150,255,0.6)]">
            {totalHorasJugadas}
          </div>
          <p className="text-gray-300 mt-2 text-sm tracking-wide">
            Horas Jugadas (según reseñas)
          </p>
        </div>
      </div>
    </div>
  );
}

export default EstadisticasPersonales;
