// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import FormularioJuego from "./components/FormularioJuego";
import ListaResenas from "./components/ListaResenas";
import FormularioResena from "./components/FormularioResena";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [vistaActual, setVistaActual] = useState("inicio"); // ← CONTROL DE SECCIÓN

  // Cargar datos
  const fetchJuegos = () => {
    axios
      .get("http://localhost:3001/api/juegos")
      .then((r) => setJuegos(r.data))
      .catch((e) => console.error("Error al obtener juegos:", e));
  };

  const fetchResenas = () => {
    axios
      .get("http://localhost:3001/api/resenas")
      .then((r) => setResenas(r.data))
      .catch((e) => console.error("Error al obtener reseñas:", e));
  };

  useEffect(() => {
    fetchJuegos();
    fetchResenas();
  }, []);

  // Manejadores
  const handleDeleteJuego = (id) => {
    if (window.confirm("¿Eliminar este juego?")) {
      axios
        .delete(`http://localhost:3001/api/juegos/${id}`)
        .then(fetchJuegos)
        .catch(console.error);
    }
  };

  const handleToggleCompletado = (id, estado) => {
    axios
      .put(`http://localhost:3001/api/juegos/${id}`, { completado: !estado })
      .then(fetchJuegos)
      .catch(console.error);
  };

  const handleDeleteResena = (id) => {
    if (window.confirm("¿Eliminar esta reseña?")) {
      axios
        .delete(`http://localhost:3001/api/resenas/${id}`)
        .then(fetchResenas)
        .catch(console.error);
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#050a30,#000222,#0a0e3f)] text-white relative overflow-x-hidden">

      {/* === HEADER FIJO === */}
      <header className="fixed top-0 left-0 w-full bg-[rgba(5,10,50,0.7)] backdrop-blur-md border-b border-cyan-400/20 shadow-[0_0_10px_rgba(0,191,255,0.3)] z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="font-[Audiowide] text-3xl text-cyan-400 tracking-widest drop-shadow-[0_0_12px_rgba(0,191,255,0.8)] flex items-center gap-3">
            <span className="animate-pulse">🚀</span> GameTracker
          </h1>

          {/* === MENÚ RGB === */}
          <nav className="flex gap-6 text-lg font-orbitron text-cyan-300">
            {[
              ["🏠", "Inicio", "inicio"],
              ["🕹", "Agregar Juego", "juego"],
              ["📝", "Nueva Reseña", "resena"],
              ["📊", "Estadísticas", "stats"],
            ].map(([icon, label, view]) => (
              <button
                key={view}
                onClick={() => setVistaActual(view)}
                className={`hover:text-pink-400 transition-all duration-300 ${
                  vistaActual === view
                    ? "text-pink-400 drop-shadow-[0_0_6px_rgba(255,0,200,0.6)]"
                    : ""
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto transition-all duration-700 ease-in-out">
        {vistaActual === "inicio" && (
          <div className="fade-in">
            <section className="my-10">
              <h2 className="text-3xl text-cyan-300 font-orbitron mb-6 flex items-center gap-2">
                🎮 Mis Juegos
              </h2>
              <BibliotecaJuegos
                juegos={juegos}
                onEliminarJuego={handleDeleteJuego}
                onActualizarJuego={handleToggleCompletado}
              />
            </section>

            <section className="my-10">
              <h2 className="text-3xl text-cyan-300 font-orbitron mb-6 flex items-center gap-2">
                📝 Reseñas Recientes
              </h2>
              <ListaResenas
                resenas={resenas}
                onResenaEliminada={handleDeleteResena}
              />
            </section>
          </div>
        )}

        {vistaActual === "juego" && (
          <div className="fade-in max-w-3xl mx-auto my-10">
            <FormularioJuego onJuegoAgregado={fetchJuegos} />
          </div>
        )}

        {vistaActual === "resena" && (
          <div className="fade-in max-w-3xl mx-auto my-10">
            <FormularioResena juegos={juegos} onResenaAgregada={fetchResenas} />
          </div>
        )}

        {vistaActual === "stats" && (
          <div className="fade-in max-w-5xl mx-auto my-10">
            <EstadisticasPersonales juegos={juegos} resenas={resenas} />
          </div>
        )}
      </main>

      {/* === FOOTER === */}
      <footer className="border-t border-cyan-400/10 text-center text-gray-500 py-6 text-sm">
        <p>
          Hecho por <span className="text-cyan-400">Kazuto</span> ·
          Powered by kazuto422
        </p>
      </footer>
    </div>
  );
}

export default App;
