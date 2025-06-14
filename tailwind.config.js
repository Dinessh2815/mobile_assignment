/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#204CBB",
        secondary: "#00AB9A",
      },
    },
  },
  plugins: [],
  // For NativeWind v2 compatibility
  corePlugins: {
    preflight: false,
  },
};
