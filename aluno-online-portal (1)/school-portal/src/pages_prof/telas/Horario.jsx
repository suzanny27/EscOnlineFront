import React from "react";

const DIAS = [
  { d: "SEG", data: "17/08", aulas: ["1ª Série B|Matemática", "1ª Série B|Matemática", "2ª Série A|Matemática", "Planejamento", "3ª Série J|Matemática", "3ª Série J|Matemática"] },
  { d: "TER", data: "18/08", aulas: ["3ª Série J|Matemática", "3ª Série J|Matemática", "2ª Série A|Matemática", "Planejamento", "1ª Série B|Matemática", "2ª Série A|Matemática"] },
  { d: "QUA", data: "19/08", aulas: ["2ª Série A|Matemática", "2ª Série A|Matemática", "Coordenação", "3ª Série J|Matemática", "1ª Série B|Matemática", "1ª Série B|Matemática"] },
  { d: "QUI", data: "20/08", aulas: ["3ª Série J|Matemática", "2ª Série A|Matemática", "2ª Série A|Matemática", "Planejamento", "1ª Série B|Matemática", "—"] },
  { d: "SEX", data: "21/08", aulas: ["1ª Série B|Matemática", "3ª Série J|Matemática", "3ª Série J|Matemática", "Planejamento", "2ª Série A|Matemática", "—"] },
];

export default function Horario() {
  return (
    <div className="po-painel">
      <div className="po-painel-top">
        <h1><span className="ic">🕐</span> Meu Horário</h1>
        <div className="po-ano">2026 ▾</div>
      </div>
      <div className="po-hgrade">
        {DIAS.map((col) => (
          <div className="po-col" key={col.d}>
            <div className="dia"><b>{col.d}</b><small>{col.data}</small></div>
            {col.aulas.map((a, i) => {
              const [turma, disc] = a.split("|");
              const livre = !disc;
              return (
                <div key={i} className={`po-aula${livre ? " livre" : ""}`}>
                  <span className="n">{i + 1}</span>
                  <div className="info">
                    <b>{turma}</b>
                    {disc && <small>{disc}</small>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
