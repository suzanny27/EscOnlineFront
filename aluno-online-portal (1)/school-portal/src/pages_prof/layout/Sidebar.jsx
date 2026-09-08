import React from "react";
import { PROFESSOR, MENU } from "../tema";

export default function Sidebar({ atual, onNavegar }) {
  return (
    <aside className="po-sidebar">
      <div className="po-perfil">
        <div className="po-foto">👨‍🏫</div>
        <h2>{PROFESSOR.nome}</h2>
        <div className="po-cargo">{PROFESSOR.cargo}</div>
      </div>
      <ul className="po-menu">
        {MENU.map((m) => (
          <li
            key={m.id}
            className={atual === m.id ? "ativo" : ""}
            onClick={() => onNavegar(m.id)}
          >
            <span className="ic">{m.ic}</span> {m.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
