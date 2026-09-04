import { useState } from "react";
import { Card } from "../components/Card";
import { DetalhesModal } from "./DetalhesModal";

export function PageAutorizacoes({ child }) {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(child.autorizacoes.map((a,i)=>[i, a.status]))
  );
  const [detalheIdx, setDetalheIdx] = useState(null);
  const respond = (i, val) => setStatuses(prev=>({...prev,[i]:val}));
  const labels = {pendente:"Pendente",autorizada:"Autorizada",recusada:"Recusada"};

  return (
    <>
      <h2 className="page-title">Autorizações</h2>
      <Card head={`AUTORIZAÇÕES — ${child.name.toUpperCase()}`}>
        {child.autorizacoes.map((a,i)=>(
          <div key={i} className="auth-item">
            <div className="auth-top">
              <b>{a.titulo}</b>
              <span className={`auth-status ${statuses[i]}`}>{labels[statuses[i]]}</span>
            </div>
            <div className="desc">{a.desc}</div>
            <div className="auth-meta-row">{a.meta.map(m=><span key={m}>{m}</span>)}</div>
            <div className="auth-actions">
              <button className="btn-outline" onClick={()=>setDetalheIdx(i)}>Ver detalhes</button>
              {statuses[i]==="pendente"
                ? <>
                    <button className="btn-approve" onClick={()=>respond(i,"autorizada")}>Autorizar</button>
                    <button className="btn-decline" onClick={()=>respond(i,"recusada")}>Recusar</button>
                  </>
                : <button className="link-btn" onClick={()=>respond(i,"pendente")}>↺ Voltar atrás / alterar decisão</button>
              }
            </div>
          </div>
        ))}
      </Card>

      <DetalhesModal
        autorizacao={detalheIdx!==null ? child.autorizacoes[detalheIdx] : null}
        statusAtual={detalheIdx!==null ? statuses[detalheIdx] : null}
        labels={labels}
        onClose={()=>setDetalheIdx(null)}
        onAutorizar={()=>respond(detalheIdx,"autorizada")}
        onRecusar={()=>respond(detalheIdx,"recusada")}
        onVoltarAtras={()=>respond(detalheIdx,"pendente")}
      />
    </>
  );
}

