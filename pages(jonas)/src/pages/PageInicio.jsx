import { useState } from "react";
import { Card } from "../components/Card";

export function PageInicio({ child, onNav, respFirstName }) {
  const [auths, setAuths] = useState(
    child.autorizacoes.filter(a => a.pend).map((a,i) => ({...a, id:i, decided:null}))
  );
  const respond = (id, val) => setAuths(prev => prev.map(a => a.id===id ? {...a, decided:val} : a));

  return (
    <>
      <h2 className="page-title">Olá, {respFirstName} — acompanhe <span>{child.first}</span> por aqui</h2>
      <div className="stats-row">
        {[
          {ic:"⭐",val:child.home.media,lbl:"Média geral",cls:"ok"},
          {ic:"✅",val:child.home.freq,lbl:"Frequência",cls:"ok"},
          {ic:"🔔",val:child.home.comunicados,lbl:"Comunicados novos",cls:"warn"},
          {ic:"📋",val:child.home.autorizacoes,lbl:"Autorizações pendentes",cls:"warn"},
        ].map(s => (
          <div key={s.lbl} className={`stat-card ${s.cls}`}>
            <span className="stat-ic">{s.ic}</span>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="grid-2x2">
        <Card head="CALENDÁRIO LETIVO">
          <div className="cal-highlight">
            <div className="cal-num">03<small>SEG</small></div>
            <div className="lbl"><b>Dia Letivo</b><span>Aula regular</span></div>
          </div>
          {[["04/AGO · TER"],["05/AGO · QUA"],["06/AGO · QUI"],["07/AGO · SEX"],["10/AGO · SEG"]].map(([d]) => (
            <div key={d} className="cal-row"><span className="d">{d}</span><span className="pill">Dia Letivo</span></div>
          ))}
          <div style={{marginTop:"auto",paddingTop:14,textAlign:"right"}}>
            <button className="btn-outline" onClick={()=>onNav("calendario")}>Ver calendário completo →</button>
          </div>
        </Card>

        <Card head="AUTORIZAÇÕES PENDENTES" tag={`${auths.filter(a=>!a.decided).length} pendentes`}>
          {auths.length === 0
            ? <p style={{fontSize:13,color:"var(--muted)"}}>Nenhuma autorização pendente.</p>
            : auths.map(a => (
              <div key={a.id} className="auth-item">
                <b>{a.titulo}</b>
                <div className="desc">{a.desc}</div>
                <div className="auth-actions">
                  {a.decided
                    ? <>
                        <span className={`auth-result ${a.decided}`}>{a.decided==="approved"?"Autorizada ✓":"Recusada ✕"}</span>
                        <button className="link-btn" onClick={()=>respond(a.id,null)}>↺ Voltar atrás / alterar decisão</button>
                      </>
                    : <>
                        <button className="btn-approve" onClick={()=>respond(a.id,"approved")}>Autorizar</button>
                        <button className="btn-decline" onClick={()=>respond(a.id,"declined")}>Recusar</button>
                      </>
                  }
                </div>
              </div>
            ))
          }
          <div style={{marginTop:"auto",paddingTop:14,textAlign:"right"}}>
            <button className="btn-outline" onClick={()=>onNav("autorizacoes")}>Ver todas as autorizações →</button>
          </div>
        </Card>

        <Card head="FREQUÊNCIA" tag={child.frequencia.badge}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:34,color:"var(--ok)",lineHeight:1}}>{child.home.freq}</div>
            <div style={{fontSize:12.5,color:"var(--muted)"}}>de frequência geral no ano letivo</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:16}}>
            {child.frequencia.summary.filter(s=>["Presenças","Faltas","Faltas justificadas","Faltas não justificadas"].includes(s.l)).map(s=>(
              <div key={s.l} className={`freq-box${s.cls?" "+s.cls:""}`}>
                <div className="v">{s.v}</div><div className="l">{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"right",marginTop:"auto"}}>
            <button className="btn-outline" onClick={()=>onNav("frequencia")}>Ver frequência completa →</button>
          </div>
        </Card>

        <Card head="ÚLTIMAS NOTÍCIAS">
          {[
            {t:"Reunião de pais — 2º semestre",d:"20/08/2026 às 09:30"},
            {t:"Tutorial de Acesso ao Aluno Online",d:"18/08/2026 às 09:30"},
            {t:"Alteração no horário das aulas de Ed. Física",d:"14/08/2026"},
            {t:"Feriado — Nossa Senhora Aparecida e Dia das Crianças",d:"05/08/2026"},
            {t:"Passeio escolar — Feira de Ciências Municipal",d:"20/05/2026"},
          ].map(n => (
            <div key={n.t} className="news-item"><b>{n.t}</b><span className="date">{n.d}</span></div>
          ))}
          <div style={{marginTop:"auto",paddingTop:14,textAlign:"right"}}>
            <button className="btn-outline" onClick={()=>onNav("comunicados")}>Ver todos os comunicados →</button>
          </div>
        </Card>
      </div>
    </>
  );
}

