/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', '"Noto Serif Thai"', 'Georgia', 'serif'],
        sans: ['Geist', '"IBM Plex Sans Thai"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#f2efe9',
        night: '#07080a',
        coral: '#ff6b4a',
        teal: '#2ec4b6',
      },
    },
  },
  plugins: [],
};
