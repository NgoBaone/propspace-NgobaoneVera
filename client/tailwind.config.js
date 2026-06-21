/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy primary (buttons, headings, nav)
        navy: {
          50: '#eef2f8',
          100: '#d6deec',
          200: '#aebfd9',
          300: '#7f9ac1',
          400: '#5274a6',
          500: '#34568a',
          600: '#26426d',
          700: '#1f3559',
          800: '#1b2c49',
          900: '#16233a',
          950: '#0f1827',
        },
        // Sky blue used in the hero gradient
        sky: {
          300: '#9ec5f0',
          400: '#6ea6e6',
          500: '#4886d6',
        },
        canvas: '#f6f7f9',
        surface: '#ffffff',
        line: '#e7eaef',
        slate: '#3a4250',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 20px 50px -24px rgba(22, 35, 58, 0.30)',
        card: '0 12px 32px -18px rgba(22, 35, 58, 0.20)',
        search: '0 18px 45px -18px rgba(22, 35, 58, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
