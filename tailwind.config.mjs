/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#0071e3',
        primary: '#1d1d1f',
        secondary: '#86868b',
      },
    },
  },
  plugins: [],
};
