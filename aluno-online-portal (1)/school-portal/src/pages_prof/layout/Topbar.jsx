import React from "react";

export default function Topbar({ onSair }) {
  return (
    <header className="po-topbar">
      <button className="po-hamb" title="Menu">☰</button>
      <div className="po-logo">
        <div className="ico">👨‍🏫</div>
        <div className="txt">
          <b>Professor <span className="o">Online</span></b>
          <small>o portal do professor da rede estadual</small>
        </div>
      </div>
      <div
        className="po-brasao"
        onClick={onSair}
        style={{ cursor: "pointer" }}
        title="Sair"
      >
        <b>GOVERNO DO</b>
        <br />
        <b>ESTADO DO CEARÁ</b>
        <small>Secretaria da Educação</small>
      </div>
    </header>
  );
}
