import React, { useEffect, useState } from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import { listarAlunos, listarNotas, listarProfessores, listarTurmas } from '../../services/schoolApi';

export default function Home({ onNavigate }) {
  const [resumo, setResumo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([listarAlunos(), listarTurmas(), listarProfessores(), listarNotas()])
      .then(([alunos, turmas, professores, notas]) => {
        if (active) setResumo({ alunos: alunos.length, turmas: turmas.length, professores: professores.length, notas: notas.length });
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar o resumo do backend.');
      });
    return () => { active = false; };
  }, []);

  const stats = [
    { icon: GraduationCap, label: 'Alunos', value: resumo?.alunos },
    { icon: Users, label: 'Turmas', value: resumo?.turmas },
    { icon: Users, label: 'Professores', value: resumo?.professores },
    { icon: BookOpen, label: 'Notas cadastradas', value: resumo?.notas },
  ];

  return (
    <>
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-brand-900 p-6 text-white sm:mb-8 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
          style={{
            backgroundImage:
              'linear-gradient(115deg, transparent 0 56%, #fc4c02 65%, #ef2cc1 80%, #bdbbff 100%)',
          }}
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-mint">Painel de gestão · {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date())}</span>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-3xl">Resumo da escola</h1>
            <p className="mt-4 text-sm text-white/80 sm:text-base">Contagens atualizadas a partir dos registros disponíveis no backend.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('cadastros')}
                className="inline-flex items-center gap-2 rounded-lg bg-accent-mint px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-white"
              >
                <Users className="h-4 w-4" />
                Ver cadastros
              </button>
              <button
                onClick={() => onNavigate('turmas')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <GraduationCap className="h-4 w-4" />
                Ver turmas
              </button>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-periwinkle">Ambiente</p>
            <p className="font-display text-3xl font-bold">Produção</p>
            <p className="text-xs text-white/70">Dados fornecidos pela API</p>
          </div>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Leitura rápida</p>
        <h2 className="mt-1 font-display text-xl font-semibold text-slate-900">Registros atuais</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-mint text-brand-900">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <span className="font-display text-3xl font-bold text-slate-900">{value ?? '—'}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-slate-900">Eventos</h2>
          <EmptyState message="A API ainda não fornece eventos escolares." />
        </section>
        <section className="rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-slate-900">Notícias</h2>
          <EmptyState message="A API ainda não fornece notícias ou comunicados." />
        </section>
      </div>
    </>
  );
}