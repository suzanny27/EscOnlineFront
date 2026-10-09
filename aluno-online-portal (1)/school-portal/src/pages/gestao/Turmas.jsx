import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { atualizarTurma, cadastrarTurma, excluirTurma, listarAlunos, listarTurmas, listarVinculosProfessor } from '../../services/schoolApi';

export default function Turmas() {
  const [anoFiltro, setAnoFiltro] = useState('Todos');
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ idTurma: null, anoSerie: '', nome: '' });
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([listarTurmas(), listarAlunos(), listarVinculosProfessor()])
      .then(([turmasApi, alunosApi, vinculosApi]) => {
        if (!active) return;
        setTurmas(turmasApi);
        setAlunos(alunosApi);
        setVinculos(vinculosApi);
        setError('');
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar as turmas do backend.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [refresh]);

  const anos = useMemo(
    () => [...new Set(turmas.map((turma) => turma.anoSerie).filter(Boolean))].sort(),
    [turmas]
  );
  const turmasFiltradas = anoFiltro === 'Todos'
    ? turmas
    : turmas.filter((turma) => turma.anoSerie === anoFiltro);

  function abrirNovaTurma() {
    setForm({ idTurma: null, anoSerie: anos[0] || '1º Ano', nome: '' });
    setFormError('');
    setModalAberto(true);
  }

  function abrirEdicao(turma) {
    setForm({ idTurma: turma.idTurma, anoSerie: turma.anoSerie, nome: turma.nome });
    setFormError('');
    setModalAberto(true);
  }

  async function salvarTurma(event) {
    event.preventDefault();
    setFormError('');
    setSalvando(true);
    try {
      const payload = { anoSerie: form.anoSerie, nome: form.nome.trim() };
      if (form.idTurma == null) await cadastrarTurma(payload);
      else await atualizarTurma(form.idTurma, payload);
      setModalAberto(false);
      setRefresh((value) => value + 1);
    } catch (cause) {
      setFormError(cause.response?.data?.message || 'Não foi possível salvar a turma.');
    } finally {
      setSalvando(false);
    }
  }

  async function removerTurma(turma) {
    if (!window.confirm(`Excluir a turma ${turma.nome}?`)) return;
    try {
      await excluirTurma(turma.idTurma);
      setRefresh((value) => value + 1);
    } catch (cause) {
      setError(cause.response?.data?.message || 'Não foi possível excluir a turma.');
    }
  }

  function alunosDaTurma(turma) {
    return alunos.filter((aluno) => String(aluno.turma?.idTurma) === String(turma.idTurma)).length;
  }

  function professoresDaTurma(turma) {
    return [...new Set(vinculos
      .filter((vinculo) => String(vinculo.turma?.idTurma) === String(turma.idTurma))
      .map((vinculo) => vinculo.professor?.nome)
      .filter(Boolean))].join(', ') || '—';
  }

  return (
    <>
      <PageHeader
        eyebrow="Ensino Médio / Turmas"
        title="Turmas"
        description="Turmas cadastradas no backend, com alunos e professores vinculados."
        actionLabel="Nova turma"
        actionIcon={Plus}
        onAction={abrirNovaTurma}
      />

      <div className="mb-6 inline-flex flex-wrap gap-1.5 rounded-lg bg-surface-muted p-1">
        {['Todos', ...anos].map((a) => (
          <button
            key={a}
            onClick={() => setAnoFiltro(a)}
            className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
              anoFiltro === a ? 'bg-white text-brand-navy shadow-card' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}

      <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Visão geral</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">
            Turmas cadastradas · {loading ? '…' : turmasFiltradas.length}
          </h2>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4">Turma</th>
                <th className="pb-3 pr-4">Ano/Série</th>
                <th className="pb-3 pr-4">Professor(es)</th>
                <th className="pb-3 pr-4">Alunos</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {turmasFiltradas.map((t) => (
                  <tr key={t.idTurma} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-slate-800">{t.nome}</p>
                      <p className="text-xs text-slate-400">ID {t.idTurma}</p>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">
                      {t.anoSerie}
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">{professoresDaTurma(t)}</td>
                    <td className="py-3.5 pr-4 text-slate-500">{alunosDaTurma(t)} alunos</td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge status="Ativa" />
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => abrirEdicao(t)}
                        className="mr-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" />Editar
                      </button>
                      <button onClick={() => removerTurma(t)} title={`Excluir ${t.nome}`} aria-label={`Excluir ${t.nome}`} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              {!loading && turmasFiltradas.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-slate-400">Nenhuma turma encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 md:hidden">
          {turmasFiltradas.map((t) => (
              <li key={t.idTurma} className="rounded-xl border border-slate-100 p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="font-medium text-slate-800">{t.nome}</p>
                  <StatusBadge status="Ativa" />
                </div>
                <p className="text-xs text-slate-500">{t.anoSerie}</p>
                <p className="text-xs text-slate-500">{professoresDaTurma(t)} · {alunosDaTurma(t)} alunos</p>
                <button
                  onClick={() => abrirEdicao(t)}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-action"
                >
                  <Pencil className="h-3.5 w-3.5" />Editar
                </button>
                <button onClick={() => removerTurma(t)} title={`Excluir ${t.nome}`} aria-label={`Excluir ${t.nome}`} className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
        </ul>
      </section>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <form onSubmit={salvarTurma} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-brand-navy">{form.idTurma == null ? 'Nova turma' : 'Editar turma'}</h2>
            <label className="block text-sm font-medium text-slate-600">Ano/Série
              <select required value={form.anoSerie} onChange={(event) => setForm((value) => ({ ...value, anoSerie: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                {[...new Set([...anos, '1º Ano', '2º Ano', '3º Ano'])].map((ano) => <option key={ano} value={ano}>{ano}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-600">Nome da turma
              <input required value={form.nome} onChange={(event) => setForm((value) => ({ ...value, nome: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            {formError && <p role="alert" className="text-sm text-rose-700">{formError}</p>}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModalAberto(false)} className="rounded-md border border-slate-300 px-4 py-2 text-sm">Cancelar</button>
              <button disabled={salvando} className="rounded-md bg-brand-action px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{salvando ? 'Salvando…' : 'Salvar'}</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}