import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, GraduationCap, BookMarked, ChevronRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge.jsx';
import { getTurma, getCurso, getAlunosDaTurma, getAvaliacoesDaTurma } from '../data/schoolData.js';

export default function TurmaDetail() {
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const turma = getTurma(turmaId);

  if (!turma) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-surface-card p-8 text-center">
        <p className="text-sm text-slate-500">Turma não encontrada.</p>
        <Link to="/turmas" className="mt-3 inline-block text-sm font-semibold text-brand-action">
          Voltar para Turmas
        </Link>
      </div>
    );
  }

  const curso = getCurso(turma.cursoId);
  const alunos = getAlunosDaTurma(turmaId);
  const avaliacoes = getAvaliacoesDaTurma(turmaId);

  return (
    <>
      {/* Trilha hierárquica: Escola → Curso → Ano/Etapa → Turma */}
      <button
        onClick={() => navigate('/turmas')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-action"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Turmas
      </button>

      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        <span>Escola Estadual</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>Ensino Médio</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>{turma.ano}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span>{curso?.nome}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-brand-navy">{turma.nome}</span>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl">
            Turma {turma.nome}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {turma.ano} · {curso?.nome} · {alunos.length} alunos matriculados
          </p>
        </div>
        <StatusBadge status={turma.status} />
      </div>

      {/* Cartões de resumo */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <Users className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wide">Professor(es) responsável(is)</span>
          </div>
          <ul className="space-y-1 text-sm text-slate-700">
            {turma.professores.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <BookMarked className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wide">Disciplinas da turma</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {turma.disciplinas.map((d) => (
              <span key={d} className="rounded-full bg-brand-action/10 px-2.5 py-1 text-xs font-medium text-brand-action">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 text-slate-400">
            <GraduationCap className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wide">Avaliações registradas</span>
          </div>
          <p className="font-display text-2xl font-semibold text-brand-navy">{avaliacoes.length}</p>
          <Link
            to={`/notas?turma=${turma.id}`}
            className="mt-1 inline-block text-xs font-semibold text-brand-action hover:underline"
          >
            Ver notas da turma →
          </Link>
        </div>
      </div>

      {/* Lista de alunos */}
      <section className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card sm:p-6">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Alunos matriculados</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">Lista de alunos</h2>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4">Aluno</th>
                <th className="pb-3 pr-4">Responsável</th>
                <th className="pb-3 pr-4">Nascimento</th>
                <th className="pb-3 pr-4">Matrícula</th>
                <th className="pb-3 pr-4">Situação</th>
                <th className="pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((a) => (
                <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-brand-navy">
                        {a.id.replace(/[0-9]/g, '').slice(0, 2)}
                      </span>
                      <p className="font-medium text-slate-800">{a.nome}</p>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500">{a.responsavel}</td>
                  <td className="py-3.5 pr-4 text-slate-500">{a.dataNascimento}</td>
                  <td className="py-3.5 pr-4 text-slate-500">{a.matriculaId}</td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={a.situacao} />
                  </td>
                  <td className="py-3.5">
                    <Link
                      to={`/notas?turma=${turma.id}`}
                      className="text-sm font-semibold text-brand-action hover:underline"
                    >
                      Ver notas
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 md:hidden">
          {alunos.map((a) => (
            <li key={a.id} className="rounded-xl border border-slate-100 p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="font-medium text-slate-800">{a.nome}</p>
                <StatusBadge status={a.situacao} />
              </div>
              <p className="text-xs text-slate-500">Responsável: {a.responsavel}</p>
              <p className="text-xs text-slate-500">Nascimento: {a.dataNascimento} · Matrícula {a.matriculaId}</p>
              <Link to={`/notas?turma=${turma.id}`} className="mt-2 inline-block text-sm font-semibold text-brand-action">
                Ver notas
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
