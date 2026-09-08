import { useState } from 'react';
import { X, Check } from 'lucide-react';

const STATUS_OPTIONS = ['Em andamento', 'Agendado', 'Em revisão'];

const emptyForm = { title: '', context: '', owner: '', status: STATUS_OPTIONS[0] };

export default function AddPlanejamentoModal({ onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Informe um título para o item.';
    if (!form.context.trim()) next.context = 'Informe o período ou contexto (ex.: Setembro, 28 ago).';
    if (!form.owner.trim()) next.owner = 'Informe o responsável.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      title: form.title.trim(),
      context: form.context.trim(),
      owner: form.owner.trim(),
      status: form.status,
    });
    setSaved(true);
    setTimeout(onClose, 700);
  };

  const handleClear = () => {
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Planejamento</p>
            <h2 className="font-display text-lg font-semibold text-brand-navy">Adicionar item</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {saved ? (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-slate-800">Item adicionado ao Planejamento.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 px-6 py-5">
              <Field label="Título" error={errors.title} required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update({ title: e.target.value })}
                  placeholder="Ex.: Reforço de aprendizagem · Devs"
                  className={`input ${errors.title ? 'border-rose-300' : ''}`}
                  autoFocus
                />
              </Field>

              <Field label="Período / contexto" error={errors.context} required>
                <input
                  type="text"
                  value={form.context}
                  onChange={(e) => update({ context: e.target.value })}
                  placeholder="Ex.: Setembro, 28 ago"
                  className={`input ${errors.context ? 'border-rose-300' : ''}`}
                />
              </Field>

              <Field label="Responsável" error={errors.owner} required>
                <input
                  type="text"
                  value={form.owner}
                  onChange={(e) => update({ owner: e.target.value })}
                  placeholder="Ex.: Coordenação pedagógica"
                  className={`input ${errors.owner ? 'border-rose-300' : ''}`}
                />
              </Field>

              <Field label="Status">
                <select value={form.status} onChange={(e) => update({ status: e.target.value })} className="input">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <button onClick={handleClear} className="text-sm font-semibold text-slate-400 hover:text-slate-600">
                Limpar dados
              </button>
              <div className="flex gap-2">
                <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-surface-muted">
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  Salvar item
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
}
