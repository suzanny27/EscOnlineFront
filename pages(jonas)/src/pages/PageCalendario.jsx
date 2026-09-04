import { useState } from "react";
import { Card } from "../components/Card";
import { CALENDARIO_EVENTOS } from "../domain/schoolData";

const MESES_CAL = [
  {abrev:"Jan",nome:"Janeiro"},{abrev:"Fev",nome:"Fevereiro"},{abrev:"Mar",nome:"Março"},
  {abrev:"Abr",nome:"Abril"},{abrev:"Mai",nome:"Maio"},{abrev:"Jun",nome:"Junho"},
  {abrev:"Jul",nome:"Julho"},{abrev:"Ago",nome:"Agosto"},{abrev:"Set",nome:"Setembro"},
  {abrev:"Out",nome:"Outubro"},{abrev:"Nov",nome:"Novembro"},{abrev:"Dez",nome:"Dezembro"},
];
const CAL_ANOS_DISPONIVEIS = [2025, 2026, 2027];
const CAL_ANO_LETIVO = 2026; // ano com dados de eventos cadastrados

export function PageCalendario({ child }) {
  const hoje = new Date();
  const [ano, setAno] = useState(CAL_ANO_LETIVO);
  const [mesIdx, setMesIdx] = useState(
    hoje.getFullYear() === CAL_ANO_LETIVO ? hoje.getMonth() : 1
  );

  const irParaMesAnterior = () => {
    if (mesIdx === 0) { setMesIdx(11); setAno(a => a - 1); }
    else setMesIdx(m => m - 1);
  };
  const irParaProximoMes = () => {
    if (mesIdx === 11) { setMesIdx(0); setAno(a => a + 1); }
    else setMesIdx(m => m + 1);
  };
  const irParaHoje = () => {
    setAno(CAL_ANO_LETIVO);
    setMesIdx(hoje.getFullYear() === CAL_ANO_LETIVO ? hoje.getMonth() : 1);
  };

  const abrevMes = MESES_CAL[mesIdx].abrev;
  const eventosDoMes = ano === CAL_ANO_LETIVO
    ? CALENDARIO_EVENTOS.filter(e => e.m === abrevMes)
    : [];

  return (
    <>
      <h2 className="page-title">Calendário Letivo</h2>
      <p className="page-subtitle">{child.calendarioSubtitle}</p>

      <div className="cal-picker">
        <button className="cal-nav-btn" onClick={irParaMesAnterior} aria-label="Mês anterior">‹</button>
        <select className="cal-select" value={mesIdx} onChange={e => setMesIdx(Number(e.target.value))}>
          {MESES_CAL.map((m, i) => <option key={m.abrev} value={i}>{m.nome}</option>)}
        </select>
        <select className="cal-select" value={ano} onChange={e => setAno(Number(e.target.value))}>
          {CAL_ANOS_DISPONIVEIS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button className="cal-nav-btn" onClick={irParaProximoMes} aria-label="Próximo mês">›</button>
        <button className="btn-outline cal-today-btn" onClick={irParaHoje}>Mês atual</button>
      </div>

      <Card head={`EVENTOS DE ${MESES_CAL[mesIdx].nome.toUpperCase()} · ${ano}`}>
        {eventosDoMes.length === 0 ? (
          <div className="cal-empty">Nenhum evento cadastrado para este mês.</div>
        ) : (
          <div className="timeline">
            {eventosDoMes.map((e, i) => (
              <div key={i} className={`tl-item${e.highlight?" tl-highlight":""}`}>
                <div className="tl-date"><div className="d">{e.d}</div><div className="m">{e.m}</div></div>
                <div className="tl-body">
                  <b>{e.titulo}</b>
                  <div className="cat"><span className={`cat-pill cat-${e.cat}`}>{e.pill}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

