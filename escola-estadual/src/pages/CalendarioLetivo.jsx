import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import FooterStats from '../components/FooterStats.jsx';
import NewEventModal from '../components/NewEventModal.jsx';
import { useEvents } from '../context/EventsContext.jsx';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';

const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const TODAY_ISO = '2026-08-28';

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, inMonth: true, iso });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - startWeekday - daysInMonth + 1, inMonth: false });
  }
  return cells;
}

export default function CalendarioLetivo() {
  const { eventos, addEvento } = useEvents();
  const [cursor, setCursor] = useState({ year: 2026, month: 7 }); // Agosto de 2026
  const [modalDate, setModalDate] = useState(null); // { iso, label } | null
  const cells = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor]);

  const eventosPorDia = useMemo(() => {
    const map = {};
    eventos.forEach((e) => {
      map[e.data] = map[e.data] ? [...map[e.data], e] : [e];
    });
    return map;
  }, [eventos]);

  // "Marcos do mês": eventos do mês corrente exibido no calendário, em ordem cronológica.
  const marcosDoMes = useMemo(() => {
    const prefix = `${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}`;
    return eventos
      .filter((e) => e.data.startsWith(prefix))
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, cursor]);

  const goTo = (delta) => {
    setCursor((c) => {
      const date = new Date(c.year, c.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  };

  const openModalForDay = (cell) => {
    if (!cell.inMonth) return;
    const label = `${cell.day} de ${MONTH_NAMES[cursor.month].toLowerCase()}`;
    setModalDate({ iso: cell.iso, label });
  };

  return (
    <>
      <PageHeader
        eyebrow="Gestão acadêmica / Calendário"
        title="Calendário letivo"
        description="Acompanhe o ritmo do ano, feriados e marcos pedagógicos. Clique em um dia para adicionar um evento."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-surface-card p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Calendário letivo</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">
                {MONTH_NAMES[cursor.month]} de {cursor.year}
              </h2>
            </div>
            <div className="flex gap-1">
              <button onClick={() => goTo(-1)} className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-surface-muted" aria-label="Mês anterior">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => goTo(1)} className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-surface-muted" aria-label="Próximo mês">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mb-3 text-xs text-slate-400">Clique em um dia para adicionar um evento.</p>

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-[11px] font-semibold text-slate-400">{w}</span>
            ))}
            {cells.map((cell, i) => {
              const isToday = cell.inMonth && cell.iso === TODAY_ISO;
              const dayEvents = cell.inMonth ? eventosPorDia[cell.iso] ?? [] : [];
              return (
                <div key={i} className="flex justify-center py-1">
                  <button
                    onClick={() => openModalForDay(cell)}
                    disabled={!cell.inMonth}
                    title={dayEvents.map((e) => e.titulo).join(', ')}
                    className={`flex h-9 w-9 flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                      isToday
                        ? 'bg-rose-100 font-semibold text-rose-600'
                        : cell.inMonth
                        ? 'text-slate-700 hover:bg-brand-action/10'
                        : 'cursor-default text-slate-300'
                    }`}
                  >
                    {cell.day}
                    {dayEvents.length > 0 && <span className="mt-0.5 h-1 w-1 rounded-full bg-brand-action" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-brand-mid/10 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">Marcos do mês</p>
          <h2 className="mt-1 font-display text-xl font-semibold text-brand-navy">O que vem por aí</h2>

          {marcosDoMes.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Nenhum evento cadastrado neste mês ainda.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {marcosDoMes.map((m) => (
                <li key={m.id} className="rounded-xl bg-white p-4 shadow-card">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-action" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{m.titulo}</p>
                      <p className="text-xs text-slate-400">
                        {Number(m.data.slice(-2))} de {MONTH_NAMES[Number(m.data.slice(5, 7)) - 1].toLowerCase()}
                        {m.horario ? ` · ${m.horario}` : ''}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <FooterStats items={DEFAULT_FOOTER_STATS} />

      {modalDate && (
        <NewEventModal
          dateIso={modalDate.iso}
          dateLabel={modalDate.label}
          onClose={() => setModalDate(null)}
          onSave={(evento) => addEvento(evento)}
        />
      )}
    </>
  );
}
