import api from './api';

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.content) ? data.content : [];
}

async function getList(path) {
  const { data } = await api.get(path, { params: { page: 0, size: 100 } });
  return unwrapList(data);
}

export const listarAlunos = () => getList('/alunos');
export const listarTurmas = () => getList('/turmas');
export const listarProfessores = () => getList('/professores');
export const listarResponsaveis = () => getList('/responsaveis');
export const listarVinculosAlunoResponsavel = () => getList('/alunos-responsaveis');
export const listarDisciplinas = () => getList('/disciplinas');
export const listarNotas = () => getList('/notas');
export async function listarNotasDoAluno(matricula) {
  const { data } = await api.get(`/notas/aluno/${matricula}`);
  return data;
}
export const listarVinculosProfessor = () => getList('/professores-turmas-disciplinas');
export const listarCoordenadores = () => getList('/coordenadores');
export const listarDiretores = () => getList('/diretores');
export const listarSecretarios = () => getList('/secretarios');

export async function cadastrarAluno(payload) {
  const { data } = await api.post('/alunos', payload);
  return data;
}

export async function cadastrarProfessor(payload) {
  const { data } = await api.post('/professores', payload);
  return data;
}

export async function cadastrarResponsavel(payload) {
  const { data } = await api.post('/responsaveis', payload);
  return data;
}

export async function cadastrarVinculoAlunoResponsavel(payload) {
  const { data } = await api.post('/alunos-responsaveis', payload);
  return data;
}

export async function cadastrarCoordenador(payload) {
  const { data } = await api.post('/coordenadores', payload);
  return data;
}

export async function cadastrarDiretor(payload) {
  const { data } = await api.post('/diretores', payload);
  return data;
}

export async function cadastrarSecretario(payload) {
  const { data } = await api.post('/secretarios', payload);
  return data;
}

export async function cadastrarDisciplina(payload) {
  const { data } = await api.post('/disciplinas', payload);
  return data;
}

export async function cadastrarVinculoProfessor(payload) {
  const { data } = await api.post('/professores-turmas-disciplinas', payload);
  return data;
}

export async function cadastrarTurma(payload) {
  const { data } = await api.post('/turmas', payload);
  return data;
}

export async function cadastrarNota(payload) {
  const { data } = await api.post('/notas', payload);
  return data;
}

export async function listarNotasEscritasDoAluno(matricula) {
  const { data } = await api.get(`/NotasEscritas/aluno/${matricula}`);
  return data;
}

export async function cadastrarNotaEscrita(payload) {
  const { data } = await api.post('/NotasEscritas', payload);
  return data;
}

export async function buscarBoletim(matricula) {
  const { data } = await api.get(`/boletins/aluno/${matricula}/notas`);
  return data;
}

export async function buscarBoletimConceito(matricula) {
  const { data } = await api.get(`/boletins/aluno/${matricula}/conceito`);
  return data;
}

export const excluirAluno = (matricula) => api.delete(`/alunos/${matricula}`);
export const excluirTurma = (id) => api.delete(`/turmas/${id}`);
export const excluirNota = (id) => api.delete(`/notas/${id}`);

export async function atualizarTurma(id, payload) {
  const { data } = await api.put(`/turmas/${id}`, payload);
  return data;
}