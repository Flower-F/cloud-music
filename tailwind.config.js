/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        theme_color: '#d44439',
        theme_color_shadow: 'rgba(212, 68, 57, .5)',
        light_color: '#f1f1f1',
        desc_color: '#2E3030',
        desc_color_v2: '#bba8a8',
        border_color: '#e4e4e4',
        background_color: '#f2f3f4',
        background_color_shadow: 'rgba(0, 0, 0, 0.3)',
        highlight_background_color: '#fff',
        inherit: 'inherit'
      }
    }
  },
  plugins: []
}
