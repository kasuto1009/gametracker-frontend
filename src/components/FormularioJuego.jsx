// src/components/FormularioJuego.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

function FormularioJuego({ onJuegoAgregado }) {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: 2024,
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
  });

  const [juegosBase, setJuegosBase] = useState([]);
  const [sugerencia, setSugerencia] = useState(null);
  const [valido, setValido] = useState(true);
  const [loading, setLoading] = useState(false);

  // --- Cargamos juegos base comunes (por si no hay conexión) ---
  useEffect(() => {
    setJuegosBase([
      'Grand Theft Auto V',
      'Red Dead Redemption 2',
      'Minecraft',
      'Fortnite',
      'The Witcher 3: Wild Hunt',
      'Cyberpunk 2077',
      'Call of Duty: Modern Warfare II',
      'Elden Ring',
      'God of War Ragnarök',
      'GTA San Andreas',
      'GTA IV',
      'GTA Vice City',
      'PUBG',
      'Apex Legends',
      'Valorant',
      'League of Legends',
      'Overwatch 2',
      'Assassin’s Creed Valhalla',
      'FIFA 24',
      'Hogwarts Legacy',
    ]);
  }, []);

  const fuse = new Fuse(juegosBase, {
    includeScore: true,
    threshold: 0.4,
  });

  // --- Función que busca automáticamente info e imagen del juego ---
  const buscarJuegoEnRAWG = async (nombre) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          search: nombre,
          key: import.meta.env.VITE_RAWG_KEY, // ✅ API Key desde .env
        },
      });

      if (res.data.results && res.data.results.length > 0) {
        const juego = res.data.results[0];
        setFormData((prev) => ({
          ...prev,
          titulo: juego.name || prev.titulo,
          imagenPortada: juego.background_image || prev.imagenPortada,
          genero: juego.genres?.[0]?.name || prev.genero,
          plataforma: juego.platforms?.[0]?.platform?.name || prev.plataforma,
          descripcion: juego.released
            ? `Fecha de lanzamiento: ${juego.released}`
            : prev.descripcion,
        }));
      } else {
        setValido(false);
      }
    } catch (err) {
      console.error('Error al buscar en RAWG:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'titulo' && value.trim().length > 2) {
      const result = fuse.search(value.trim());
      if (result.length > 0) {
        const mejorCoincidencia = result[0].item;
        const score = result[0].score;
        setValido(true);
        if (score > 0.25) setSugerencia(mejorCoincidencia);
        else setSugerencia(null);

        // Buscar automáticamente la imagen del juego
        await buscarJuegoEnRAWG(value.trim());
      } else {
        setValido(false);
        setSugerencia(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valido) {
      alert('⚠️ No se reconoce ese juego. Corrige el título antes de continuar.');
      return;
    }

    axios
      .post('http://localhost:3001/api/juegos', formData)
      .then(() => {
        onJuegoAgregado();
        setFormData({
          titulo: '',
          genero: '',
          plataforma: '',
          añoLanzamiento: 2024,
          desarrollador: '',
          imagenPortada: '',
          descripcion: '',
        });
      })
      .catch((err) => console.error('Error al agregar el juego:', err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6 space-y-4 fade-in text-gray-200"
    >
      <h2 className="text-xl text-cyan-400 font-orbitron flex items-center gap-2">
        🕹 Agregar Nuevo Juego
      </h2>

      {/* Campo Título */}
      <div>
        <label className="block mb-1 text-sm">Título:</label>
        <input
          list="listaJuegos"
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ejemplo: Grand Theft Auto V"
          className={`w-full p-2 rounded-md border ${
            valido ? 'border-gray-600' : 'border-red-500'
          } bg-[#0b0f25] text-white`}
          required
        />
        <datalist id="listaJuegos">
          {juegosBase.map((juego, i) => (
            <option key={i} value={juego} />
          ))}
        </datalist>

        {!valido && (
          <p className="text-red-400 text-sm mt-1">
            ❌ No se reconoce ese juego.
          </p>
        )}

        {sugerencia && (
          <p className="text-yellow-400 text-sm mt-1">
            💡 ¿Quizás quisiste decir: <strong>{sugerencia}</strong>?
          </p>
        )}
      </div>

      {/* Imagen automática */}
      {formData.imagenPortada && (
        <div className="flex justify-center">
          <img
            src={formData.imagenPortada}
            alt={formData.titulo}
            className="rounded-lg shadow-md border border-cyan-400/30 max-h-48"
          />
        </div>
      )}

      {/* Resto de campos */}
      <div>
        <label className="block mb-1 text-sm">Género:</label>
        <input
          type="text"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#0b0f25] text-white border border-gray-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Plataforma:</label>
        <input
          type="text"
          name="plataforma"
          value={formData.plataforma}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#0b0f25] text-white border border-gray-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#0b0f25] text-white border border-gray-600"
          rows={3}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn-gamer w-full mt-4 font-semibold text-lg tracking-wide"
      >
        {loading ? 'Buscando juego...' : 'Agregar Juego'}
      </button>
    </form>
  );
}

export default FormularioJuego;
