export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    '../../escola-estadual/src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#123044',
          700: '#17627a',
          500: '#1f8a9e',
          400: '#ef8354',
          50: '#e8f5f5',
        },
        status: {
          success: '#00c46c',
          info: '#4ba3f7',
          warning: '#eeb318',
          danger: '#f9281e',
        },
        neutral: {
          bg: '#f3f7f8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(30, 71, 143, 0.08)',
        'card-hover': '0 6px 20px rgba(18, 48, 68, 0.14)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
