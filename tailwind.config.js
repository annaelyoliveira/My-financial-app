/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', '"Poppins"', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', '"Poppins"', 'system-ui', 'sans-serif'],
      },
      colors: {
        income: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        expense: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
          light: '#f87171',
        },
        cat: {
          fixo: '#3b82f6',
          alimentacao: '#f59e0b',
          trabalho: '#8b5cf6',
          cartao: '#10b981',
          pessoal: '#ec4899',
          outros: '#64748b',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e1b2e',
        },
        bg: {
          light: '#fdf2f8',
          dark: '#13111c',
        },
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(0,0,0,0.12)',
        'soft-dark': '0 8px 24px -8px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
