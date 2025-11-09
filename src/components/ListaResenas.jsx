// src/components/ListaResenas.jsx
import React from 'react';

function ListaResenas({ resenas, onResenaEliminada }) {
  // Helper para dibujar estrellas (1–5)
  const renderStars = (n = 0) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Number(n) ? 'text-yellow-300' : 'text-gray-600'}>
        ★
      </span>
    ));

  return (
    <section className="fade-in my-10">
      <h2 className="text-acento text-3xl font-orbitron text-center mb-8 drop-shadow-lg">
      </h2>

      {(!resenas || resenas.length === 0) ? (
        <p className="text-center text-gray-400 italic">Aún no hay reseñas… ¡Escribe la primera! ✍️</p>
      ) : (
        <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {resenas.map((resena) => (
            <article
              key={resena._id}
              className="card relative p-5 rounded-2xl text-white shadow-md hover:shadow-cyan-500/30 transition"
            >
              {/* Cabecera: estrellas + botón eliminar */}
              <header className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-lg leading-none">{renderStars(resena.puntuacion)}</div>
                  <span className="text-sm text-gray-300">({resena.puntuacion}/5)</span>
                </div>

                <button
                  onClick={() => onResenaEliminada(resena._id)}
                  className="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded-md text-sm font-semibold transition-all shadow-md hover:shadow-red-500/30"
                  aria-label="Eliminar reseña"
                  title="Eliminar reseña"
                >
                  🗑 Eliminar
                </button>
              </header>

              {/* Cuerpo: texto de reseña */}
              <p className="text-gray-200 leading-relaxed mb-4">
                {resena.textoReseña || <em className="text-gray-500">Sin comentarios…</em>}
              </p>

              {/* Pie: meta info */}
              <footer className="flex items-center justify-between text-sm text-gray-400">
                <span className="inline-flex items-center gap-2">
                  ⏱️ <strong className="text-gray-200">{resena.horasJugadas || 0}</strong> h jugadas
                </span>
                {/* Etiqueta estética */}
                <span className="px-2 py-0.5 rounded-md bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                  Reseña
                </span>
              </footer>

              {/* Borde/decoración sutil */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border border-cyan-400/10" />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaResenas;
