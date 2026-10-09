import api from './api';

export async function buscarFrequencia(mesIndex) {
  void mesIndex;
  return [];
}

export async function buscarBoletim(matricula) {
  const { data } = await api.get(`/boletins/aluno/${matricula}/notas`);
  return data;
}
