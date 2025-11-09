// src/components/BibliotecaJuegos.jsx
import React from 'react';
import TarjetaJuego from './TarjetaJuego';

function BibliotecaJuegos({ juegos, onEliminarJuego, onActualizarJuego }) {
  return (
    <div className="fade-in my-10">
      <h2 className="text-acento text-3xl font-orbitron text-center mb-8 drop-shadow-lg">
      </h2>

      {juegos.length === 0 ? (
        <p className="text-center text-gray-400 italic">
          No tienes juegos en la biblioteca aún...
        </p>
      ) : (
        <div
          className="grid gap-6 justify-center px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEliminar={onEliminarJuego}
              onActualizar={onActualizarJuego}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BibliotecaJuegos;
