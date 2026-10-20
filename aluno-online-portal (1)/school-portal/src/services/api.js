import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');

if (!API_URL) {
  throw new Error('VITE_API_URL não configurada.');
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const messages = {
      400: 'Verifique os dados informados.',
      403: 'Você não tem permissão para realizar esta ação.',
      404: 'O registro solicitado não foi encontrado.',
      409: 'CPF ou e-mail já cadastrado.',
      500: 'Erro interno do servidor.',
    };
    if (!error.response) error.message = 'Não foi possível conectar ao backend.';
    else if (!error.response.data?.message && messages[status]) error.message = messages[status];
    return Promise.reject(error);
  },
);

export default api;
