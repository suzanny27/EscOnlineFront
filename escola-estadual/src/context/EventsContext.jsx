import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { EVENTOS_INICIAIS } from '../data/schoolData.js';

const EventsContext = createContext(null);

let nextId = EVENTOS_INICIAIS.length + 1;

export function EventsProvider({ children }) {
  const [eventos, setEventos] = useState(EVENTOS_INICIAIS);

  // Adiciona um evento novo (ex.: criado a partir de um clique no calendário)
  // e o torna visível instantaneamente em Eventos, Marcos do mês e na Home.
  const addEvento = useCallback((evento) => {
    setEventos((prev) => [
      { ...evento, id: `EVT-${String(nextId++).padStart(2, '0')}` },
      ...prev,
    ]);
  }, []);

  const value = useMemo(() => ({ eventos, addEvento }), [eventos, addEvento]);

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents deve ser usado dentro de <EventsProvider>');
  return ctx;
}
