import { useState, useEffect, useRef } from "react";
import { Card } from "../components/Card";

export function PageDados({ data, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);
  const fotoRef = useRef();

  useEffect(() => {
    if (!editing) setDraft(data);
  }, [data, editing]);

  const fields = [
    {key:"nome",label:"Nome completo"},{key:"cpf",label:"CPF"},
    {key:"parentesco",label:"Parentesco"},{key:"telefone",label:"Telefone"},
    {key:"email",label:"E-mail"},{key:"endereco",label:"Endereço"},
  ];

  const maskCPF = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 9) out = d.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    else if (d.length > 6) out = d.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    else if (d.length > 3) out = d.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    return out;
  };

  const maskTelefone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 10) out = d.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
    else if (d.length > 6) out = d.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
    else if (d.length > 2) out = d.replace(/(\d{2})(\d{1,4})/, "($1) $2");
    else if (d.length > 0) out = d.replace(/(\d{1,2})/, "($1");
    return out;
  };

  const handleChange = (key, value) => {
    let v = value;
    if (key === "cpf") v = maskCPF(value);
    if (key === "telefone") v = maskTelefone(value);
    setDraft({...draft, [key]: v});
  };

  const iniciais = (data.nome || "")
    .split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();

  const handleFoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onSave({ ...data, foto: reader.result });
    reader.readAsDataURL(file);
  };

  const removerFoto = () => onSave({ ...data, foto: null });

  return (
    <>
      <h2 className="page-title">Meus Dados</h2>
      <Card head="DADOS DO RESPONSÁVEL" editBtn={
        <button className="edit-btn" onClick={()=>{
          setDraft(data);
          setEditing(!editing);
        }}>
          {editing ? "Editando…" : "✏️ Editar dados"}
        </button>
      }>
        <div className="profile-photo-row">
          <div className="profile-photo-wrap">
            <input ref={fotoRef} type="file" accept="image/*" onChange={handleFoto} style={{display:"none"}} />
            <div className="profile-photo">
              {data.foto ? <img src={data.foto} alt="Foto de perfil" /> : <span>{iniciais}</span>}
            </div>
            <button
              type="button"
              className="profile-photo-edit"
              title="Alterar foto de perfil"
              onClick={()=>fotoRef.current && fotoRef.current.click()}
            >✎</button>
          </div>
          <div className="profile-photo-info">
            <div className="profile-photo-title">Foto de perfil</div>
            <div className="profile-photo-sub">Visível apenas para você, discretamente ao lado do seu nome.</div>
            {data.foto && <button className="link-btn" style={{padding:"2px 0"}} onClick={removerFoto}>Remover foto</button>}
          </div>
        </div>

        <div className="info-grid">
          {fields.map(f => (
            <div key={f.key} className="info-field">
              <div className="l">{f.label}</div>
              {editing
                ? <input
                    value={draft[f.key]}
                    onChange={e=>handleChange(f.key, e.target.value)}
                    inputMode={(f.key==="cpf"||f.key==="telefone") ? "numeric" : undefined}
                    placeholder={f.key==="cpf" ? "000.000.000-00" : f.key==="telefone" ? "(00) 00000-0000" : undefined}
                    maxLength={f.key==="cpf" ? 14 : f.key==="telefone" ? 15 : undefined}
                  />
                : <div className="v">{data[f.key]}</div>
              }
            </div>
          ))}
        </div>
        {editing && (
          <div style={{display:"flex",gap:10,marginTop:18}}>
            <button className="btn-save" onClick={()=>{onSave({...data, ...draft});setEditing(false);}}>Salvar alterações</button>
            <button className="btn-cancel" onClick={()=>{setDraft(data);setEditing(false);}}>Cancelar</button>
          </div>
        )}
      </Card>
    </>
  );
}

