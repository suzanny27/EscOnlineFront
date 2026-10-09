import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { listarAlunos } from '../services/schoolApi';

export default function MinhaTurma({ matricula }) {
  const [aluno, setAluno] = useState(null);
  const [colegas, setColegas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    listarAlunos()
      .then((alunos) => {
        if (!active) return;
        const atual = alunos.find((item) => String(item.matricula) === String(matricula));
        setAluno(atual ?? null);
        setColegas(atual?.turma?.idTurma
          ? alunos.filter((item) => item.turma?.idTurma === atual.turma.idTurma && item.matricula !== atual.matricula)
          : []);
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar a turma.');
      });
    return () => { active = false; };
  }, [matricula]);

  return (
    <div>
      <Breadcrumb items={['Início', 'Minha Turma']} />

      {error ? <EmptyState message={error} /> : aluno?.turma ? (
        <div className="space-y-5">
          <div className="rounded-xl2 bg-white p-5 text-sm shadow-card">
            <p className="font-semibold text-slate-800">{aluno.turma.anoSerie} · {aluno.turma.nome}</p>
          </div>
          {colegas.length ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {colegas.map((colega) => <li key={colega.matricula} className="rounded-lg bg-white p-4 text-sm font-medium text-slate-700 shadow-card">{colega.nome}</li>)}
            </ul>
          ) : <EmptyState message="Nenhum outro aluno está vinculado a esta turma." />}
        </div>
      ) : <EmptyState message={aluno ? 'O backend não informou a turma deste aluno.' : 'Aluno não encontrado na lista do backend.'} />}
    </div>
  );
}
