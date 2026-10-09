import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { listarAlunos } from '../services/schoolApi';

export default function StudentInfo({ matricula }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    if (!matricula || !Number.isInteger(Number(matricula))) {
      setStudent(null);
      setLoading(false);
      setError('Informe uma matrícula válida.');
      return undefined;
    }

    setLoading(true);
    listarAlunos()
      .then((alunos) => {
        if (!active) return;
        const aluno = alunos.find((item) => String(item.matricula) === String(matricula));
        setStudent(aluno ?? null);
        setError(aluno ? '' : 'Aluno não encontrado na lista retornada pelo backend.');
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar os dados do aluno.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [matricula]);

  if (loading) return <p className="text-sm text-slate-500">Carregando dados do aluno...</p>;

  if (!student) return <EmptyState message={error || 'Nenhum dado do aluno disponível.'} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold text-slate-900">Dados Pessoais</h2>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Perfil do aluno
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="INFORMAÇÕES DO ALUNO">
          <div className="mb-5 flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
              {student.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-800">Matrícula:</span> {student.matricula}</p>
              <p><span className="font-semibold text-slate-800">Nome:</span> {student.nome}</p>
              <p><span className="font-semibold text-slate-800">Nascimento:</span> {student.dataNascimento || '—'}</p>
            </div>
          </div>

          <FieldRow label="E-mail" value={student.email} />
          <FieldRow label="Turma" value={student.turma ? `${student.turma.anoSerie} · ${student.turma.nome}` : ''} />
        </Card>

        <Card title="INFORMAÇÕES DA ESCOLA">
          <EmptyState message="A API ainda não fornece informações da escola." />
        </Card>
      </div>
    </div>
  );
}

function FieldRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-slate-700 font-medium">{value}</p>
      </div>
    </div>
  );
}
