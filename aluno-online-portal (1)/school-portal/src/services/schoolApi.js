import api from './api';

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.content) ? data.content : [];
}

async function getList(path) {
  const { data } = await api.get(path, { params: { page: 0, size: 100 } });
  const firstPage = unwrapList(data);
  const totalPages = Number(data?.totalPages || 1);
  if (!Array.isArray(data?.content) || totalPages <= 1) return firstPage;

  const remaining = await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) =>
    api.get(path, { params: { page: index + 1, size: 100 } }).then(({ data: page }) => unwrapList(page))
  ));
  return firstPage.concat(...remaining);
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
export const listarVinculosDoProfessor = (idProfessor) => getList(`/professores-turmas-disciplinas/professor/${idProfessor}`);
export const listarVinculosDaTurma = (idTurma) => getList(`/professores-turmas-disciplinas/turma/${idTurma}`);
export const listarVinculosDaDisciplina = (idDisciplina) => getList(`/professores-turmas-disciplinas/disciplina/${idDisciplina}`);
export const listarCoordenadores = () => getList('/coordenadores');
export const listarDiretores = () => getList('/diretores');
export const listarSecretarios = () => getList('/secretarios');
export const listarAtestados = () => getList('/Atestados/');

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

export async function listarAtestadosDoAluno(matricula) {
  const { data } = await api.get(`/Atestados/aluno/${matricula}`);
  return data;
}

export async function listarAtestadosDoProfessor(professorId) {
  const { data } = await api.get(`/Atestados/professor/${professorId}`);
  return data;
}

export async function enviarAtestado({ arquivo, matricula, professorId }) {
  const formData = new FormData();
  formData.append('arquivo', arquivo);
  formData.append('matricula', String(matricula));
  if (professorId != null) formData.append('professorId', String(professorId));
  const { data } = await api.post('/Atestados/upload', formData);
  return data;
}

export const excluirAtestado = (id) => api.delete(`/Atestados/${id}`);

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
export const excluirProfessor = (id) => api.delete(`/professores/${id}`);
export const excluirResponsavel = (id) => api.delete(`/responsaveis/${id}`);
export const excluirVinculoAlunoResponsavel = (id) => api.delete(`/alunos-responsaveis/${id}`);
export const excluirVinculoProfessor = (id) => api.delete(`/professores-turmas-disciplinas/${id}`);
export const excluirDisciplina = (id) => api.delete(`/disciplinas/${id}`);
export const excluirCoordenador = (id) => api.delete(`/coordenadores/${id}`);
export const excluirDiretor = (id) => api.delete(`/diretores/${id}`);
export const excluirSecretario = (id) => api.delete(`/secretarios/${id}`);

export async function atualizarTurma(id, payload) {
  const { data } = await api.put(`/turmas/${id}`, payload);
  return data;
}

export const atualizarProfessor = (id, payload) => api.put(`/professores/${id}`, payload);
export const atualizarResponsavel = (id, payload) => api.put(`/responsaveis/${id}`, payload);
export const atualizarVinculoAlunoResponsavel = (id, payload) => api.put(`/alunos-responsaveis/${id}`, payload);
export const atualizarVinculoProfessor = (id, payload) => api.put(`/professores-turmas-disciplinas/${id}`, payload);
export const atualizarDisciplina = (id, payload) => api.put(`/disciplinas/${id}`, payload);
export const atualizarCoordenador = (id, payload) => api.put(`/coordenadores/${id}`, payload);
export const atualizarDiretor = (id, payload) => api.put(`/diretores/${id}`, payload);
export const atualizarSecretario = (id, payload) => api.put(`/secretarios/${id}`, payload);

export const gerarBoletim = (matricula, anoLetivo) => api.post(`/boletins/aluno/${matricula}/gerar`, null, { params: { anoLetivo } });
export const buscarHistoricoBoletim = (matricula) => api.get(`/boletins/aluno/${matricula}/historico`);
export const buscarBoletimDoAno = (matricula, anoLetivo) => api.get(`/boletins/aluno/${matricula}/ano/${anoLetivo}`);
export const excluirBoletim = (id) => api.delete(`/boletins/${id}`);
