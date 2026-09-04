import { useState } from "react";
import { Card } from "../components/Card";
import { COMUNICADOS } from "../domain/schoolData";

export function PageComunicados() {
  const [lidos, setLidos] = useState({});
  const marcar = (i) => setLidos(prev=>({...prev,[i]:true}));
  return (
    <>
      <h2 className="page-title">Comunicados</h2>
      <Card head="COMUNICADOS DA SECRETARIA DA EDUCAÇÃO">
        {COMUNICADOS.map((c,i)=>(
          <div key={i} className="comm-item">
            <div className="comm-ic">{c.ic}</div>
            <div className="comm-body">
              <div className="comm-top">
                <b>{c.titulo}</b>
                {c.isNew && !lidos[i] && <span className="new-badge">Novo</span>}
              </div>
              <div className="comm-meta">{c.meta}</div>
              <div className="comm-summary">{c.resumo}</div>
              <div className="comm-actions">
                <button className="btn-read" disabled={lidos[i]} onClick={()=>marcar(i)}>
                  {lidos[i]?"Lido ✓":"Ler comunicado"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

