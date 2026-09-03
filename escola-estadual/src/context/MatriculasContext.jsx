import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MATRICULAS } from '../data/schoolData.js';

const MatriculasContext = createContext(null);

let nextId = 1053;

export function MatriculasProvider({ children }) {
  const [matriculas, setMatriculas] = useState(MATRICULAS);

  const addMatricula = useCallback((matricula) => {
    setMatriculas((prev) => [
      { ...matricula, id: `MAT-${nextId++}` },
      ...prev,
    ]);
  }, []);

  const value = useMemo(() => ({ matriculas, addMatricula }), [matriculas, addMatricula]);

  return <MatriculasContext.Provider value={value}>{children}</MatriculasContext.Provider>;
}

export function useMatriculas() {
  const ctx = useContext(MatriculasContext);
  if (!ctx) throw new Error('useMatriculas deve ser usado dentro de <MatriculasProvider>');
  return ctx;
}
