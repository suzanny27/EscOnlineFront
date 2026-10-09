import React, { useEffect, useState } from 'react';
import { FileText, MessageSquareText, Save, Star } from 'lucide-react';
import {
  cadastrarNota,
  cadastrarNotaEscrita,
  listarAlunos,
  listarDisciplinas,
  listarNotas,
  listarNotasEscritasDoAluno,
} from '../../services/schoolApi';

export default function Notas({ matricula: professorIdInicial }) {
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [notas, setNotas] = useState([]);
  const [matricula, setMatricula] = useState('');
  const [professorId, setProfessorId] = useState(/^\d+$/.test(professorIdInicial ?? '') ? professorIdInicial : '');
  const [idDisciplina, setIdDisciplina] = useState('');
  const [bimestre, setBimestre] = useState('1');
  const [valor, setValor] = useState('');
  const [modo, setModo] = useState('numerica');
  const [feedback, setFeedback] = useState('');
  const [notasEscritas, setNotasEscritas] = useState([]);
  const [loadingEscritas, setLoadingEscritas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([listarAlunos(), listarDisciplinas(), listarNotas()])
      .then(([alunosApi, disciplinasApi, notasApi]) => {
        if (!active) return;
        setAlunos(alunosApi);
        setDisciplinas(disciplinasApi);
        setNotas(notasApi);
        setMatricula(alunosApi[0] ? String(alunosApi[0].matricula) : '');
        setIdDisciplina(disciplinasApi[0] ? String(disciplinasApi[0].idDisciplina) : '');
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar os dados do backend.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    if (modo !== 'escrita' || !matricula) {
      setNotasEscritas([]);
      return undefined;
    }

    setLoadingEscritas(true);
    setError('');
    listarNotasEscritasDoAluno(matricula)
      .then((dados) => { if (active) setNotasEscritas(dados); })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar os feedbacks escritos.');
      })
      .finally(() => { if (active) setLoadingEscritas(false); });
    return () => { active = false; };
  }, [matricula, modo]);

  async function salvarNota(event) {
    event.preventDefault();
    setError('');
    const notaValor = Number(valor.replace(',', '.'));
    if (!matricula || !idDisciplina || !Number.isFinite(notaValor) || notaValor < 0 || notaValor > 10) {
      setError('Selecione aluno e disciplina e informe uma nota entre 0 e 10.');
      return;
    }

    setSaving(true);
    try {
      const notaSalva = await cadastrarNota({
        aluno: { matricula: Number(matricula) },
        disciplina: { idDisciplina: Number(idDisciplina) },
        bimestre: Number(bimestre),
        valor: notaValor,
      });
      setNotas((atuais) => [notaSalva, ...atuais]);
      setValor('');
    } catch (cause) {
      setError(cause.response?.data?.message || 'Não foi possível salvar a nota.');
    } finally {
      setSaving(false);
    }
  }

  async function salvarFeedback(event) {
    event.preventDefault();
    setError('');
    if (!matricula || !Number.isInteger(Number(matricula))) {
      setError('Selecione um aluno válido.');
      return;
    }
    if (!professorId || !Number.isInteger(Number(professorId)) || Number(professorId) <= 0) {
      setError('Informe o ID numérico do professor para registrar o feedback.');
      return;
    }
    if (!feedback.trim()) {
      setError('Escreva o feedback antes de salvar.');
      return;
    }

    setSaving(true);
    try {
      const salva = await cadastrarNotaEscrita({
        feedback: feedback.trim(),
        aluno: { matricula: Number(matricula) },
        professorId: Number(professorId),
      });
      setNotasEscritas((atuais) => [salva, ...atuais]);
      setFeedback('');
    } catch (cause) {
      setError(cause.response?.data?.message || 'Não foi possível salvar o feedback escrito.');
    } finally {
      setSaving(false);
    }
  }

  const notasFiltradas = matricula
    ? notas.filter((nota) => String(nota.aluno?.matricula) === matricula)
    : notas;

  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <Star size={20} className="text-brand-400" />
          Lançar Notas
        </h2>
      </div>

      <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-1" role="group" aria-label="Tipo de lançamento de nota">
        <button type="button" onClick={() => { setModo('numerica'); setError(''); }} aria-pressed={modo === 'numerica'} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${modo === 'numerica' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
          <Star size={16} />Nota numérica
        </button>
        <button type="button" onClick={() => { setModo('escrita'); setError(''); }} aria-pressed={modo === 'escrita'} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${modo === 'escrita' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
          <MessageSquareText size={16} />Feedback escrito
        </button>
      </div>

      {modo === 'numerica' ? (
        <form onSubmit={salvarNota} className="mb-5 grid grid-cols-1 gap-3 rounded-xl2 bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-xs font-semibold text-slate-500">Aluno
            <select required value={matricula} onChange={(event) => setMatricula(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <option value="">Selecione</option>
              {alunos.map((aluno) => <option key={aluno.matricula} value={String(aluno.matricula)}>{aluno.nome} · {aluno.matricula}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">Disciplina
            <select required value={idDisciplina} onChange={(event) => setIdDisciplina(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <option value="">Selecione</option>
              {disciplinas.map((disciplina) => <option key={disciplina.idDisciplina} value={String(disciplina.idDisciplina)}>{disciplina.nome}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">Bimestre
            <select value={bimestre} onChange={(event) => setBimestre(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              {[1, 2, 3, 4].map((item) => <option key={item} value={item}>{item}º</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">Nota (0 a 10)
            <input type="number" min="0" max="10" step="0.1" required value={valor} onChange={(event) => setValor(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700" />
          </label>
          <button disabled={saving || loading || !alunos.length || !disciplinas.length} className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-brand-400 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Save size={16} />{saving ? 'Salvando…' : 'Salvar nota'}
          </button>
          {error && <p role="alert" className="text-sm text-rose-700 sm:col-span-2 lg:col-span-5">{error}</p>}
          {!loading && !error && !disciplinas.length && <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-5">Nenhuma disciplina cadastrada no backend.</p>}
        </form>
      ) : (
        <form onSubmit={salvarFeedback} className="mb-5 grid grid-cols-1 gap-3 rounded-xl2 bg-white p-5 shadow-card sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-500">Aluno
            <select required value={matricula} onChange={(event) => setMatricula(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <option value="">Selecione</option>
              {alunos.map((aluno) => <option key={aluno.matricula} value={String(aluno.matricula)}>{aluno.nome} · {aluno.matricula}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">ID do professor
            <input type="number" min="1" required value={professorId} onChange={(event) => setProfessorId(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700" />
          </label>
          <label className="text-xs font-semibold text-slate-500 sm:col-span-2">Feedback
            <textarea required maxLength={5000} rows={5} value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Escreva o feedback para o aluno" className="mt-1 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700" />
          </label>
          <div className="flex items-center justify-between gap-3 sm:col-span-2">
            <span className="text-xs text-slate-400">{feedback.length}/5000</span>
            <button disabled={saving || loading || !alunos.length} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-400 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50">
              <Save size={16} />{saving ? 'Salvando…' : 'Salvar feedback'}
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-rose-700 sm:col-span-2">{error}</p>}
        </form>
      )}

      {modo === 'numerica' ? <div className="overflow-hidden rounded-xl2 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400">
                <th className="px-5 py-3 font-semibold">Aluno</th>
                <th className="px-4 py-3 font-semibold">Disciplina</th>
                <th className="px-4 py-3 font-semibold text-center">Bimestre</th>
                <th className="px-4 py-3 font-semibold text-center">Nota</th>
              </tr>
            </thead>
            <tbody>
              {notasFiltradas.map((nota) => (
                  <tr key={nota.idNota} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <span className="font-medium text-slate-700">{nota.aluno?.nome ?? `Matrícula ${nota.aluno?.matricula ?? '—'}`}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{nota.disciplina?.nome ?? '—'}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{nota.bimestre}º</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-800">{nota.valor}</td>
                  </tr>
                ))}
              {!loading && notasFiltradas.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-400">Nenhuma nota cadastrada para este aluno.</td></tr>
              )}
              {loading && <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-400">Carregando notas...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      : <section className="space-y-3">
        {loadingEscritas && <p className="text-sm text-slate-500">Carregando feedbacks...</p>}
        {!loadingEscritas && notasEscritas.length === 0 && <div className="rounded-xl2 bg-white shadow-card"><p className="p-6 text-center text-sm text-slate-400">Nenhum feedback escrito para este aluno.</p></div>}
        {notasEscritas.map((nota) => (
          <article key={nota.id} className="rounded-xl2 bg-white p-5 shadow-card">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500"><FileText size={15} />Feedback do professor #{nota.professorId}</div>
            <p className="whitespace-pre-wrap text-sm text-slate-700">{nota.feedback}</p>
          </article>
        ))}
      </section>}
    </div>
  );
}