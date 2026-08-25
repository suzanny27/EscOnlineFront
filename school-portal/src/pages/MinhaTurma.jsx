import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { classInfo, classmates } from '../data/mockData';

export default function MinhaTurma() {
  return (
    <div>
      <Breadcrumb items={['Início', 'Minha Turma']} />

      {/* Banner de informações da turma */}
      <div className="bg-brand-400 text-white rounded-xl2 px-5 py-4 mb-6 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <p><span className="font-bold">CREDE:</span> {classInfo.crede}</p>
        <p><span className="font-bold">ESCOLA:</span> {classInfo.school}</p>
        <p><span className="font-bold">TURMA:</span> {classInfo.className}</p>
        <div className="flex gap-6">
          <p><span className="font-bold">ANO:</span> {classInfo.year}</p>
          <p><span className="font-bold">LETIVO:</span> {classInfo.status}</p>
        </div>
      </div>

      {/* Grid de colegas de turma */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {classmates.map((name) => (
          <button
            key={name}
            className="bg-white rounded-xl2 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all p-4 flex flex-col items-center text-center gap-2"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-b from-sky-200 to-emerald-300" />
            <span className="text-xs font-semibold text-slate-700 uppercase">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
