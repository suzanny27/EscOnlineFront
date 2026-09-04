import { useState, useRef } from "react";
import { Card } from "../components/Card";

export function PageJustificativas({ child, onNav }) {
  const disciplinasOpts = child.frequencia.disciplinas.map(d=>d.d);

  // Justificativas extras registradas pelo responsável (além das já existentes no mock)
  const [extras, setExtras] = useState([]);

  // Campos do formulário de nova justificativa
  const [fData, setFData] = useState("");
  const [fMateria, setFMateria] = useState(disciplinasOpts[0] || "");
  const [fMotivo, setFMotivo] = useState("");
  const [fAnexo, setFAnexo] = useState(null); // {name, url}
  const [erro, setErro] = useState("");
  const [feedback, setFeedback] = useState(false);
  const fileRef = useRef();

  const [arrastando, setArrastando] = useState(false);

  const processarArquivo = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErro("Selecione um arquivo de imagem (JPG, PNG etc.).");
      return;
    }
    setErro("");
    const reader = new FileReader();
    reader.onload = () => setFAnexo({ name: file.name, url: reader.result });
    reader.readAsDataURL(file);
  };

  const handleAnexo = (e) => {
    const file = e.target.files && e.target.files[0];
    processarArquivo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setArrastando(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    processarArquivo(file);
  };

  const removerAnexo = () => {
    setFAnexo(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const registrar = () => {
    if (!fData.trim() || !fMateria || !fMotivo.trim()) {
      setErro("Preencha a data, a matéria e o motivo da falta.");
      return;
    }
    setErro("");
    const [ano, mes, dia] = fData.split("-");
    const dataBR = dia && mes && ano ? `${dia}/${mes}/${ano}` : fData;
    setExtras(prev => [
      { data: dataBR, d: fMateria, motivo: fMotivo.trim(), ok: true, anexo: fAnexo },
      ...prev,
    ]);
    setFData(""); setFMotivo(""); setFAnexo(null);
    if (fileRef.current) fileRef.current.value = "";
    setFeedback(true);
    setTimeout(()=>setFeedback(false), 3000);
  };

  const todasJustificativas = [...extras, ...child.frequencia.justificativas];

  return (
    <>
      <button className="link-btn" style={{marginBottom:8,padding:0}} onClick={()=>onNav("frequencia")}>← Voltar para Frequência</button>
      <h2 className="page-title">Justificar uma Falta</h2>
      <p className="page-subtitle">Registre o motivo de uma falta de {child.first} e acompanhe o histórico de justificativas já enviadas.</p>

      <Card head="JUSTIFICAR UMA FALTA" bodyClass="pad-lg">
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div className="field">
            <label>Data da falta</label>
            <input type="date" value={fData} onChange={e=>setFData(e.target.value)} />
          </div>
          <div className="field">
            <label>Matéria</label>
            <select value={fMateria} onChange={e=>setFMateria(e.target.value)}>
              {disciplinasOpts.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Motivo da falta</label>
          <textarea rows={3} placeholder="Descreva o motivo da falta…" value={fMotivo} onChange={e=>setFMotivo(e.target.value)} style={{resize:"vertical"}} />
        </div>
        <div className="field">
          <label>Atestado ou comprovante (imagem)</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAnexo} style={{display:"none"}} />

          {!fAnexo ? (
            <div
              onClick={()=>fileRef.current && fileRef.current.click()}
              onDragOver={(e)=>{ e.preventDefault(); setArrastando(true); }}
              onDragLeave={()=>setArrastando(false)}
              onDrop={handleDrop}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:6, textAlign:"center", cursor:"pointer", padding:"22px 14px", borderRadius:12,
                border:`2px dashed ${arrastando ? "var(--primary)" : "var(--line)"}`,
                background: arrastando ? "rgba(0,0,0,0.03)" : "transparent",
                transition:"background .15s, border-color .15s",
              }}
            >
              <span style={{fontSize:24}}>📎</span>
              <span style={{fontSize:13.5,fontWeight:600}}>
                Clique para escolher uma imagem ou arraste o arquivo aqui
              </span>
              <span style={{fontSize:12,color:"var(--muted)"}}>
                Formatos aceitos: JPG, PNG (imagem do atestado ou comprovante)
              </span>
            </div>
          ) : (
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:10,padding:"8px 10px",border:"1px solid var(--line)",borderRadius:10}}>
              <img src={fAnexo.url} alt="Prévia do atestado" style={{width:56,height:56,objectFit:"cover",borderRadius:8}} />
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12.5,color:"var(--muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fAnexo.name}</div>
                <div style={{fontSize:11.5,color:"var(--primary)"}}>✓ Arquivo anexado</div>
              </div>
              <button className="link-btn" onClick={removerAnexo}>Remover</button>
            </div>
          )}
        </div>
        {erro && <div className="sug-feedback" style={{background:"#fdecec",color:"#c0392b"}}>{erro}</div>}
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}>
          <button className="btn-primary" style={{padding:"11px 28px",fontSize:14}} onClick={registrar}>Registrar justificativa</button>
        </div>
        {feedback && <div className="sug-feedback">✓ Justificativa registrada com sucesso!</div>}
      </Card>

      <Card head="JUSTIFICATIVAS REGISTRADAS">
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Data</th><th>Disciplina</th><th>Motivo</th><th>Atestado</th><th>Status</th></tr></thead>
            <tbody>
              {todasJustificativas.length===0
                ? <tr><td colSpan={5} style={{textAlign:"center",color:"var(--muted)"}}>Nenhuma justificativa.</td></tr>
                : todasJustificativas.map((j,i)=>(
                  <tr key={i}>
                    <td className="mono">{j.data}</td><td>{j.d}</td><td>{j.motivo}</td>
                    <td>
                      {j.anexo
                        ? <a href={j.anexo.url} target="_blank" rel="noreferrer" style={{color:"var(--primary)",fontSize:12.5}}>📎 Ver anexo</a>
                        : <span style={{color:"var(--muted)",fontSize:12.5}}>—</span>}
                    </td>
                    <td><span className={`status-badge ${j.ok?"ok":"warn"}`}>{j.ok?"Justificada":"Não justificada"}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

