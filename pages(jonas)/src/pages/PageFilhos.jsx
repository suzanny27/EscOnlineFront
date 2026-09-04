export function PageFilhos({ children: kids, currentIdx, onNav, onSelect }) {
  return (
    <>
      <h2 className="page-title">Meus Filhos</h2>
      {kids.map((c, i) => (
        <div key={c.name} className="child-profile">
          <div className="cp-head" style={{background:i===0?"linear-gradient(90deg,var(--deep),var(--strong))":"linear-gradient(90deg,var(--mid),var(--strong))"}}>
            <div className="av-xl">{c.initials}</div>
            <div><h3>{c.name}</h3><div className="sub">{c.turma} · Matrícula {c.mat} · Ano letivo 2026</div></div>
            <span className="status-chip">Matrícula ativa</span>
          </div>
          <div className="cp-body">
            {i === currentIdx ? (
              <>
                <div className="child-stats">
                  {[
                    {v:c.home.media,l:"Média geral"},{v:c.home.freq,l:"Frequência"},
                    {v:c.frequencia.summary[2].v,l:"Faltas no ano"},{v:c.situacao,l:"Situação"},
                  ].map(s=>(
                    <div key={s.l} className="child-stat"><div className="v">{s.v}</div><div className="l">{s.l}</div></div>
                  ))}
                </div>
                <div className="shortcut-row">
                  {[["⭐","boletim","Ver boletim"],["✅","frequencia","Ver frequência"],["🕒","horario","Ver horário"],["📅","calendario","Calendário letivo"]].map(([ic,page,label])=>(
                    <button key={page} className="shortcut-btn" onClick={()=>onNav(page)}>{ic} {label}</button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p style={{fontSize:"12.5px",color:"var(--muted)",marginBottom:12}}>Selecione este aluno para consultar boletim, frequência, horário e calendário específicos de {c.first}.</p>
                <div className="shortcut-row">
                  <button className="shortcut-btn" onClick={()=>onSelect(i)}>🔄 Selecionar {c.first}</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

