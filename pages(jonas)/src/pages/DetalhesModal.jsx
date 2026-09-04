const DETALHE_LABELS = {
  local:"📍 Local", data:"📅 Data", saida:"🚌 Saída", retorno:"🏁 Retorno",
  transporte:"🚌 Transporte", responsaveis:"👩‍🏫 Responsáveis", custo:"💰 Custo",
  levar:"🎒 O que levar", contatoEmergencia:"📞 Contato de emergência", observacoes:"📝 Observações",
  finalidade:"🎯 Finalidade", validade:"🗓️ Validade", canais:"📢 Canais de divulgação", revogacao:"↩️ Revogação",
  horarioSaida:"🕒 Horário de saída", motivo:"📝 Motivo", retiradoPor:"🙋 Retirado por", motivoRecusa:"⚠️ Motivo da recusa",
  horario:"🕒 Horário", traje:"👕 Traje",
};

export function DetalhesModal({ autorizacao, statusAtual, labels, onClose, onAutorizar, onRecusar, onVoltarAtras }) {
  if (!autorizacao) return null;
  const det = autorizacao.detalhes || {};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className={`auth-status ${statusAtual}`}>{labels[statusAtual]}</span>
            <h3>{autorizacao.titulo}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="modal-body">
          <p className="desc" style={{margin:"0 0 14px"}}>{autorizacao.desc}</p>
          {Object.keys(det).length > 0 && (
            <div className="modal-detail-grid">
              {Object.entries(det).map(([k,v]) => (
                <div key={k} className="modal-detail-item">
                  <div className="l">{DETALHE_LABELS[k] || k}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
          )}
          <div className="auth-meta-row" style={{marginTop:14}}>{autorizacao.meta.map(m=><span key={m}>{m}</span>)}</div>
        </div>
        <div className="modal-foot">
          {statusAtual==="pendente"
            ? <>
                <button className="btn-decline" onClick={onRecusar}>Recusar</button>
                <button className="btn-approve" onClick={onAutorizar}>Autorizar</button>
              </>
            : <button className="link-btn" onClick={onVoltarAtras}>↺ Voltar atrás / alterar decisão</button>
          }
        </div>
      </div>
    </div>
  );
}

