import { useMemo, useState } from 'react';
import { Plus, Search, GraduationCap, User, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import FooterStats from '../components/FooterStats.jsx';
import NovoCadastroModal from '../components/NovoCadastroModal.jsx';
import ViewFichaModal from '../components/ViewFichaModal.jsx';
import { useCadastros, resumoAluno, resumoProfessor } from '../context/CadastrosContext.jsx';
import { CADASTROS_FOOTER_STATS } from '../data/pages.js';

export default function Cadastros() {
  const { alunos, professores, addAluno, addProfessor } = useCadastros();
  const [tab, setTab] = useState('alunos');
  const [query, setQuery] = useState('');
  const [novoCadastroAberto, setNovoCadastroAberto] = useState(false);
  const [fichaAberta, setFichaAberta] = useState(null); // { tipo, registro } | null

  const rows = useMemo(
    () => (tab === 'alunos' ? alunos.map(resumoAluno) : professores.map(resumoProfessor)),
    [tab, alunos, professores]
  );
  const filtered = useMemo(
    () => rows.filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase())),
    [rows, query]
  );

  const abrirFicha = (row) => {
    const tipo = tab === 'alunos' ? 'aluno' : 'professor';
    const lista = tab === 'alunos' ? alunos : professores;
    const registro = lista.find((r) => r.matricula === row.code);
    if (registro) setFichaAberta({ tipo, registro });
  };

  return (
    <>
      <PageHeader
        eyebrow="Gestão acadêmica / Cadastros"
        title="Cadastros"
        description="Organize os perfis que dão vida à comunidade escolar."
        actionLabel="Novo cadastro"
        actionIcon={Plus}
        onAction={() => setNovoCadastroAberto(true)}
      />

      <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Alternância Alunos / Professores */}
          <div className="inline-flex rounded-lg bg-surface-muted p-1">
            <button
              type="button"
              onClick={() => setTab('alunos')}
              className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                tab === 'alunos' ? 'bg-brand-action text-white shadow-card' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Alunos
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                  tab === 'alunos' ? 'bg-white/20' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {alunos.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab('professores')}
              className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                tab === 'professores' ? 'bg-brand-action text-white shadow-card' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="h-4 w-4" />
              Professores
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                  tab === 'professores' ? 'bg-white/20' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {professores.length}
              </span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-action"
            />
          </div>
        </div>

        {/* Tabela desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4">Pessoa</th>
                <th className="pb-3 pr-4">Curso</th>
                <th className="pb-3 pr-4">Turma / Vínculo</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-brand-navy">
                        {p.id}
                      </span>
                      <div>
                        <p className="font-medium text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500">{p.etapa}</td>
                  <td className="py-3.5 pr-4 text-slate-500">{p.turma}</td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={() => abrirFicha(p)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-action hover:underline"
                    >
                      Ver ficha
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                    Nenhuma pessoa encontrada para “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cartões mobile */}
        <ul className="space-y-3 md:hidden">
          {filtered.map((p) => (
            <li key={p.code} className="rounded-xl border border-slate-100 p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-brand-navy">
                    {p.id}
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.code}</p>
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <p className="text-xs text-slate-500">{p.etapa} · {p.turma}</p>
              <button
                onClick={() => abrirFicha(p)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-action"
              >
                Ver ficha
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <FooterStats items={CADASTROS_FOOTER_STATS} />

      {novoCadastroAberto && (
        <NovoCadastroModal
          onClose={() => setNovoCadastroAberto(false)}
          onSaveAluno={(dados) => { addAluno(dados); setTab('alunos'); }}
          onSaveProfessor={(dados) => { addProfessor(dados); setTab('professores'); }}
        />
      )}

      {fichaAberta && (
        <ViewFichaModal
          tipo={fichaAberta.tipo}
          registro={fichaAberta.registro}
          onClose={() => setFichaAberta(null)}
        />
      )}
    </>
  );
}
