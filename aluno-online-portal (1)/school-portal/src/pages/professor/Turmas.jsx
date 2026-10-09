import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import { listarAlunos, listarVinculosProfessor } from '../../services/schoolApi';

export default function Turmas({ matricula }) {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([listarVinculosProfessor(), listarAlunos()])
      .then(([vinculos, alunosApi]) => {
        if (!active) return;
        const porTurma = new Map();
        vinculos
          .filter((vinculo) => String(vinculo.professor?.idProfessor) === String(matricula))
          .forEach((vinculo) => {
            const turma = vinculo.turma;
            if (!turma) return;
            const atual = porTurma.get(turma.idTurma) ?? { ...turma, disciplinas: new Set() };
            if (vinculo.disciplina?.nome) atual.disciplinas.add(vinculo.disciplina.nome);
            porTurma.set(turma.idTurma, atual);
          });
        setTurmas([...porTurma.values()].map((turma) => ({
          ...turma,
          disciplinas: [...turma.disciplinas],
          totalAlunos: alunosApi.filter((aluno) => aluno.turma?.idTurma === turma.idTurma).length,
        })));
        setAlunos(alunosApi);
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar as turmas do professor.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [matricula]);

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-rose-700">{error}</p>}
      {!matricula && <EmptyState message="Informe o ID do professor para consultar seus vínculos." />}
      {loading && <p className="text-sm text-slate-500">Carregando vínculos...</p>}
      {!loading && matricula && turmas.length === 0 && <EmptyState message="Nenhuma turma vinculada a este professor no backend." />}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {turmas.map((turma) => {
          const alunosDaTurma = alunos.filter((aluno) => aluno.turma?.idTurma === turma.idTurma);
          return (
            <article key={turma.idTurma} className="overflow-hidden rounded-xl2 border border-slate-200 bg-white shadow-card">
              <header className="border-b border-slate-100 px-5 py-4">
                <h3 className="text-sm font-bold text-slate-800">{turma.anoSerie} · {turma.nome}</h3>
                <p className="mt-1 text-xs text-slate-500">{turma.disciplinas.join(', ') || 'Sem disciplinas vinculadas'}</p>
              </header>
              <div className="p-5">
                <p className="flex items-center gap-2 text-sm text-slate-600"><Users size={16} />{alunosDaTurma.length} alunos</p>
                {alunosDaTurma.length > 0 && (
                  <ul className="mt-3 divide-y divide-slate-100 text-sm">
                    {alunosDaTurma.map((aluno) => <li key={aluno.matricula} className="py-2 text-slate-700">{aluno.nome}</li>)}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}