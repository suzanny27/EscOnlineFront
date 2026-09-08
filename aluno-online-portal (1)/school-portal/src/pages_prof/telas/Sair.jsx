import React from "react";

function Ondas({ base }) {
  return (
    <svg
      className={`po-onda ${base ? "base" : "topo"}`}
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      height="220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4a77c6" d="M0,64 C320,180 640,10 960,80 C1200,130 1320,60 1440,90 L1440,0 L0,0 Z" />
      <path fill="#2560c8" opacity="0.9" d="M0,30 C300,140 680,-20 1000,60 C1220,110 1340,40 1440,70 L1440,0 L0,0 Z" />
      <path fill="#1e478f" opacity="0.85" d="M0,0 C360,90 720,-10 1080,40 C1260,64 1360,20 1440,40 L1440,0 L0,0 Z" />
    </svg>
  );
}

export default function Sair({ onCancelar, onConfirmar }) {
  return (
    <div className="po-sair-wrap">
      <Ondas />
      <Ondas base />
      <div className="po-modal">
        <div className="po-modal-head">
          <h1>Saindo</h1>
          <div className="idioma">🌐 Português ▾</div>
        </div>
        <div className="po-modal-body">
          <div className="ic">🚪</div>
          <p>Você realmente deseja sair?</p>
          <small>Sua sessão atual será encerrada.</small>
        </div>
        <div className="po-modal-acoes">
          <button className="btn cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="btn sair" onClick={onConfirmar}>Sair</button>
        </div>
      </div>
    </div>
  );
}
