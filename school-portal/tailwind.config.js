/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta solicitada pelo cliente.
        // Obs: o hex "#250c8" tem 5 dígitos (inválido em CSS/Tailwind),
        // então foi interpretado como "#2250c8" (o valor mais próximo
        // e coerente com o restante da escala de azuis fornecida).
        brand: {
          900: '#1e478f', // azul escuro - headers, texto de destaque
          700: '#2250c8', // azul principal - botões primários, links ativos
          500: '#4a77c6', // azul médio - hover, elementos secundários
          400: '#0058f3', // azul vibrante - CTAs, ícones ativos, badges
          50: '#eef4ff',  // azul quase branco - fundos suaves, hover leve
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(30, 71, 143, 0.08)',
        'card-hover': '0 6px 20px rgba(30, 71, 143, 0.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
