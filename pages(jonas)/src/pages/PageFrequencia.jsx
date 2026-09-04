import { Card } from "../components/Card";

export function PageFrequencia({ child, onNav }) {
  return (
    <>
      <h2 className="page-title">Frequência Escolar</h2>
      <div className="student-header">
        <div className="av-lg">{child.initials}</div>
        <div className="sh-item"><div className="l">Aluno(a)</div><div className="v">{child.name}</div></div>
        <div className="sh-item"><div className="l">Turma</div><div className="v">{child.turma}</div></div>
        <div className="sh-item"><div className="l">Ano letivo</div><div className="v">2026</div></div>
        <span className="status-badge ok" style={{marginLeft:"auto"}}>{child.frequencia.badge}</span>
      </div>
      <Card head="RESUMO GERAL">
        <div className="freq-summary">
          {child.frequencia.summary.map(s=>(
            <div key={s.l} className={`freq-box${s.cls?" "+s.cls:""}`}>
              <div className="v">{s.v}</div><div className="l">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="section-subhead">Frequência por disciplina</div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Disciplina</th><th className="num">Aulas</th><th className="num">Presenças</th><th className="num">Faltas</th><th className="num">Frequência</th></tr></thead>
            <tbody>
              {child.frequencia.disciplinas.map(d=>(
                <tr key={d.d}><td>{d.d}</td><td className="num">{d.aulas}</td><td className="num">{d.pres}</td><td className="num">{d.falt}</td><td className="num grade-cell">{d.freq}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,flexWrap:"wrap"}}>
          <div>
            <b style={{fontSize:14.5,color:"var(--ink)",display:"block"}}>Precisa justificar uma falta?</b>
            <span style={{fontSize:12.5,color:"var(--muted)"}}>Registre o motivo, anexe um atestado e acompanhe o histórico de justificativas.</span>
          </div>
          <button className="btn-primary" style={{whiteSpace:"nowrap"}} onClick={()=>onNav("justificativas")}>Justificar uma falta →</button>
        </div>
      </Card>
    </>
  );
}

