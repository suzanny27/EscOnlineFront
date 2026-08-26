import React from "react";

const LISTA = [
  { ic: "🎓", nome: "Google Classroom", desc: "Organize tarefas, aumente a colaboração e melhore a comunicação com suas turmas." },
  { ic: "📝", nome: "Enem Mix", desc: "Simulados, corretor de redação e mais de 1.000 aulas em diferentes cursos para apoiar seus alunos." },
  { ic: "📊", nome: "SISEDU", desc: "Sistema Online de Avaliação, Suporte e Acompanhamento Educacional." },
  { ic: "🏅", nome: "SIC", desc: "Plataforma para gerenciar inscrições, acompanhar andamento e emitir certificados dos cursos ofertados." },
  { ic: "📚", nome: "Conexão Educação", desc: "Sistema de compartilhamento de conteúdos educativos: videoaulas, podcasts e guias para alunos e professores." },
  { ic: "🎥", nome: "ENEM na rede", desc: "Projeto para orientar os alunos através de videoaulas na preparação para o ENEM." },
];

export default function Parceiros() {
  return (
    <div className="po-gridparc">
      {LISTA.map((p) => (
        <div className="po-parc" key={p.nome}>
          <div className="logo-area">{p.ic}</div>
          <div className="corpo">
            <h3>{p.nome}</h3>
            <p>{p.desc}</p>
            <button className="pbtn">↪ Acessar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
