import { useState } from 'react';
import { X } from 'lucide-react';
import { TIPOS_EVENTO } from '../data/schoolData.js';

const HORARIO_PADRAO = '07:00';

export default function NewEventModal({ dateIso, dateLabel, onClose, onSave }) {
  const [form, setForm] = useState({
    titulo: '',
    tipo: TIPOS_EVENTO[0],
    horario: HORARIO_PADRAO,
    local: '',
    publico: '',
    descricao: '',
  });

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
  const canSave = form.titulo.trim().length > 0;

  const handleSave = () => {
    onSave({
      titulo: form.titulo,
      tipo: form.tipo,
      data: dateIso,
      horario: form.horario || HORARIO_PADRAO,
      local: form.local || 'A definir',
      publico: form.publico || 'Toda a comunidade escolar',
      responsavel: 'Equipe gestora',
      descricao: form.descricao,
      status: 'Planejado',
      participantes: null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Novo evento · {dateLabel}</p>
            <h2 className="font-display text-lg font-semibold text-brand-navy">Adicionar evento</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-500">Título</span>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => update({ titulo: e.target.value })}
              placeholder="Ex.: Palestra sobre Consciência Negra"
              className="input"
              autoFocus
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-500">Tipo de evento</span>
            <select value={form.tipo} onChange={(e) => update({ tipo: e.target.value })} className="input">
              {TIPOS_EVENTO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">Horário</span>
              <input
                type="time"
                value={form.horario}
                onChange={(e) => update({ horario: e.target.value })}
                step="300"
                className="input"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">Local</span>
              <input
                type="text"
                value={form.local}
                onChange={(e) => update({ local: e.target.value })}
                placeholder="Auditório"
                className="input"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-500">Público / turmas envolvidas</span>
            <input
              type="text"
              value={form.publico}
              onChange={(e) => update({ publico: e.target.value })}
              placeholder="Ex.: Ensino Médio"
              className="input"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-500">Descrição</span>
            <textarea
              value={form.descricao}
              onChange={(e) => update({ descricao: e.target.value })}
              rows={3}
              placeholder="Detalhes do evento..."
              className="input resize-none"
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-surface-muted">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Adicionar ao calendário
          </button>
        </div>
      </div>
    </div>
  );
}
