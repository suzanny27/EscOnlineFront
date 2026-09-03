import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PLANEJAMENTO_ROWS } from '../data/pages.js';

const PlanejamentoContext = createContext(null);

let nextId = 1;

export function PlanejamentoProvider({ children }) {
  const [itens, setItens] = useState(PLANEJAMENTO_ROWS);

  // Adiciona um novo item de planejamento ao topo da lista, visível
  // imediatamente na tela de Planejamento.
  const addItem = useCallback((item) => {
    setItens((prev) => [
      { ...item, subtitle: `Criado agora · item #${nextId++}` },
      ...prev,
    ]);
  }, []);

  const value = useMemo(() => ({ itens, addItem }), [itens, addItem]);

  return <PlanejamentoContext.Provider value={value}>{children}</PlanejamentoContext.Provider>;
}

export function usePlanejamento() {
  const ctx = useContext(PlanejamentoContext);
  if (!ctx) throw new Error('usePlanejamento deve ser usado dentro de <PlanejamentoProvider>');
  return ctx;
}
