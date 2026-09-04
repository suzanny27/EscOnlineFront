import { useState } from "react";
import { Card } from "../components/Card";

export function PageBoletim({ child }) {
  const [bim, setBim] = useState("all");

  const calcMedia = (notas) => {
    const nums = notas.map(v => parseFloat(String(v).replace(",", ".")));
    const soma = nums.reduce((a, b) => a + b, 0);
    const media = Math.round((soma / nums.length) * 10 + Number.EPSILON * 100) / 10;
    return media.toFixed(1).replace(".", ",");
  };

  return (
    <>
      <h2 className="page-title">Boletim Escolar</h2>
      <div className="student-header">
        <div className="av-lg">{child.initials}</div>
        <div className="sh-item"><div className="l">Aluno(a)</div><div className="v">{child.name}</div></div>
        <div className="sh-item"><div className="l">Turma</div><div className="v">{child.turma}</div></div>
        <div className="sh-item"><div className="l">Ano letivo</div><div className="v">2026</div></div>
        <div className="sh-item"><div className="l">Curso</div><div className="v">{child.curso}</div></div>
        <span className="status-badge ok" style={{marginLeft:"auto"}}>{child.boletim.badge}</span>
      </div>
      <Card head="NOTAS POR BIMESTRE">
        <div className="tab-bar">
          {["1","2","3","4","all"].map(b => (
            <button key={b} className={`tab-btn${bim===b?" active":""}`} onClick={()=>setBim(b)}>
              {b==="all"?"Ano completo":`${b}º Bimestre`}
            </button>
          ))}
        </div>
        <div className="table-scroll no-vscroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Disciplina</th>
                {["1","2","3","4"].map(b=><th key={b} className={`num${bim===b?" col-active":""}`}>{b}ºB</th>)}
                <th className="num">Média</th>
              </tr>
            </thead>
            <tbody>
              {child.boletim.rows.map(r => (
                <tr key={r.d}>
                  <td>{r.d}</td>
                  {r.n.map((val,i)=>(
                    <td key={i} className={`num grade-cell${r.low===(i+1)?" low":""}${bim===String(i+1)?" col-active":""}`}
                      title={r.low===(i+1)?"Nota abaixo da média mínima (6,0)":undefined}>{val}</td>
                  ))}
                  <td className="num grade-cell avg">{calcMedia(r.n)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",gap:18,flexWrap:"wrap",marginTop:14,fontSize:"11.5px",color:"var(--muted)"}}>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--deep)",display:"inline-block",marginRight:6}}/>Nota regular</span>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--danger)",display:"inline-block",marginRight:6}}/>Abaixo da média (6,0)</span>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--primary)",display:"inline-block",marginRight:6}}/>Média final</span>
        </div>
      </Card>
    </>
  );
}

