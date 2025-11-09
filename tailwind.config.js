/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fondo: "#0a0e3f",   // Fondo oscuro principal
        tarjeta: "#111758", // Fondo de tarjetas
        acento: "#00bfff",  // Azul neón gamer
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
