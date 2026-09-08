/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca extraída do design (Canva) fornecido pelo usuário.
        // Observação: o valor "#250c8" enviado tem 5 dígitos (hex inválido);
        // foi normalizado aqui para "#25078c" (o tom navy/roxo escuro visto
        // na barra lateral e nos títulos). Ajuste facilmente aqui se preciso.
        brand: {
          navy: '#25078c',   // fundo da sidebar, títulos grandes
          dark: '#1e478f',   // textos de apoio escuros, ícones ativos
          mid: '#4a77c6',    // acentos médios, gráficos secundários
          action: '#0058f3', // botões primários, links de ação, itens ativos
        },
        surface: {
          DEFAULT: '#f4f6fb', // fundo geral da área de conteúdo
          card: '#ffffff',
          muted: '#eef1f8',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', '"Georgia"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 24, 55, 0.04), 0 1px 3px 0 rgba(16, 24, 55, 0.06)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};
