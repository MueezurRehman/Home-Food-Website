/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors:{
            tan: "#b98e56",
            white: "#ffffff",
            yellow: "#8B5A2B",
            black: "#000000",
            gray: "#e5e5e5",
            cream: "#fcebce",
         },
      },

   },
   plugins: [],
};
