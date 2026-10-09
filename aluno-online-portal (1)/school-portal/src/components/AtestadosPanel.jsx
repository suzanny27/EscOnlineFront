import React, { useEffect, useState } from 'react';
import { FileText, ImagePlus, Trash2, Upload } from 'lucide-react';
import EmptyState from './EmptyState';
import {
  enviarAtestado,
  excluirAtestado,
  listarAlunos,
  listarAtestadosDoAluno,
  listarAtestadosDoProfessor,
} from '../services/schoolApi';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = /\.(pdf|jpe?g|png|webp)$/i;

export default function AtestadosPanel({ perfil = 'aluno', matriculaInicial = '', professorIdInicial = '' }) {
  const [alunos, setAlunos] = useState([]);
  const [matriculaSelecionada, setMatriculaSelecionada] = useState(String(matriculaInicial || ''));
  const [professorId, setProfessorId] = useState(String(professorIdInicial || ''));
  const [arquivo, setArquivo] = useState(null);
  const [inputArquivoKey, setInputArquivoKey] = useState(0);
  const [atestados, setAtestados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [carregandoAlunos, setCarregandoAlunos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (perfil !== 'professor') return undefined;

    let ativo = true;
    setCarregandoAlunos(true);
    listarAlunos()
      .then((lista) => {
        if (!ativo) return;
        setAlunos(lista);
        setMatriculaSelecionada((atual) => atual || String(lista[0]?.matricula ?? ''));
      })
      .catch((cause) => {
        if (ativo) setErro(cause.response?.data?.message || 'Não foi possível carregar os alunos.');
      })
      .finally(() => { if (ativo) setCarregandoAlunos(false); });

    return () => { ativo = false; };
  }, [perfil]);

  useEffect(() => {
    let ativo = true;
    const identificador = perfil === 'aluno' ? matriculaInicial : professorId;
    if (!/^\d+$/.test(String(identificador || ''))) {
      setAtestados([]);
      if (perfil === 'professor') setErro('Informe o ID numérico do professor para carregar os atestados.');
      setCarregando(false);
      return undefined;
    }

    setErro('');
    setCarregando(true);
    const consulta = perfil === 'aluno'
      ? listarAtestadosDoAluno(identificador)
      : listarAtestadosDoProfessor(identificador);

    consulta
      .then((lista) => { if (ativo) setAtestados(lista); })
      .catch((cause) => {
        if (ativo) setErro(cause.response?.data?.message || 'Não foi possível carregar os atestados.');
      })
      .finally(() => { if (ativo) setCarregando(false); });

    return () => { ativo = false; };
  }, [matriculaInicial, perfil, professorId]);

  async function enviar(event) {
    event.preventDefault();
    setErro('');
    setMensagem('');

    if (!arquivo) {
      setErro('Selecione uma foto ou um PDF.');
      return;
    }
    if (!ALLOWED_EXTENSIONS.test(arquivo.name)) {
      setErro('Formatos permitidos: PDF, JPG, PNG ou WEBP.');
      return;
    }
    if (arquivo.size > MAX_FILE_SIZE) {
      setErro('O arquivo deve ter no máximo 50 MB.');
      return;
    }
    if (!/^\d+$/.test(String(matriculaSelecionada || ''))) {
      setErro('Selecione uma matrícula válida.');
      return;
    }
    if (perfil === 'professor' && !/^\d+$/.test(String(professorId || ''))) {
      setErro('Informe o ID numérico do professor.');
      return;
    }

    setEnviando(true);
    try {
      const salvo = await enviarAtestado({
        arquivo,
        matricula: Number(matriculaSelecionada),
        professorId: perfil === 'professor' ? Number(professorId) : undefined,
      });
      setAtestados((atuais) => [salvo, ...atuais]);
      setArquivo(null);
      setInputArquivoKey((key) => key + 1);
      setMensagem('Atestado enviado com sucesso.');
    } catch (cause) {
      setErro(typeof cause.response?.data === 'string'
        ? cause.response.data
        : cause.response?.data?.message || 'Não foi possível enviar o atestado.');
    } finally {
      setEnviando(false);
    }
  }

  async function remover(atestado) {
    if (!window.confirm(`Excluir o arquivo ${atestado.nomeArquivo}?`)) return;
    setErro('');
    try {
      await excluirAtestado(atestado.id);
      setAtestados((atuais) => atuais.filter((item) => item.id !== atestado.id));
    } catch (cause) {
      setErro(cause.response?.data?.message || 'Não foi possível excluir o atestado.');
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={enviar} className="space-y-4 rounded-xl2 border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-brand-action" />
          <h2 className="text-sm font-bold text-slate-800">Anexar atestado</h2>
        </div>

        {perfil === 'professor' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-500">
              Aluno
              <select required value={matriculaSelecionada} onChange={(event) => setMatriculaSelecionada(event.target.value)} disabled={carregandoAlunos} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50">
                <option value="">{carregandoAlunos ? 'Carregando alunos...' : 'Selecione um aluno'}</option>
                {alunos.map((aluno) => <option key={aluno.matricula} value={String(aluno.matricula)}>{aluno.nome} · {aluno.matricula}</option>)}
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-500">
              ID do professor
              <input type="number" min="1" required value={professorId} onChange={(event) => setProfessorId(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" />
            </label>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Matrícula: {matriculaInicial || 'não informada'}</p>
        )}

        <label className="block text-xs font-semibold text-slate-500">
          Arquivo (PDF, JPG, PNG ou WEBP; até 50 MB)
          <input key={inputArquivoKey} required type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={(event) => setArquivo(event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-700" />
        </label>

        {erro && <p role="alert" className="text-sm text-rose-700">{erro}</p>}
        {mensagem && <p role="status" className="text-sm text-emerald-700">{mensagem}</p>}

        <button disabled={enviando || carregandoAlunos} className="inline-flex items-center gap-2 rounded-lg bg-brand-action px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50">
          <Upload className="h-4 w-4" />{enviando ? 'Enviando...' : 'Enviar atestado'}
        </button>
      </form>

      <section className="rounded-xl2 border border-slate-200 bg-white shadow-card">
        <div className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">Atestados enviados</div>
        {carregando ? <p className="p-5 text-sm text-slate-500">Carregando atestados...</p> : atestados.length === 0 ? (
          <EmptyState message={erro || 'Nenhum atestado cadastrado para esta consulta.'} />
        ) : (
          <ul className="divide-y divide-slate-100">
            {atestados.map((atestado) => (
              <li key={atestado.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <a href={atestado.urlArquivo} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-brand-action hover:underline">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="break-all">{atestado.nomeArquivo}</span>
                </a>
                <div className="flex items-center gap-3">
                  {atestado.matricula != null && <span className="text-xs text-slate-500">Matrícula {atestado.matricula}</span>}
                  <button type="button" onClick={() => remover(atestado)} aria-label={`Excluir ${atestado.nomeArquivo}`} title="Excluir atestado" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}