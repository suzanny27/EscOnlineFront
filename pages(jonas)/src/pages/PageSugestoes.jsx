import { useState } from "react";
import { Card } from "../components/Card";

export function PageSugestoes() {
  const TIPOS = {sugestao:"Sugestão",critica:"Crítica",elogio:"Elogio",duvida:"Dúvida"};

  const [tipo, setTipo] = useState("sugestao");
  const [assunto, setAssunto] = useState("");
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [feedback, setFeedback] = useState(false);

  // Edição de mensagem já enviada
  const [editIdx, setEditIdx] = useState(null);
  const [editTipo, setEditTipo] = useState("sugestao");
  const [editAssunto, setEditAssunto] = useState("");
  const [editMsg, setEditMsg] = useState("");

  const formatarData = () => {
    const now = new Date();
    return now.toLocaleDateString("pt-BR") + " às " + now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  };

  const enviar = () => {
    if (!assunto.trim() || !msg.trim()) return;
    setMsgs(prev => [{tipoKey:tipo, tipo:TIPOS[tipo], assunto:assunto.trim(), msg:msg.trim(), data:formatarData()}, ...prev]);
    setAssunto(""); setMsg(""); setTipo("sugestao");
    setFeedback(true);
    setTimeout(()=>setFeedback(false), 3000);
  };

  const apagar = (i) => {
    if (editIdx === i) setEditIdx(null);
    setMsgs(prev => prev.filter((_,idx) => idx !== i));
  };

  const iniciarEdicao = (i) => {
    const m = msgs[i];
    setEditIdx(i);
    setEditTipo(m.tipoKey || "sugestao");
    setEditAssunto(m.assunto);
    setEditMsg(m.msg);
  };

  const cancelarEdicao = () => setEditIdx(null);

  const salvarEdicao = (i) => {
    if (!editAssunto.trim() || !editMsg.trim()) return;
    setMsgs(prev => prev.map((m,idx) => idx === i
      ? {...m, tipoKey:editTipo, tipo:TIPOS[editTipo], assunto:editAssunto.trim(), msg:editMsg.trim(), editado:true}
      : m
    ));
    setEditIdx(null);
  };

  return (
    <>
      <h2 className="page-title">Críticas ou sugestões</h2>
      <p className="page-subtitle">Sua mensagem será enviada à coordenação da escola.</p>
      <div className="grid" style={{gridTemplateColumns:"1.2fr 1fr",alignItems:"start"}}>
        <Card head="NOVA MENSAGEM" bodyClass="pad-lg">
          <div className="field">
            <label>Tipo</label>
            <select value={tipo} onChange={e=>setTipo(e.target.value)}>
              <option value="sugestao">Sugestão</option>
              <option value="critica">Crítica</option>
              <option value="elogio">Elogio</option>
              <option value="duvida">Dúvida</option>
            </select>
          </div>
          <div className="field">
            <label>Assunto</label>
            <input type="text" placeholder="Sobre o que é sua mensagem?" value={assunto} onChange={e=>setAssunto(e.target.value)} />
          </div>
          <div className="field">
            <label>Mensagem</label>
            <textarea rows={5} placeholder="Descreva com detalhes…" value={msg} onChange={e=>setMsg(e.target.value)} style={{resize:"vertical"}} />
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button className="btn-primary" style={{padding:"11px 28px",fontSize:14}} onClick={enviar}>Enviar mensagem</button>
          </div>
          {feedback && <div className="sug-feedback">✓ Mensagem enviada com sucesso!</div>}
        </Card>

        <Card head="MENSAGENS ENVIADAS" tag={String(msgs.length)}>
          {msgs.length === 0
            ? <p style={{fontSize:13,color:"var(--muted)",textAlign:"center",padding:"20px 0"}}>Nenhuma mensagem enviada ainda.</p>
            : msgs.map((m,i)=>(
              <div key={i} className="sug-msg-item">
                {editIdx === i ? (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Tipo</label>
                      <select value={editTipo} onChange={e=>setEditTipo(e.target.value)}>
                        <option value="sugestao">Sugestão</option>
                        <option value="critica">Crítica</option>
                        <option value="elogio">Elogio</option>
                        <option value="duvida">Dúvida</option>
                      </select>
                    </div>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Assunto</label>
                      <input type="text" value={editAssunto} onChange={e=>setEditAssunto(e.target.value)} />
                    </div>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Mensagem</label>
                      <textarea rows={3} value={editMsg} onChange={e=>setEditMsg(e.target.value)} style={{resize:"vertical"}} />
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
                      <button className="link-btn" onClick={cancelarEdicao}>Cancelar</button>
                      <button className="btn-primary" style={{padding:"8px 18px",fontSize:13}} onClick={()=>salvarEdicao(i)}>Salvar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="sug-msg-top"><b>{m.assunto}</b><span className="sug-tipo-badge">{m.tipo}</span></div>
                    <p style={{fontSize:"12.5px",color:"var(--muted)",lineHeight:1.5,marginBottom:4}}>{m.msg}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                      <span style={{fontSize:11,color:"var(--muted)"}}>
                        Enviado em {m.data}{m.editado ? " · editado" : ""}
                      </span>
                      <div style={{display:"flex",gap:6}}>
                        <button className="btn-outline" style={{padding:"4px 12px",fontSize:11.5}} onClick={()=>iniciarEdicao(i)}>Editar</button>
                        <button className="btn-decline" style={{padding:"4px 12px",fontSize:11.5}} onClick={()=>apagar(i)}>Apagar</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          }
        </Card>
      </div>
    </>
  );
}

