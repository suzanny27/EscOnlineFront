import React, { useEffect, useState } from 'react';
import { buscarBoletim } from '../services/Faltasservice';

export default function Boletim({ matricula }) {
  const [boletim, setBoletim] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        if (!matricula || !Number.isInteger(Number(matricula))) {
          setErro('Informe uma matrícula válida para consultar o boletim.');
          return;
        }
        const dados = await buscarBoletim(Number(matricula));
        setBoletim(dados);
      } catch (e) {
        setErro(e.response?.data?.message || 'Não foi possível conectar ao servidor do boletim.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [matricula]);

  if (carregando) {
    return <p className="text-sm text-slate-400">Carregando boletim...</p>;
  }

  if (erro || !boletim) {
    return (
      <div className="bg-white rounded-xl2 shadow-card p-6 text-center text-sm text-slate-400">
        {erro || 'Boletim indisponível.'}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl2 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="font-bold text-slate-800">{boletim.nome}</p>
        <p className="text-xs text-slate-400">{boletim.turma}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-400">
              <th className="px-5 py-3 font-semibold">Disciplina</th>
              <th className="px-4 py-3 font-semibold text-center">Notas</th>
              <th className="px-4 py-3 font-semibold text-center">Média</th>
            </tr>
          </thead>
          <tbody>
            {boletim.disciplinas.map((d) => (
              <tr key={d.disciplina} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-700">{d.disciplina}</td>
                <td className="px-4 py-3 text-center text-slate-500">
                  {d.notas.join(' · ')}
                </td>
                <td className="px-4 py-3 text-center font-bold text-brand-600">{d.media}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 text-right text-sm">
        <span className="text-slate-400">Média geral: </span>
        <span className="font-bold text-slate-800">{boletim.mediaGeral}</span>
      </div>
    </div>
  );
}
