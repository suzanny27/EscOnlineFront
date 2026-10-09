import React, { useEffect, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import { listarAlunos, listarNotas, listarVinculosProfessor } from '../../services/schoolApi';

export default function Diario({ matricula }) {
  const [linhas, setLinhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([listarAlunos(), listarNotas(), listarVinculosProfessor()])
      .then(([alunos, notas, vinculos]) => {
        if (!active) return;
        const turmasDoProfessor = new Set(vinculos
          .filter((vinculo) => String(vinculo.professor?.idProfessor) === String(matricula))
          .map((vinculo) => vinculo.turma?.idTurma)
          .filter(Boolean));
        const matriculasDosAlunos = new Set(alunos
          .filter((aluno) => turmasDoProfessor.has(aluno.turma?.idTurma))
          .map((aluno) => aluno.matricula));
        setLinhas(notas.filter((nota) => matriculasDosAlunos.has(nota.aluno?.matricula)));
      })
      .catch((cause) => {
        if (active) setError(cause.response?.data?.message || 'Não foi possível carregar o diário.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [matricula]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <NotebookPen size={20} className="text-brand-400" />
          Diário
        </h2>
      </div>

      <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400">
                <th className="px-5 py-3 font-semibold">Aluno</th>
                <th className="px-4 py-3 font-semibold text-center">Nota</th>
                <th className="px-4 py-3 font-semibold text-center">Bimestre</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((linha) => (
                <tr key={linha.idNota} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <span className="font-medium text-slate-700">{linha.aluno?.nome ?? `Matrícula ${linha.aluno?.matricula ?? '—'}`}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600">{linha.disciplina?.nome ?? '—'}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{linha.valor}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{linha.bimestre}º</td>
                </tr>
              ))}
              {!loading && linhas.length === 0 && <tr><td colSpan={4} className="py-8"><EmptyState message={error || 'Nenhuma nota disponível para as turmas deste professor.'} /></td></tr>}
              {loading && <tr><td colSpan={4} className="py-8 text-center text-sm text-slate-400">Carregando notas...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}