import { useState } from 'react';
import {
  Pencil, Building2, MapPin, Users, GraduationCap, Clock, Phone,
  Mail, Globe, Image as ImageIcon,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { ESCOLA_INFO, CURSOS } from '../data/schoolData.js';

export default function InformacoesEscola() {
  const [editando, setEditando] = useState(false);
  const { dadosInstitucionais: d, endereco: e, equipeGestora, academico: a, horarioFuncionamento: h, contatos: c, identidade: id } = ESCOLA_INFO;

  return (
    <>
      <PageHeader
        eyebrow="Institucional / Cadastro da escola"
        title="Informações da escola"
        description="Dados institucionais, endereço, equipe gestora e informações acadêmicas."
        actionLabel={editando ? 'Salvar alterações' : 'Editar informações'}
        actionIcon={Pencil}
        onAction={() => setEditando((v) => !v)}
      />

      {editando && (
        <div className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Modo de edição habilitado neste protótipo apenas para demonstração — os campos abaixo ainda não são editáveis de fato.
        </div>
      )}

      {/* Identidade da escola */}
      <section className="mb-5 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-white">
          <ImageIcon className="h-8 w-8 opacity-70" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Identidade</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-brand-navy">{id.nomeExibicao}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">{id.descricao}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Dados institucionais */}
        <InfoCard icon={Building2} eyebrow="Dados institucionais" title="Identificação da escola">
          <Field label="Nome completo" value={d.nomeCompleto} />
          <Field label="Nome abreviado" value={d.nomeAbreviado} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="CNPJ" value={d.cnpj} />
            <Field label="Código INEP" value={d.inep} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tipo de instituição" value={d.tipoInstituicao} />
            <Field label="Rede de ensino" value={d.redeEnsino} />
          </div>
          <Field label="Ano letivo atual" value={d.anoLetivoAtual} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="E-mail institucional" value={d.email} icon={Mail} />
            <Field label="Site" value={d.site} icon={Globe} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Telefone principal" value={d.telefonePrincipal} icon={Phone} />
            <Field label="Telefone secundário" value={d.telefoneSecundario} icon={Phone} />
          </div>
        </InfoCard>

        {/* Endereço */}
        <InfoCard icon={MapPin} eyebrow="Localização" title="Endereço">
          <div className="grid grid-cols-2 gap-4">
            <Field label="CEP" value={e.cep} />
            <Field label="Estado" value={e.estado} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Cidade" value={e.cidade} />
            <Field label="Bairro" value={e.bairro} />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <Field label="Rua / Avenida" value={e.rua} />
            <Field label="Número" value={e.numero} />
          </div>
          <Field label="Complemento" value={e.complemento} />
          <Field label="Referência" value={e.referencia} />
          <button className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-surface-muted">
            <MapPin className="h-3.5 w-3.5" />
            Abrir localização no mapa
          </button>
        </InfoCard>

        {/* Equipe gestora */}
        <InfoCard icon={Users} eyebrow="Governança" title="Equipe gestora" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {equipeGestora.map((p) => (
              <div key={p.cargo} className="rounded-xl border border-slate-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">{p.cargo}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{p.nome}</p>
                <p className="mt-2 text-xs text-slate-500">{p.email}</p>
                <p className="text-xs text-slate-500">{p.ramal}</p>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Informações acadêmicas */}
        <InfoCard icon={GraduationCap} eyebrow="Estrutura acadêmica" title="Informações acadêmicas">
          <Field label="Modalidade" value={a.modalidades.join(', ')} />
          <div>
            <p className="mb-1.5 text-xs font-semibold text-slate-500">Cursos técnicos oferecidos</p>
            <div className="flex flex-wrap gap-1.5">
              {CURSOS.map((c) => (
                <span key={c.id} className="rounded-full bg-brand-action/10 px-2.5 py-1 text-xs font-medium text-brand-action">
                  {c.nome}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            <MiniNumber label="Alunos" value={a.quantidadeAlunos} />
            <MiniNumber label="Professores" value={a.quantidadeProfessores} />
            <MiniNumber label="Turmas" value={a.quantidadeTurmas} />
          </div>
          <Field label="Turnos de funcionamento" value={a.turnos.join(' e ')} />
        </InfoCard>

        {/* Horário de funcionamento */}
        <InfoCard icon={Clock} eyebrow="Rotina escolar" title="Horário de funcionamento">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Turno da manhã" value={h.manha} />
            <Field label="Turno da tarde" value={h.tarde} />
          </div>
          <Field label="Turno da noite" value={h.noite ?? 'Não há turno noturno'} />
          <Field label="Dias de funcionamento" value={h.diasFuncionamento} />
          <Field label="Atendimento da secretaria" value={h.secretaria} />
        </InfoCard>

        {/* Contatos e comunicação */}
        <InfoCard icon={Phone} eyebrow="Comunicação" title="Contatos e comunicação" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="E-mail da secretaria" value={c.emailSecretaria} icon={Mail} />
            <Field label="Telefone da secretaria" value={c.telefoneSecretaria} icon={Phone} />
            <Field label="E-mail da direção" value={c.emailDirecao} icon={Mail} />
            <Field label="Canal oficial de comunicação" value={c.canalOficial} />
            <Field label="Redes sociais" value={c.redesSociais} icon={Globe} />
          </div>
        </InfoCard>
      </div>

      {/* Missão institucional */}
      <section className="mt-5 rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">Missão institucional</p>
        <p className="mt-2 max-w-3xl font-display text-lg font-medium leading-relaxed text-indigo-50 sm:text-xl">
          {id.missao}
        </p>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, eyebrow, title, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card ${className}`}>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-action/10 text-brand-action">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">{eyebrow}</p>
          <h2 className="font-display text-lg font-semibold text-brand-navy">{title}</h2>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, icon: Icon }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
      <p className="inline-flex items-center gap-1.5 text-sm text-slate-800">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
        {value || '—'}
      </p>
    </div>
  );
}

function MiniNumber({ label, value }) {
  return (
    <div className="rounded-xl bg-surface-muted p-3 text-center">
      <p className="font-display text-xl font-bold text-brand-navy">{value}</p>
      <p className="text-[11px] text-slate-500">{label}</p>
    </div>
  );
}
