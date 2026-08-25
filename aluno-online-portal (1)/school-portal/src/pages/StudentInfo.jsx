import React from 'react';
import { Pencil, FileText, Download, MapPin } from 'lucide-react';
import Card from '../components/Card';
import { student, school } from '../data/mockData';

export default function StudentInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-brand-900">Dados Pessoais</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Informações do Aluno */}
        <Card title="INFORMAÇÕES DO ALUNO">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-bold text-lg shrink-0">
              {student.avatarInitials}
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <p><span className="font-semibold text-slate-800">Matrícula:</span> {student.registration}</p>
              <p><span className="font-semibold text-slate-800">Nome:</span> {student.name}</p>
              <p><span className="font-semibold text-slate-800">Nascimento:</span> {student.birthDate}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-3 mb-4">
            Mantenha seu e-mail pessoal atualizado para recuperar sua conta institucional quando
            precisar. Atualize o e-mail pessoal abaixo clicando no ícone de editar.
          </div>

          <FieldRow label="E-mail pessoal" value={student.personalEmail} editable />
          <FieldRow label="E-mail institucional" value={student.institutionalEmail} />
          <FieldRow label="Turma" value={student.className} />
          <FieldRow label="Pai" value={student.father} />
          <FieldRow label="Mãe" value={student.mother} />
          <FieldRow label="Responsável" value={student.guardian} />

          <div className="flex items-center gap-2 mt-4 text-sm text-brand-700">
            <FileText size={16} />
            <span>Declaração de Matrícula</span>
          </div>
          <button className="flex items-center gap-2 mt-2 text-sm font-semibold text-brand-400 hover:text-brand-700 active:text-brand-900 transition-colors">
            <Download size={16} />
            Baixar declaração
          </button>
        </Card>

        {/* Informações da Escola */}
        <Card title="INFORMAÇÕES DA ESCOLA">
          <div className="text-sm text-slate-600 space-y-2 mb-4">
            <p><span className="font-semibold text-slate-800">INEP:</span> {school.inep}</p>
            <p><span className="font-semibold text-slate-800">Escola:</span> {school.name}</p>
            <p><span className="font-semibold text-slate-800">Endereço:</span> {school.address}</p>
            <div className="flex flex-wrap gap-x-6">
              <p><span className="font-semibold text-slate-800">CEP:</span> {school.cep}</p>
              <p><span className="font-semibold text-slate-800">Telefone:</span> {school.phone}</p>
            </div>
            <p><span className="font-semibold text-slate-800">E-mail:</span> {school.email}</p>
          </div>

          {/* Placeholder de mapa (estático, sem depender de API externa) */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,theme(colors.slate.200)_25%,transparent_25%,transparent_75%,theme(colors.slate.200)_75%),linear-gradient(45deg,theme(colors.slate.200)_25%,transparent_25%,transparent_75%,theme(colors.slate.200)_75%)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />
            <div className="relative flex flex-col items-center text-slate-400">
              <MapPin size={28} className="text-brand-400 mb-1" />
              <span className="text-xs">Mapa da localização da escola</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FieldRow({ label, value, editable = false }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-slate-700 font-medium">{value}</p>
      </div>
      {editable && (
        <button
          aria-label={`Editar ${label}`}
          className="p-1.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-brand-50 active:bg-brand-50 transition-colors"
        >
          <Pencil size={14} />
        </button>
      )}
    </div>
  );
}
