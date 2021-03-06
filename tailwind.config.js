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
      },
      keyframes: {
        wave: {
          '0%, 40%, 100%': {
            transform: 'scaleY(0.4)',
            'transform-origin': 'center 100%'
          },
          '20%': {
            transform: 'scaleY(1)'
          }
        },
        marquee: {
          from: {
            left: '100%'
          },
          to: {
            left: '-100%'
          }
        },
        'mini-rotating': {
          from: {
            transform: 'rotate(0)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        },
        'normal-rotating': {
          from: {
            transform: 'rotate(0)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        wave: 'wave 1s infinite',
        marquee: 'marquee 14s linear infinite',
        'mini-rotating': 'mini-rotating 10s linear infinite',
        'normal-rotating': 'normal-rotating 20s linear infinite'
      }
    }
  },
  plugins: []
}
