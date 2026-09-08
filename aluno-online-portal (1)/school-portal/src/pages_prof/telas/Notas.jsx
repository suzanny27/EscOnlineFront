import React from "react";

const LINHAS = [
  ["AMANDA FELIX VERAS", "8,5", "9,0", "10", "9,0", "ok"],
  ["ANNA NARAH QUEIROZ SILVA", "7,0", "6,5", "8,0", "7,1", "ok"],
  ["ANTONIA TICYANE OLIVEIRA", "9,5", "9,0", "10", "9,4", "ok"],
  ["ANTONIO EDUARDO DA SILVA", "4,0", "5,5", "6,0", "5,1", "baixa"],
  ["DANYELLE BATISTA ALENCAR", "8,0", "8,5", "9,0", "8,4", "ok"],
  ["EDUARDO FRANKLIN DA SILVA", "6,0", "7,0", "7,5", "6,7", "ok"],
  ["ESTELA GARCIA DA SILVA", "10", "9,5", "10", "9,8", "ok"],
  ["GUSTAVO SILVA GONCALVES", "5,0", "4,5", "6,0", "5,1", "baixa"],
  ["HEITOR GONCALVES TEIXEIRA", "7,5", "8,0", "8,5", "7,9", "ok"],
  ["JOAO VICTOR DA SILVA GUEDES", "6,5", "7,0", "7,0", "6,8", "ok"],
];

export default function Notas() {
  return (
    <div className="po-painel">
      <div className="po-painel-top">
        <h1><span className="ic">⭐</span> Lançar Notas</h1>
        <div className="po-filtros">
          <div className="po-sel">3ª Série J ▾</div>
          <div className="po-sel">Matemática ▾</div>
          <div className="po-sel forte">2º Bimestre ▾</div>
        </div>
      </div>
      <table className="po-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th className="center">Nota 1</th>
            <th className="center">Nota 2</th>
            <th className="center">Atividade</th>
            <th className="center">Média</th>
          </tr>
        </thead>
        <tbody>
          {LINHAS.map((l) => (
            <tr key={l[0]}>
              <td><div className="po-alunocel"><span className="po-av">👤</span> {l[0]}</div></td>
              <td className="center"><input className="po-nota" defaultValue={l[1]} /></td>
              <td className="center"><input className="po-nota" defaultValue={l[2]} /></td>
              <td className="center"><input className="po-nota" defaultValue={l[3]} /></td>
              <td className={`po-media ${l[5]}`}>{l[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="po-rodape">
        <small>10 de 28 alunos exibidos · última alteração salva às 10:42</small>
        <button className="po-btn">Salvar notas</button>
      </div>
    </div>
  );
}
