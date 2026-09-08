import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração padrão do Vite para o projeto React da Escola Estadual
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
