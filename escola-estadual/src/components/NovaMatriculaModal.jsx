import { useState } from 'react';
import { X, UserPlus, Repeat, ArrowLeftRight, ChevronLeft, Check } from 'lucide-react';
import { CURSOS, ANOS, TURMAS } from '../data/schoolData.js';

const TIPOS = [
  {
    id: 'Nova',
    label: 'Novo aluno',
    desc: 'Primeira matrícula do aluno na rede estadual.',
    icon: UserPlus,
  },
  {
    id: 'Transferência',
    label: 'Transferência',
    desc: 'Aluno vindo de outra escola, com histórico anterior.',
    icon: ArrowLeftRight,
  },
  {
    id: 'Rematrícula',
    label: 'Rematrícula',
    desc: 'Aluno já matriculado, renovando para o próximo período.',
    icon: Repeat,
  },
];

const STEPS_BY_TYPE = {
  Nova: ['Tipo', 'Curso e turma', 'Dados do aluno', 'Documentos', 'Revisão'],
  Rematrícula: ['Tipo', 'Curso e turma', 'Dados do aluno', 'Documentos', 'Revisão'],
  Transferência: ['Tipo', 'Escola de origem', 'Curso e turma', 'Dados do aluno', 'Documentos', 'Revisão'],
};

const emptyForm = {
  tipo: null,
  cursoId: '',
  ano: '',
  turmaId: '',
  nomeAluno: '',
  responsavel: '',
  dataNascimento: '',
  escolaOrigem: '',
  historicoAnexado: false,
  documentosPendentes: [],
  finalizarComoStatus: 'Em análise',
};

const DOCUMENTOS_DISPONIVEIS = [
  'RG e CPF do aluno',
  'Comprovante de residência',
  'Histórico escolar',
  'Declaração de transferência',
  'Foto 3x4',
  'Carteira de vacinação',
];

export default function NovaMatriculaModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = form.tipo ? STEPS_BY_TYPE[form.tipo] : ['Tipo'];
  const stepName = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const toggleDocumento = (doc) => {
    setForm((f) => ({
      ...f,
      documentosPendentes: f.documentosPendentes.includes(doc)
        ? f.documentosPendentes.filter((d) => d !== doc)
        : [...f.documentosPendentes, doc],
    }));
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const canAdvance = () => {
    if (stepName === 'Tipo') return !!form.tipo;
    if (stepName === 'Escola de origem') return form.escolaOrigem.trim().length > 0;
    if (stepName === 'Curso e turma') return form.cursoId && form.ano && form.turmaId;
    if (stepName === 'Dados do aluno') return form.nomeAluno.trim().length > 0 && form.responsavel.trim().length > 0;
    return true;
  };

  const handleSubmit = (status) => {
    const turma = TURMAS.find((t) => t.id === form.turmaId);
    const curso = CURSOS.find((c) => c.id === form.cursoId);
    onSubmit({
      aluno: form.nomeAluno,
      alunoId: form.nomeAluno.slice(0, 2).toUpperCase(),
      tipo: form.tipo,
      cursoId: form.cursoId,
      ano: form.ano,
      turmaId: form.turmaId,
      status,
      documentosPendentes: form.documentosPendentes,
      escolaOrigem: form.tipo === 'Transferência' ? form.escolaOrigem : null,
      turmaNome: turma?.nome,
      cursoNome: curso?.nome,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Nova matrícula</p>
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              {stepName === 'Tipo' ? 'Selecione o tipo de matrícula' : stepName}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Indicador de progresso */}
        {form.tipo && (
          <div className="flex gap-1.5 px-6 pt-4">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${i <= stepIndex ? 'bg-brand-action' : 'bg-surface-muted'}`}
              />
            ))}
          </div>
        )}

        {/* Corpo */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {stepName === 'Tipo' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TIPOS.map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => update({ tipo: id })}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    form.tipo === id ? 'border-brand-action bg-brand-action/5' : 'border-slate-200 hover:bg-surface-muted'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-action/10 text-brand-action">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-800">{label}</p>
                  <p className="mt-1 text-xs text-slate-500">{desc}</p>
                </button>
              ))}
            </div>
          )}

          {stepName === 'Escola de origem' && (
            <div className="space-y-4">
              <Field label="Escola de origem">
                <input
                  type="text"
                  value={form.escolaOrigem}
                  onChange={(e) => update({ escolaOrigem: e.target.value })}
                  placeholder="Ex.: E.E. Prof. Carlos Drummond"
                  className="input"
                />
              </Field>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={form.historicoAnexado}
                  onChange={(e) => update({ historicoAnexado: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-brand-action focus:ring-brand-action"
                />
                Histórico escolar da escola de origem já foi importado/anexado
              </label>
            </div>
          )}

          {stepName === 'Curso e turma' && (
            <div className="space-y-4">
              <Field label="Ano de ensino">
                <select
                  value={form.ano}
                  onChange={(e) => update({ ano: e.target.value, turmaId: '' })}
                  className="input"
                >
                  <option value="">Selecione o ano</option>
                  {ANOS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </Field>
              <Field label="Curso técnico">
                <select
                  value={form.cursoId}
                  onChange={(e) => update({ cursoId: e.target.value, turmaId: '' })}
                  disabled={!form.ano}
                  className="input"
                >
                  <option value="">Selecione o curso</option>
                  {CURSOS.map((c) => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </Field>
              <Field label="Turma de destino">
                <select
                  value={form.turmaId}
                  onChange={(e) => update({ turmaId: e.target.value })}
                  disabled={!form.cursoId}
                  className="input"
                >
                  <option value="">Selecione a turma</option>
                  {TURMAS.filter((t) => t.cursoId === form.cursoId && t.ano === form.ano).map((t) => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {stepName === 'Dados do aluno' && (
            <div className="space-y-4">
              <Field label="Nome completo do aluno">
                <input
                  type="text"
                  value={form.nomeAluno}
                  onChange={(e) => update({ nomeAluno: e.target.value })}
                  placeholder="Ex.: Maria Eduarda Lopes"
                  className="input"
                />
              </Field>
              <Field label="Responsável">
                <input
                  type="text"
                  value={form.responsavel}
                  onChange={(e) => update({ responsavel: e.target.value })}
                  placeholder="Nome do responsável legal"
                  className="input"
                />
              </Field>
              <Field label="Data de nascimento">
                <input
                  type="text"
                  value={form.dataNascimento}
                  onChange={(e) => update({ dataNascimento: e.target.value })}
                  placeholder="DD/MM/AAAA"
                  className="input"
                />
              </Field>
            </div>
          )}

          {stepName === 'Documentos' && (
            <div>
              <p className="mb-3 text-sm text-slate-500">Marque os documentos que ainda estão pendentes:</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {DOCUMENTOS_DISPONIVEIS.map((doc) => (
                  <label key={doc} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.documentosPendentes.includes(doc)}
                      onChange={() => toggleDocumento(doc)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-action focus:ring-brand-action"
                    />
                    {doc}
                  </label>
                ))}
              </div>
            </div>
          )}

          {stepName === 'Revisão' && (
            <div className="space-y-3 text-sm">
              <SummaryRow label="Tipo de matrícula" value={form.tipo} />
              {form.tipo === 'Transferência' && <SummaryRow label="Escola de origem" value={form.escolaOrigem} />}
              <SummaryRow label="Ano / Curso" value={`${form.ano} · ${CURSOS.find((c) => c.id === form.cursoId)?.nome ?? ''}`} />
              <SummaryRow label="Turma de destino" value={TURMAS.find((t) => t.id === form.turmaId)?.nome} />
              <SummaryRow label="Aluno" value={form.nomeAluno} />
              <SummaryRow label="Responsável" value={form.responsavel} />
              <SummaryRow
                label="Documentos pendentes"
                value={form.documentosPendentes.length ? form.documentosPendentes.join(', ') : 'Nenhum'}
              />
            </div>
          )}
        </div>

        {/* Rodapé com navegação */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button
            onClick={stepIndex === 0 ? onClose : goBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
            {stepIndex === 0 ? 'Cancelar' : 'Voltar'}
          </button>

          {!isLast ? (
            <button
              onClick={goNext}
              disabled={!canAdvance()}
              className="rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleSubmit('Em análise')}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-surface-muted"
              >
                Deixar em análise
              </button>
              <button
                onClick={() => handleSubmit(form.documentosPendentes.length ? 'Pendente' : 'Concluída')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
              >
                <Check className="h-4 w-4" />
                Finalizar matrícula
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-muted px-3.5 py-2.5">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value || '—'}</span>
    </div>
  );
}
