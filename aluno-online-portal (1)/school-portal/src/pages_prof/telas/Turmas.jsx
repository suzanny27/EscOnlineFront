import React from "react";

const TURMAS = [
  { nome: "3ª Série J", sub: "Téc. em Desenv. de Sistemas · Integral", alunos: 28, freq: "94%", media: "8,1" },
  { nome: "2ª Série A", sub: "Ensino Médio Integral", alunos: 31, freq: "90%", media: "7,6" },
  { nome: "1ª Série B", sub: "Ensino Médio Integral", alunos: 30, freq: "91%", media: "7,9" },
];

export default function Turmas() {
  return (
    <>
      <div className="po-infobar">
        <span className="lbl">CREDE:</span><span>CREDE 16</span>
        <span className="lbl">ESCOLA:</span><span>EEEP ALFREDO NUNES DE MELO</span>
        <span className="lbl">DISCIPLINA:</span><span>Matemática</span>
        <span className="lbl">ANO LETIVO:</span><span>2026</span>
      </div>
      <div className="po-gridturmas">
        {TURMAS.map((t) => (
          <div className="po-turma" key={t.nome}>
            <div className="cabe"><b>{t.nome}</b><small>{t.sub}</small></div>
            <div className="corpo">
              <div className="linha"><span>Alunos</span><span className="v">{t.alunos}</span></div>
              <div className="linha"><span>Frequência média</span><span className="v">{t.freq}</span></div>
              <div className="linha"><span>Média da turma</span><span className="v">{t.media}</span></div>
            </div>
            <div className="acoes">
              <span className="ac">📝 Diário</span>
              <span className="ac">⭐ Notas</span>
              <span className="ac">✅ Frequência</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
