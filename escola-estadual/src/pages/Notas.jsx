import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, User, Trophy, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import FooterStats from '../components/FooterStats.jsx';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';
import {
  CURSOS,
  ANOS,
  TURMAS,
  getDisciplinasDoCurso,
  getAlunosDaTurma,
  getAvaliacoesDaTurma,
  getEstatisticasAvaliacao,
} from '../data/schoolData.js';

const BIMESTRES = ['1º bimestre', '2º bimestre', '3º bimestre', '4º bimestre'];

export default function Notas() {
  const [searchParams] = useSearchParams();
  const turmaPreselecionada = searchParams.get('turma');
  const preTurma = TURMAS.find((t) => t.id === turmaPreselecionada);

  const [ano, setAno] = useState(preTurma?.ano ?? ANOS[0]);
  const [cursoId, setCursoId] = useState(preTurma?.cursoId ?? CURSOS[0].id);
  const [turmaId, setTurmaId] = useState(preTurma?.id ?? `1-${CURSOS[0].id}`);
  const [disciplina, setDisciplina] = useState('');
  const [bimestre, setBimestre] = useState('2º bimestre');
  const [view, setView] = useState('turma'); // 'turma' | 'aluno'
  const [avaliacaoSelecionadaId, setAvaliacaoSelecionadaId] = useState(null);

  const turmasDoFiltro = TURMAS.filter((t) => t.ano === ano && t.cursoId === cursoId);
  const turmaAtual = TURMAS.find((t) => t.id === turmaId) ?? turmasDoFiltro[0];
  const alunos = getAlunosDaTurma(turmaAtual?.id);
  const disciplinasDaTurma = turmaAtual ? getDisciplinasDoCurso(turmaAtual.cursoId) : [];

  const avaliacoes = useMemo(() => {
    return getAvaliacoesDaTurma(turmaAtual?.id).filter(
      (a) => a.bimestre === bimestre && (!disciplina || a.disciplina === disciplina)
    );
  }, [turmaAtual, bimestre, disciplina]);

  const avaliacaoSelecionada = avaliacoes.find((a) => a.id === avaliacaoSelecionadaId) ?? avaliacoes[0] ?? null;
  const stats = avaliacaoSelecionada ? getEstatisticasAvaliacao(avaliacaoSelecionada) : null;

  return (
    <>
      <PageHeader
        eyebrow="Ensino Médio / Avaliação"
        title="Notas"
        description="Explore o desempenho por ano, curso, turma, disciplina e avaliação."
      />

      {/* Seletores hierárquicos: Ano → Curso → Turma → Disciplina → Bimestre */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Select
          label="Ano"
          value={ano}
          onChange={(v) => {
            setAno(v);
            const t = TURMAS.find((tu) => tu.ano === v && tu.cursoId === cursoId);
            setTurmaId(t?.id ?? '');
            setAvaliacaoSelecionadaId(null);
          }}
        >
          {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
        </Select>
        <Select
          label="Curso"
          value={cursoId}
          onChange={(v) => {
            setCursoId(v);
            const t = TURMAS.find((tu) => tu.ano === ano && tu.cursoId === v);
            setTurmaId(t?.id ?? '');
            setDisciplina('');
            setAvaliacaoSelecionadaId(null);
          }}
        >
          {CURSOS.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </Select>
        <Select
          label="Turma"
          value={turmaId}
          onChange={(v) => { setTurmaId(v); setAvaliacaoSelecionadaId(null); }}
        >
          {turmasDoFiltro.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
        </Select>
        <Select label="Disciplina" value={disciplina} onChange={setDisciplina}>
          <option value="">Todas</option>
          {disciplinasDaTurma.map((d) => <option key={d} value={d}>{d}</option>)}
        </Select>
        <Select label="Bimestre" value={bimestre} onChange={setBimestre}>
          {BIMESTRES.map((b) => <option key={b} value={b}>{b}</option>)}
        </Select>
      </div>

      <div className="mb-4 text-sm text-slate-400">
        Caminho selecionado:{' '}
        <span className="font-medium text-brand-navy">
          {ano} → {CURSOS.find((c) => c.id === cursoId)?.nome} → {turmaAtual?.nome}
          {disciplina ? ` → ${disciplina}` : ''} → {bimestre}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.3fr]">
        {/* Lista de avaliações do filtro */}
        <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Avaliações do período</p>
          <h2 className="mt-1 mb-4 font-display text-xl font-semibold text-brand-navy">{avaliacoes.length} encontrada(s)</h2>

          {avaliacoes.length === 0 && (
            <p className="rounded-lg bg-surface-muted p-4 text-sm text-slate-500">
              Nenhuma avaliação lançada para esse filtro ainda.
            </p>
          )}

          <ul className="space-y-2">
            {avaliacoes.map((a) => {
              const s = getEstatisticasAvaliacao(a);
              const active = avaliacaoSelecionada?.id === a.id;
              return (
                <li key={a.id}>
                  <button
                    onClick={() => setAvaliacaoSelecionadaId(a.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      active ? 'border-brand-action bg-brand-action/5' : 'border-slate-200 hover:bg-surface-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">{a.titulo}</p>
                      <span className="font-display text-lg font-bold text-brand-navy">{s.media}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{a.disciplina} · {a.data}</p>
                    {s.todosMesmaNota && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        <Sparkles className="h-3 w-3" />
                        100% da turma tirou {s.notaComum}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Indicadores da avaliação selecionada */}
        <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
          {!avaliacaoSelecionada ? (
            <p className="text-sm text-slate-400">Selecione uma avaliação para ver os indicadores.</p>
          ) : (
            <>
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">{avaliacaoSelecionada.disciplina}</p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">{avaliacaoSelecionada.titulo}</h2>
                </div>
                <div className="inline-flex rounded-lg bg-surface-muted p-1">
                  <button
                    onClick={() => setView('turma')}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold ${
                      view === 'turma' ? 'bg-white text-brand-navy shadow-card' : 'text-slate-500'
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    Turma
                  </button>
                  <button
                    onClick={() => setView('aluno')}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold ${
                      view === 'aluno' ? 'bg-white text-brand-navy shadow-card' : 'text-slate-500'
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    Aluno
                  </button>
                </div>
              </div>

              {/* Destaque especial quando 100% tira a mesma nota */}
              {stats.todosMesmaNota && (
                <div className="mb-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
                  <Sparkles className="h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">
                    100% dos alunos desta turma tiraram nota {stats.notaComum} nesta avaliação.
                  </p>
                </div>
              )}

              {view === 'turma' ? (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <MiniStat label="Média da turma" value={stats.media} />
                    <MiniStat label="Maior nota" value={stats.maior} icon={TrendingUp} tone="emerald" />
                    <MiniStat label="Menor nota" value={stats.menor} icon={TrendingDown} tone="rose" />
                    <MiniStat label="Alunos avaliados" value={stats.total} icon={Trophy} />
                  </div>

                  <div className="mt-6">
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-slate-600">Acima de 7</span>
                      <span className="font-semibold text-emerald-600">{stats.percentualAcima}%</span>
                    </div>
                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-muted">
                      <div className="h-full bg-emerald-500" style={{ width: `${stats.percentualAcima}%` }} />
                      <div className="h-full bg-amber-400" style={{ width: `${stats.percentualAbaixo}%` }} />
                    </div>
                    <div className="mt-1.5 flex justify-between text-xs text-slate-400">
                      <span>{stats.percentualAcima}% acima de 7</span>
                      <span>{stats.percentualAbaixo}% abaixo de 7</span>
                    </div>
                  </div>
                </>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {alunos.map((aluno) => {
                    const nota = avaliacaoSelecionada.notas[aluno.id];
                    return (
                      <li key={aluno.id} className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-slate-700">{aluno.nome}</span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            nota === undefined
                              ? 'bg-slate-100 text-slate-400'
                              : nota >= 7
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {nota !== undefined ? nota.toLocaleString('pt-BR', { minimumFractionDigits: nota % 1 ? 1 : 0 }) : 'Sem lançamento'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </section>
      </div>

      <FooterStats items={DEFAULT_FOOTER_STATS} />
    </>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
        {children}
      </select>
    </label>
  );
}

function MiniStat({ label, value, icon: Icon, tone }) {
  const toneClass = tone === 'emerald' ? 'text-emerald-600' : tone === 'rose' ? 'text-rose-500' : 'text-brand-navy';
  return (
    <div className="rounded-xl bg-surface-muted p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        {Icon && <Icon className={`h-3.5 w-3.5 ${toneClass}`} />}
      </div>
      <p className={`mt-1.5 font-display text-2xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}
