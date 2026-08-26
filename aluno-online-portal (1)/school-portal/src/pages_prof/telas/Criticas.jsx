import React from "react";
import { C } from "../tema";

export default function Criticas() {
  return (
    <div className="po-grid2" style={{ gridTemplateColumns: "1fr 340px" }}>
      <div className="po-painel">
        <h1 style={{ fontSize: 22, color: C.azulEscuro, padding: "22px 24px 0", margin: 0 }}>
          Críticas ou Sugestões
        </h1>
        <div style={{ padding: "6px 24px 20px", color: C.textoSuave, fontSize: 14, lineHeight: 1.5 }}>
          Use este canal para críticas, sugestões, elogios ou relatos de problemas sobre a plataforma. Inclua o máximo de detalhes possível e, se necessário, anexe imagens.
        </div>
        <div style={{ padding: "0 24px 24px" }}>
          <div className="po-formcampo">
            <label>Assunto</label>
            <select>
              <option>Selecione um assunto</option>
              <option>Crítica</option>
              <option>Sugestão</option>
              <option>Elogio</option>
              <option>Relato de problema</option>
            </select>
          </div>
          <div className="po-formcampo">
            <label>Mensagem</label>
            <textarea placeholder="Descreva sua crítica ou sugestão..." />
          </div>
          <div className="po-formcampo">
            <label>Anexo (opcional)</label>
            <div className="po-anexo">📎 Clique para anexar uma imagem</div>
          </div>
          <button className="po-btn" style={{ width: "100%", padding: 13, fontSize: 15 }}>
            Enviar mensagem
          </button>
        </div>
      </div>

      <div>
        <div className="po-card" style={{ marginBottom: 20 }}>
          <div className="po-card-head" style={{ textAlign: "left" }}>Canal do Professor</div>
          <div className="po-card-body" style={{ fontSize: 13.5, color: C.textoSuave, lineHeight: 1.6 }}>
            Suas mensagens são encaminhadas diretamente à Secretaria da Educação. O retorno chega no seu e-mail institucional em até 5 dias úteis.
          </div>
        </div>
        <div className="po-card">
          <div className="po-card-head" style={{ textAlign: "left" }}>Outros Atendimentos</div>
          <div className="po-card-body" style={{ padding: "8px 18px", color: C.texto }}>
            <div className="po-canal"><span className="ic">📧</span> suporte@seduc.ce.gov.br</div>
            <div className="po-canal"><span className="ic">📞</span> 0800 000 0000</div>
            <div className="po-canal"><span className="ic">💬</span> Chat de atendimento</div>
            <div className="po-canal"><span className="ic">📷</span> @seduc.ceara</div>
          </div>
        </div>
      </div>
    </div>
  );
}
