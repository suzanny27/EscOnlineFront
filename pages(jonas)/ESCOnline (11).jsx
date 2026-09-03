import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CHILDREN = [
  {
    name:"Lívia Souza", first:"Lívia", initials:"LS", turma:"8º Ano A", mat:"2026004521",
    turno:"Turno manhã", curso:"Ensino Fundamental II", situacao:"Cursando",
    home:{media:"8,7", freq:"96%", comunicados:3, autorizacoes:2},
    calendarioSubtitle:"Datas, feriados, avaliações e eventos do ano letivo. Itens destacados dizem respeito à turma de Lívia (8º Ano A).",
    horarioNota:"Sala-base: Sala 12, exceto Educação Física (Quadra poliesportiva) e Arte (Sala de Artes).",
    horario:[
      {time:"07:00–07:50",cells:[{s:"Matemática",p:"Prof. João Lima"},{s:"Português",p:"Profa. Ana Cristina"},{s:"História",p:"Prof. Carlos Eduardo"},{s:"Geografia",p:"Profa. Renata Alves"},{s:"Inglês",p:"Prof. Lucas Ferreira"}]},
      {time:"07:50–08:40",cells:[{s:"Português",p:"Profa. Ana Cristina"},{s:"Matemática",p:"Prof. João Lima"},{s:"Inglês",p:"Prof. Lucas Ferreira"},{s:"Ciências",p:"Profa. Mariana Duarte"},{s:"História",p:"Prof. Carlos Eduardo"}]},
      {time:"08:40–09:30",cells:[{s:"História",p:"Prof. Carlos Eduardo"},{s:"Geografia",p:"Profa. Renata Alves"},{s:"Matemática",p:"Prof. João Lima"},{s:"Português",p:"Profa. Ana Cristina"},{s:"Educação Física",p:"Prof. Rafael Costa",room:"Quadra poliesportiva"}]},
      {breakRow:"INTERVALO · 09:30 – 09:50"},
      {time:"09:50–10:40",cells:[{s:"Ciências",p:"Profa. Mariana Duarte"},{s:"Arte",p:"Profa. Beatriz Nunes",room:"Sala de Artes"},{s:"Educação Física",p:"Prof. Rafael Costa",room:"Quadra poliesportiva"},{s:"Matemática",p:"Prof. João Lima"},{s:"Geografia",p:"Profa. Renata Alves"}]},
      {time:"10:40–11:30",cells:[{s:"Inglês",p:"Prof. Lucas Ferreira"},{s:"Ciências",p:"Profa. Mariana Duarte"},{s:"Português",p:"Profa. Ana Cristina"},{s:"Arte",p:"Profa. Beatriz Nunes",room:"Sala de Artes"},{s:"Matemática",p:"Prof. João Lima"}]},
    ],
    boletim:{
      badge:"Aprovada · Média 8,7",
      rows:[
        {d:"Matemática",n:["8,5","9,0","8,0","9,2"],avg:"8,7"},
        {d:"Português",n:["9,0","8,5","9,2","9,0"],avg:"8,9"},
        {d:"História",n:["8,0","8,5","9,0","8,8"],avg:"8,6"},
        {d:"Geografia",n:["8,5","5,8","8,7","9,0"],avg:"8,0",low:2},
        {d:"Ciências",n:["9,0","8,8","9,2","9,5"],avg:"9,1"},
        {d:"Inglês",n:["8,0","8,5","9,0","9,0"],avg:"8,6"},
        {d:"Arte",n:["9,5","9,0","9,5","9,8"],avg:"9,5"},
        {d:"Educação Física",n:["9,0","9,5","9,0","9,5"],avg:"9,3"},
      ],
    },
    frequencia:{
      badge:"Frequência regular",
      summary:[
        {v:"490",l:"Total de aulas"},{v:"471",l:"Presenças",cls:"hi"},{v:"19",l:"Faltas",cls:"warn"},
        {v:"96%",l:"Frequência geral",cls:"hi"},{v:"15",l:"Faltas justificadas"},{v:"4",l:"Faltas não justificadas",cls:"warn"},
      ],
      disciplinas:[
        {d:"Matemática",aulas:80,pres:76,falt:4,freq:"95%"},{d:"Português",aulas:80,pres:78,falt:2,freq:"97,5%"},
        {d:"História",aulas:60,pres:57,falt:3,freq:"95%"},{d:"Geografia",aulas:60,pres:58,falt:2,freq:"96,7%"},
        {d:"Ciências",aulas:70,pres:66,falt:4,freq:"94,3%"},{d:"Inglês",aulas:60,pres:59,falt:1,freq:"98,3%"},
        {d:"Arte",aulas:40,pres:39,falt:1,freq:"97,5%"},{d:"Educação Física",aulas:40,pres:38,falt:2,freq:"95%"},
      ],
      justificativas:[
        {data:"10/03/2026",d:"Matemática",motivo:"Consulta médica",ok:true},
        {data:"22/04/2026",d:"Português",motivo:"Atestado médico",ok:true},
        {data:"18/05/2026",d:"Geografia",motivo:"Viagem em família (com atestado)",ok:true},
        {data:"02/06/2026",d:"Ciências",motivo:"Consulta odontológica",ok:true},
        {data:"15/07/2026",d:"Inglês",motivo:"Não informado",ok:false},
      ],
    },
    autorizacoes:[
      {titulo:"Autorização para passeio escolar",status:"pendente",tipo:"excursao",desc:"Passeio ao Museu de Ciências. Saída às 8h e retorno às 12h, com acompanhamento de dois professores.",meta:["📅 Enviada em 15/04/2026","⏳ Prazo de resposta: 22/04/2026"],pend:true,
        detalhes:{
          local:"Museu de Ciências e Tecnologia — Centro",
          data:"29/04/2026 (quarta-feira)",
          saida:"08h00 — Portão principal da escola",
          retorno:"12h00 (previsto) — mesmo local de saída",
          transporte:"Ônibus fretado pela escola (ida e volta)",
          responsaveis:"Prof. Carlos Eduardo e Profa. Renata Alves",
          custo:"Gratuito — sem custo para as famílias",
          levar:"Uniforme escolar, garrafa de água, lanche leve e boné",
          contatoEmergencia:"Secretaria da escola: (85) 3421-0090",
          observacoes:"Alunos devem retornar para a escola até o horário previsto. Em caso de atraso, os responsáveis serão avisados por telefone.",
        }},
      {titulo:"Autorização para uso de imagem",status:"autorizada",tipo:"imagem",desc:"Uso de fotos e vídeos da aluna em eventos escolares para divulgação em redes sociais oficiais da escola.",meta:["📅 Enviada em 05/02/2026","✔️ Respondida em 06/02/2026"],pend:false,
        detalhes:{
          finalidade:"Divulgação institucional em redes sociais, mural e site da escola",
          validade:"Ano letivo de 2026, podendo ser renovada anualmente",
          canais:"Instagram, Facebook e site oficiais da escola",
          revogacao:"A autorização pode ser revogada a qualquer momento mediante solicitação por escrito à secretaria",
        }},
      {titulo:"Autorização para atividade externa",status:"pendente",tipo:"excursao",desc:"Visita técnica à Feira de Ciências Municipal, com transporte fornecido pela escola.",meta:["📅 Enviada em 20/05/2026","⏳ Prazo de resposta: 27/05/2026"],pend:true,
        detalhes:{
          local:"Centro de Eventos Municipal — Feira de Ciências",
          data:"03/06/2026 (quarta-feira)",
          saida:"07h30 — Portão principal da escola",
          retorno:"11h30 (previsto) — mesmo local de saída",
          transporte:"Ônibus fretado pela escola (ida e volta)",
          responsaveis:"Profa. Mariana Duarte e Prof. João Lima",
          custo:"Gratuito — sem custo para as famílias",
          levar:"Uniforme escolar, garrafa de água e caderno de anotações",
          contatoEmergencia:"Secretaria da escola: (85) 3421-0090",
          observacoes:"Atividade obrigatória com nota atribuída em Ciências. Alunos que não comparecerem farão atividade avaliativa substitutiva.",
        }},
      {titulo:"Autorização para saída antecipada",status:"recusada",tipo:"saida",desc:"Solicitação pontual de saída antecipada em 12/03/2026 para consulta médica particular.",meta:["📅 Enviada em 10/03/2026","✔️ Respondida em 10/03/2026"],pend:false,
        detalhes:{
          data:"12/03/2026",
          horarioSaida:"10h30 (durante o 3º horário)",
          motivo:"Consulta médica particular",
          retiradoPor:"Carla Andrade Souza (mãe/responsável)",
          motivoRecusa:"Solicitação enviada fora do prazo mínimo de 24h exigido pela secretaria",
        }},
    ],
  },
  {
    name:"Miguel Souza",first:"Miguel",initials:"MS",turma:"3º Ano A",mat:"2026004522",
    turno:"Turno tarde",curso:"Ensino Fundamental I",situacao:"Cursando",
    home:{media:"9,1",freq:"98%",comunicados:1,autorizacoes:1},
    calendarioSubtitle:"Datas, feriados, avaliações e eventos do ano letivo. Itens destacados dizem respeito à turma de Miguel (3º Ano A).",
    horarioNota:"Sala-base: Sala 04, exceto Educação Física (Quadra poliesportiva) e Arte (Sala de Artes).",
    horario:[
      {time:"13:00–13:50",cells:[{s:"Português",p:"Profa. Camila Rocha"},{s:"Matemática",p:"Prof. Eduardo Nogueira"},{s:"Ciências",p:"Profa. Juliana Prado"},{s:"História",p:"Prof. Diego Barros"},{s:"Educação Física",p:"Prof. Rafael Costa",room:"Quadra poliesportiva"}]},
      {time:"13:50–14:40",cells:[{s:"Matemática",p:"Prof. Eduardo Nogueira"},{s:"Português",p:"Profa. Camila Rocha"},{s:"Geografia",p:"Profa. Fernanda Lima"},{s:"Ciências",p:"Profa. Juliana Prado"},{s:"Português",p:"Profa. Camila Rocha"}]},
      {breakRow:"INTERVALO · 14:40 – 15:00"},
      {time:"15:00–15:50",cells:[{s:"Arte",p:"Profa. Beatriz Nunes",room:"Sala de Artes"},{s:"Ciências",p:"Profa. Juliana Prado"},{s:"Matemática",p:"Prof. Eduardo Nogueira"},{s:"Geografia",p:"Profa. Fernanda Lima"},{s:"Ensino Religioso",p:"Profa. Sônia Martins"}]},
      {time:"15:50–16:40",cells:[{s:"História",p:"Prof. Diego Barros"},{s:"Educação Física",p:"Prof. Rafael Costa",room:"Quadra poliesportiva"},{s:"Português",p:"Profa. Camila Rocha"},{s:"Matemática",p:"Prof. Eduardo Nogueira"},{s:"Arte",p:"Profa. Beatriz Nunes",room:"Sala de Artes"}]},
    ],
    boletim:{
      badge:"Aprovado · Média 9,1",
      rows:[
        {d:"Português",n:["9,0","9,2","8,8","9,5"],avg:"9,1"},
        {d:"Matemática",n:["9,5","9,0","9,2","9,3"],avg:"9,3"},
        {d:"Ciências",n:["8,8","9,0","9,0","9,2"],avg:"9,0"},
        {d:"História",n:["9,0","8,7","9,0","9,1"],avg:"9,0"},
        {d:"Geografia",n:["8,7","5,9","9,0","9,0"],avg:"8,2",low:2},
        {d:"Arte",n:["9,8","9,5","9,7","9,9"],avg:"9,7"},
        {d:"Educação Física",n:["9,5","9,8","9,6","9,9"],avg:"9,7"},
      ],
    },
    frequencia:{
      badge:"Frequência regular",
      summary:[
        {v:"420",l:"Total de aulas"},{v:"412",l:"Presenças",cls:"hi"},{v:"8",l:"Faltas",cls:"warn"},
        {v:"98%",l:"Frequência geral",cls:"hi"},{v:"7",l:"Faltas justificadas"},{v:"1",l:"Faltas não justificadas",cls:"warn"},
      ],
      disciplinas:[
        {d:"Português",aulas:90,pres:89,falt:1,freq:"98,9%"},{d:"Matemática",aulas:90,pres:88,falt:2,freq:"97,8%"},
        {d:"Ciências",aulas:60,pres:59,falt:1,freq:"98,3%"},{d:"História",aulas:60,pres:58,falt:2,freq:"96,7%"},
        {d:"Geografia",aulas:60,pres:59,falt:1,freq:"98,3%"},{d:"Arte",aulas:30,pres:29,falt:1,freq:"96,7%"},
        {d:"Educação Física",aulas:30,pres:30,falt:0,freq:"100%"},
      ],
      justificativas:[
        {data:"08/04/2026",d:"Matemática",motivo:"Consulta médica",ok:true},
        {data:"19/05/2026",d:"História",motivo:"Atestado médico",ok:true},
        {data:"30/06/2026",d:"Geografia",motivo:"Viagem em família (com atestado)",ok:true},
      ],
    },
    autorizacoes:[
      {titulo:"Autorização para visita ao Zoológico",status:"pendente",tipo:"excursao",desc:"Visita pedagógica ao Zoológico Municipal. Saída às 13h e retorno às 17h, com acompanhamento de professores.",meta:["📅 Enviada em 10/08/2026","⏳ Prazo de resposta: 17/08/2026"],pend:true,
        detalhes:{
          local:"Zoológico Municipal",
          data:"24/08/2026 (segunda-feira)",
          saida:"13h00 — Portão principal da escola",
          retorno:"17h00 (previsto) — mesmo local de saída",
          transporte:"Ônibus fretado pela escola (ida e volta)",
          responsaveis:"Profa. Juliana Prado e Prof. Diego Barros",
          custo:"R$ 15,00 (entrada) — pagamento via secretaria até 20/08/2026",
          levar:"Uniforme escolar, garrafa de água, boné e lanche",
          contatoEmergencia:"Secretaria da escola: (85) 3421-0090",
          observacoes:"Alunos com alergias ou restrições alimentares devem informar a professora responsável com antecedência.",
        }},
      {titulo:"Autorização para uso de imagem",status:"autorizada",tipo:"imagem",desc:"Uso de fotos e vídeos do aluno em eventos escolares para divulgação em redes sociais oficiais da escola.",meta:["📅 Enviada em 05/02/2026","✔️ Respondida em 06/02/2026"],pend:false,
        detalhes:{
          finalidade:"Divulgação institucional em redes sociais, mural e site da escola",
          validade:"Ano letivo de 2026, podendo ser renovada anualmente",
          canais:"Instagram, Facebook e site oficiais da escola",
          revogacao:"A autorização pode ser revogada a qualquer momento mediante solicitação por escrito à secretaria",
        }},
      {titulo:"Autorização para Festa Junina",status:"autorizada",tipo:"evento",desc:"Participação nas apresentações da Festa Junina da escola, no período da tarde.",meta:["📅 Enviada em 30/05/2026","✔️ Respondida em 02/06/2026"],pend:false,
        detalhes:{
          local:"Quadra poliesportiva da escola",
          data:"20/06/2026 (sábado)",
          horario:"14h00 às 18h00",
          traje:"Traje junino (roupa xadrez), fornecido pela escola no dia do ensaio",
          responsaveis:"Profa. Sônia Martins",
          observacoes:"Pais e responsáveis estão convidados a participar do evento.",
        }},
    ],
  },
];

const COMUNICADOS = [
  {ic:"📣",titulo:"Reunião de Pais e Responsáveis",isNew:true,meta:"20/08/2026 · Secretaria da Educação",resumo:"Reunião do 2º semestre às 09h30, no auditório da escola, com apresentação do desempenho das turmas."},
  {ic:"📝",titulo:"Informações sobre o calendário de avaliações",isNew:true,meta:"18/08/2026 · Coordenação Pedagógica",resumo:"Divulgado o cronograma de avaliações do 3º bimestre. Confira as datas na tela de Calendário Letivo."},
  {ic:"🕒",titulo:"Alteração no horário das aulas",isNew:true,meta:"14/08/2026 · Secretaria Escolar",resumo:"A partir de 17/08, a aula de Educação Física do 8º Ano A passa a ocorrer às quartas-feiras."},
  {ic:"🎉",titulo:"Comunicado sobre feriado",isNew:false,meta:"05/08/2026 · Secretaria da Educação",resumo:"Não haverá aula no dia 12 de outubro em razão do feriado de Nossa Senhora Aparecida e Dia das Crianças."},
  {ic:"🚌",titulo:"Passeio escolar — Feira de Ciências",isNew:false,meta:"20/05/2026 · Coordenação Pedagógica",resumo:"Enviada autorização para a visita técnica à Feira de Ciências Municipal. Consulte a tela de Autorizações."},
  {ic:"📄",titulo:"Entrega dos boletins",isNew:false,meta:"28/04/2026 · Secretaria Escolar",resumo:"Os boletins do 1º bimestre já estão disponíveis para consulta na tela de Boletim."},
];

const CALENDARIO_EVENTOS = [
  {d:"02",m:"Fev",titulo:"Início do ano letivo",cat:"letivo",pill:"Dia Letivo"},
  {d:"17",m:"Fev",titulo:"Carnaval",cat:"feriado",pill:"Feriado"},
  {d:"10",m:"Mar",titulo:"Reunião de pais e responsáveis — 1º bimestre",cat:"reuniao",pill:"Reunião",highlight:true},
  {d:"20",m:"Mar",titulo:"Avaliação de Matemática — 8º Ano A",cat:"avaliacao",pill:"Avaliação",highlight:true},
  {d:"10",m:"Abr",titulo:"Feriado municipal",cat:"feriado",pill:"Feriado"},
  {d:"17",m:"Abr",titulo:"Sexta-feira Santa",cat:"feriado",pill:"Feriado"},
  {d:"30",m:"Abr",titulo:"Encerramento do 1º bimestre",cat:"encerramento",pill:"Encerramento",highlight:true},
  {d:"04",m:"Mai",titulo:"Semana de avaliações do 2º bimestre",cat:"avaliacao",pill:"Avaliação"},
  {d:"15",m:"Mai",titulo:"Reunião de responsáveis",cat:"reuniao",pill:"Reunião"},
  {d:"12",m:"Jun",titulo:"Festa Junina da escola",cat:"evento",pill:"Evento escolar"},
  {d:"24",m:"Jun",titulo:"Período de recuperação do 2º bimestre",cat:"avaliacao",pill:"Recuperação"},
  {d:"30",m:"Jun",titulo:"Encerramento do 2º bimestre",cat:"encerramento",pill:"Encerramento"},
  {d:"01",m:"Jul",titulo:"Recesso escolar (férias de julho)",cat:"recesso",pill:"Recesso"},
  {d:"10",m:"Ago",titulo:"Retorno às aulas",cat:"letivo",pill:"Dia Letivo"},
  {d:"20",m:"Ago",titulo:"Reunião de pais — 2º semestre",cat:"reuniao",pill:"Reunião",highlight:true},
  {d:"15",m:"Set",titulo:"Conselho de classe",cat:"evento",pill:"Conselho de Classe"},
  {d:"30",m:"Set",titulo:"Encerramento do 3º bimestre",cat:"encerramento",pill:"Encerramento"},
  {d:"12",m:"Out",titulo:"Feriado — N. Sra. Aparecida / Dia das Crianças",cat:"feriado",pill:"Feriado"},
  {d:"20",m:"Nov",titulo:"Feriado — Consciência Negra",cat:"feriado",pill:"Feriado"},
  {d:"10",m:"Dez",titulo:"Entrega dos boletins finais",cat:"evento",pill:"Evento escolar"},
  {d:"18",m:"Dez",titulo:"Encerramento do ano letivo",cat:"encerramento",pill:"Encerramento"},
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@500&display=swap');
:root{
  --deep:#1e478f;--primary:#0058f3;--mid:#4a77c6;--strong:#2450c8;
  --ink:#12233f;--muted:#6b7a90;--line:#e3e8f0;--bg:#f4f6fa;--card:#ffffff;
  --ok:#1f9d63;--ok-bg:#e7f8ef;--warn:#c8790c;--warn-bg:#fdf1e0;
  --danger:#d0392c;--danger-bg:#fbeceb;--radius:14px;--shadow:0 10px 30px rgba(18,35,63,.08);
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;}
h1,h2,h3{font-family:'Poppins',system-ui,sans-serif;}
button{font-family:inherit;cursor:pointer;}
a{color:inherit;text-decoration:none;}

/* Browser frame */
.bf{max-width:1240px;margin:24px auto;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(10,20,40,.35);background:#0d1117;height:calc(100vh - 48px);height:calc(100dvh - 48px);display:flex;flex-direction:column;}
.bbar{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#1b1f27;color:#aab3c2;font-size:13px;flex:none;}
.bdots{display:flex;gap:6px;}
.bdot{width:10px;height:10px;border-radius:50%;background:#3a4150;}
.burl{flex:1;background:#11151c;border-radius:20px;padding:6px 14px;color:#c7cede;font-size:12.5px;}

/* Login */
.lv{display:grid;grid-template-columns:1fr 1fr;min-height:560px;background:var(--card);}
.lhero{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--strong) 0%,var(--mid) 55%,var(--deep) 100%);color:#fff;padding:56px 48px;display:flex;flex-direction:column;justify-content:center;gap:16px;}
.lhero::before,.lhero::after{content:"";position:absolute;border-radius:50%;background:rgba(255,255,255,.10);}
.lhero::before{width:260px;height:260px;top:-60px;right:-60px;}
.lhero::after{width:320px;height:320px;bottom:-120px;left:-40px;background:rgba(255,255,255,.07);}
.lbadge{position:relative;z-index:1;align-self:flex-start;font-size:12.5px;font-weight:600;letter-spacing:.04em;background:rgba(255,255,255,.16);padding:6px 14px;border-radius:999px;}
.lhero h1{position:relative;z-index:1;font-size:34px;font-weight:700;margin:6px 0 4px;}
.lhero p{position:relative;z-index:1;font-size:15px;line-height:1.6;color:rgba(255,255,255,.88);max-width:340px;}
.lfs{padding:56px 52px;display:flex;flex-direction:column;justify-content:center;}
.lfs h2{font-size:22px;color:var(--deep);margin-bottom:6px;}
.role-line{font-size:13.5px;color:var(--muted);margin-bottom:26px;}
.role-line b{color:var(--primary);font-weight:700;}
.field{margin-bottom:20px;}
.field label{display:block;font-size:12.5px;font-weight:600;color:var(--muted);margin-bottom:7px;}
.field input,.field select,.field textarea{width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--line);font-size:14.5px;color:var(--ink);background:#fbfcfe;transition:border-color .15s,box-shadow .15s;font-family:inherit;}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px rgba(0,88,243,.12);background:#fff;}
.lactions{display:flex;align-items:center;justify-content:space-between;margin-top:8px;}
.link-btn{background:none;border:none;color:var(--muted);font-size:14px;cursor:pointer;padding:8px 4px;}
.link-btn:hover{color:var(--deep);text-decoration:underline;}
.btn-primary{background:linear-gradient(90deg,var(--primary),var(--strong));color:#fff;border:none;padding:13px 34px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 8px 18px rgba(0,88,243,.28);transition:transform .12s,box-shadow .12s,filter .12s;}
.btn-primary:hover{filter:brightness(1.05);box-shadow:0 10px 22px rgba(0,88,243,.36);}
.btn-outline{border:1.5px solid var(--primary);color:var(--primary);background:#fff;padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:600;cursor:pointer;transition:background .15s,color .15s;}
.btn-outline:hover{background:var(--primary);color:#fff;}

/* App shell */
.topbar{display:flex;align-items:center;gap:14px;background:linear-gradient(90deg,var(--deep),var(--primary));color:#fff;padding:14px 22px;flex:none;}
.tbrand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;}
.tsubtitle{font-size:12.5px;opacity:.85;margin-left:6px;padding-left:12px;border-left:1px solid rgba(255,255,255,.35);}
.tspacer{flex:1;}
.hamburger{display:none;background:rgba(255,255,255,.14);border:none;color:#fff;width:36px;height:36px;border-radius:9px;font-size:18px;cursor:pointer;align-items:center;justify-content:center;}
.hamburger:hover{background:rgba(255,255,255,.24);}

/* Child switch */
.csw{position:relative;}
.csw-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;padding:8px 14px;border-radius:999px;font-size:13.5px;cursor:pointer;transition:background .15s;}
.csw-btn:hover{background:rgba(255,255,255,.24);}
.chip-av{width:22px;height:22px;border-radius:50%;background:#fff;color:var(--deep);font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;}
.cmenu{position:absolute;right:0;top:calc(100% + 8px);background:#fff;color:var(--ink);border-radius:12px;box-shadow:var(--shadow);min-width:230px;padding:8px;z-index:40;}
.copt{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13.5px;}
.copt:hover{background:var(--bg);}
.copt.active{background:#eaf1ff;color:var(--primary);font-weight:600;}
.copt-av{width:26px;height:26px;border-radius:50%;background:var(--strong);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none;}

/* Layout */
.layout{display:flex;align-items:stretch;flex:1;min-height:0;overflow:hidden;}
.sidebar{background:linear-gradient(180deg,var(--deep),#1a3d80);color:#fff;width:240px;flex:none;min-height:100%;padding:22px 12px;display:flex;flex-direction:column;gap:0;overflow-y:auto;}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(10,18,35,.45);z-index:35;}
.profile{display:flex;align-items:flex-start;gap:12px;padding:16px 14px 20px;border-bottom:1px solid rgba(255,255,255,.14);margin-bottom:14px;}
.avatar{width:46px;height:46px;border-radius:50%;background:#fff;color:var(--deep);font-weight:700;display:flex;align-items:center;justify-content:center;font-size:15px;flex:none;border:2px solid rgba(255,255,255,.35);margin-top:1px;overflow:hidden;}
.avatar img{width:100%;height:100%;object-fit:cover;}
.who{min-width:0;display:flex;flex-direction:column;gap:5px;}
.who b{display:block;font-size:14px;font-weight:700;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.who span.cpf-line{display:block;font-size:11.5px;color:rgba(255,255,255,.72);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.resp-tag{align-self:flex-start;font-size:10px;font-weight:700;letter-spacing:.03em;white-space:nowrap;background:rgba(255,255,255,.18);color:#fff;padding:3px 9px;border-radius:999px;margin-top:1px;}
.navlist{display:flex;flex-direction:column;gap:3px;}
.navbtn{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;color:rgba(255,255,255,.85);padding:11px 12px;border-radius:10px;font-size:14px;cursor:pointer;transition:background .15s,color .15s;}
.navbtn .ic{font-size:16px;width:20px;text-align:center;}
.navbtn:hover{background:rgba(255,255,255,.10);color:#fff;}
.navbtn.active{background:rgba(255,255,255,.94);color:var(--deep);font-weight:700;}
.nav-div{height:1px;background:rgba(255,255,255,.18);margin:14px 4px;}

/* Main */
.main{flex:1;min-width:0;padding:26px 28px 100px;overflow-y:auto;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#c4cede transparent;}
.main::-webkit-scrollbar{width:9px;}
.main::-webkit-scrollbar-track{background:transparent;}
.main::-webkit-scrollbar-thumb{background:#c4cede;border-radius:20px;}
.main::-webkit-scrollbar-thumb:hover{background:#a7b4c9;}
.page-title{font-size:20px;font-weight:700;color:var(--deep);margin-bottom:18px;font-family:'Poppins',sans-serif;}
.page-subtitle{font-size:13px;color:var(--muted);margin-top:-12px;margin-bottom:18px;}

/* Grid */
.grid{display:grid;grid-template-columns:1.35fr 1fr;gap:20px;}
.grid-2x2{display:grid;grid-template-columns:1.35fr 1fr;grid-auto-rows:1fr;gap:20px;align-items:stretch;}
.grid-2x2 .card{display:flex;flex-direction:column;height:100%;}
.grid-2x2 .card-body{flex:1;display:flex;flex-direction:column;}
.col{display:flex;flex-direction:column;gap:20px;}

/* Card */
.card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;}
.card-head{background:linear-gradient(90deg,var(--primary),var(--strong));color:#fff;padding:12px 18px;font-size:13.5px;font-weight:700;letter-spacing:.02em;display:flex;align-items:center;justify-content:space-between;gap:10px;position:sticky;top:0;z-index:2;}
.card.card-scroll{max-height:560px;overflow-y:auto;overflow-x:hidden;}
.card-head .tag{background:rgba(255,255,255,.22);font-size:10.5px;padding:2px 9px;border-radius:999px;font-weight:700;}
.card-head .edit-btn{background:rgba(255,255,255,.22);color:#fff;border:none;padding:5px 13px;border-radius:999px;font-size:11.5px;font-weight:700;cursor:pointer;transition:background .15s;}
.card-head .edit-btn:hover{background:rgba(255,255,255,.36);}
.card-body{padding:18px;}
.pad-lg{padding:22px;}

/* Stat cards */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:26px;}
.stat-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px 20px;text-align:left;position:relative;overflow:hidden;border-top:4px solid transparent;transition:transform .15s,box-shadow .15s;}
.stat-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(18,35,63,.13);}
.stat-card::after{content:"";position:absolute;bottom:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:rgba(0,88,243,.05);}
.stat-card.ok{border-top-color:#1f9d63;}
.stat-card.warn{border-top-color:#c8790c;}
.stat-ic{font-size:28px;margin-bottom:10px;display:block;line-height:1;}
.stat-val{font-family:'Poppins',sans-serif;font-weight:800;font-size:28px;color:var(--deep);line-height:1.1;}
.stat-lbl{font-size:12px;color:var(--muted);margin-top:5px;font-weight:500;}

/* Calendar mini */
.cal-highlight{display:flex;align-items:center;gap:14px;padding-bottom:14px;margin-bottom:12px;border-bottom:1px dashed var(--line);}
.cal-num{font-size:30px;font-weight:800;color:var(--primary);font-family:'Poppins',sans-serif;line-height:1;}
.cal-num small{display:block;font-size:11px;color:var(--muted);font-weight:600;margin-top:2px;}
.lbl b{display:block;font-size:14.5px;color:var(--ink);}
.lbl span{font-size:12.5px;color:var(--muted);}
.cal-row{display:flex;justify-content:space-between;align-items:center;padding:8px 2px;font-size:13.5px;color:var(--ink);border-bottom:1px solid var(--line);}
.cal-row:last-child{border-bottom:none;}
.cal-row .d{color:var(--muted);}
.pill{font-size:11px;font-weight:600;color:var(--primary);background:#eaf1ff;padding:3px 10px;border-radius:999px;}

/* News */
.news-item{padding:10px 2px 14px;border-bottom:1px solid var(--line);}
.news-item:last-child{border:none;padding-bottom:0;}
.news-item b{font-size:13.5px;color:var(--ink);display:block;line-height:1.4;}
.news-item .date{font-size:11.5px;color:var(--muted);margin-top:4px;display:block;}

/* Auth */
.auth-item{padding:12px 2px;border-bottom:1px solid var(--line);}
.auth-item:last-child{border:none;}
.auth-item b{font-size:13.5px;display:block;}
.auth-item .desc{font-size:12.5px;color:var(--muted);margin:4px 0 10px;line-height:1.5;}
.auth-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.btn-approve{background:var(--ok);color:#fff;border:none;padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:600;cursor:pointer;}
.btn-approve:hover{filter:brightness(1.08);}
.btn-decline{background:#fff;color:var(--danger);border:1.5px solid var(--danger);padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:600;cursor:pointer;}
.btn-decline:hover{background:var(--danger-bg);}
.auth-result{font-size:12.5px;font-weight:700;display:inline-block;padding:5px 12px;border-radius:999px;}
.auth-result.approved{background:var(--ok-bg);color:var(--ok);}
.auth-result.declined{background:var(--danger-bg);color:var(--danger);}
.auth-top{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}
.auth-meta-row{display:flex;gap:16px;flex-wrap:wrap;font-size:11.5px;color:var(--muted);margin:6px 0 10px;}
.auth-status{font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap;}
.auth-status.pendente{background:var(--warn-bg);color:var(--warn);}
.auth-status.autorizada{background:var(--ok-bg);color:var(--ok);}
.auth-status.recusada{background:var(--danger-bg);color:var(--danger);}

/* Modal de detalhes */
.modal-overlay{position:fixed;inset:0;background:rgba(10,18,35,.5);z-index:60;display:flex;align-items:center;justify-content:center;padding:20px;}
.modal-panel{background:var(--card);border-radius:var(--radius);box-shadow:0 24px 60px rgba(10,20,40,.35);width:100%;max-width:560px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;}
.modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:20px 22px 14px;border-bottom:1px solid var(--line);}
.modal-head h3{font-size:16.5px;color:var(--deep);margin:6px 0 0;font-family:'Poppins',sans-serif;}
.modal-close{background:var(--bg);border:none;width:30px;height:30px;border-radius:50%;font-size:14px;color:var(--muted);cursor:pointer;flex:none;}
.modal-close:hover{background:var(--line);color:var(--ink);}
.modal-body{padding:18px 22px;overflow-y:auto;}
.modal-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 16px;}
.modal-detail-item{background:var(--bg);border-radius:10px;padding:10px 12px;}
.modal-detail-item .l{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.03em;margin-bottom:4px;}
.modal-detail-item .v{font-size:13px;color:var(--ink);line-height:1.4;}
.modal-foot{display:flex;justify-content:flex-end;gap:10px;padding:14px 22px;border-top:1px solid var(--line);}
@media(max-width:520px){.modal-detail-grid{grid-template-columns:1fr;}}

/* Status badges */
.status-badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;}
.status-badge.ok{background:var(--ok-bg);color:var(--ok);}
.status-badge.warn{background:var(--warn-bg);color:var(--warn);}

/* Table */
.table-scroll{overflow-x:auto;max-height:280px;overflow-y:auto;}
.table-scroll.no-vscroll{max-height:none;overflow-y:visible;}
table.data-table{width:100%;border-collapse:collapse;min-width:600px;font-size:13.3px;}
table.data-table th{background:var(--bg);color:var(--deep);font-weight:700;text-align:left;padding:10px 12px;border-bottom:2px solid var(--line);white-space:nowrap;font-size:11.5px;text-transform:uppercase;letter-spacing:.02em;position:sticky;top:0;z-index:1;}
table.data-table td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:middle;}
table.data-table tr:last-child td{border-bottom:none;}
table.data-table tbody tr:hover{background:#f7faff;}
table.data-table td.num,table.data-table th.num{text-align:center;}
.subject-cell b{font-size:13.3px;display:block;}
.subject-cell span{font-size:11px;color:var(--muted);display:block;margin-top:2px;}
.room-tag{font-size:10px;color:var(--muted);background:var(--bg);padding:1px 8px;border-radius:6px;display:inline-block;margin-top:4px;}
.break-row td{background:var(--bg);color:var(--muted);font-size:11px;font-weight:700;text-align:center;letter-spacing:.03em;padding:6px;}
.grade-cell{font-family:'Roboto Mono',monospace;font-weight:600;color:var(--deep);}
.grade-cell.low{color:var(--danger);font-weight:700;}
.grade-cell.avg{font-weight:700;background:#eaf1ff;border-radius:8px;padding:4px 9px;}
.col-active{background:#eaf1ff;}

/* Tabs */
.tab-bar{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.cal-picker{display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;}
.cal-nav-btn{background:var(--bg);border:1.5px solid var(--line);color:var(--deep);width:34px;height:34px;border-radius:10px;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;flex:none;}
.cal-nav-btn:hover{background:#eaf1ff;border-color:var(--primary);}
.cal-select{background:var(--bg);border:1.5px solid var(--line);color:var(--deep);padding:8px 14px;border-radius:10px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;}
.cal-select:hover{border-color:var(--primary);}
.cal-today-btn{margin-left:auto;}
.tab-btn{background:var(--bg);border:1.5px solid transparent;color:var(--muted);padding:8px 16px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
.tab-btn:hover{background:#eaf1ff;color:var(--deep);}
.tab-btn.active{background:var(--primary);color:#fff;box-shadow:0 4px 10px rgba(0,88,243,.25);}

/* Student header */
.student-header{display:flex;flex-wrap:wrap;gap:22px 30px;align-items:center;padding:16px 18px;background:linear-gradient(90deg,#eaf1ff,#f4f6fa);border-radius:12px;margin-bottom:18px;}
.av-lg{width:54px;height:54px;border-radius:50%;background:var(--strong);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;flex:none;}
.sh-item .l{color:var(--muted);text-transform:uppercase;font-size:10px;font-weight:700;letter-spacing:.03em;}
.sh-item .v{font-size:13.5px;font-weight:600;color:var(--ink);margin-top:2px;}

/* Freq summary */
.freq-summary{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:18px;}
.freq-box{background:var(--bg);border-radius:10px;padding:14px 10px;text-align:center;}
.freq-box .v{font-family:'Poppins',sans-serif;font-weight:800;font-size:19px;color:var(--deep);}
.freq-box .l{font-size:10.5px;color:var(--muted);margin-top:3px;line-height:1.3;}
.freq-box.hi .v{color:var(--ok);}
.freq-box.warn .v{color:var(--warn);}
.section-subhead{font-size:14px;font-weight:700;color:var(--deep);margin:26px 0 12px;}

/* Timeline */
.timeline{display:flex;flex-direction:column;}
.tl-item{display:flex;align-items:center;gap:24px;padding:22px 8px;border-bottom:1px solid var(--line);}
.tl-item:last-child{border-bottom:none;}
.tl-item.tl-highlight{border-left:4px solid var(--primary);padding-left:20px;background:#fbfdff;border-radius:0 10px 10px 0;}
.tl-date{flex:none;width:78px;text-align:center;}
.tl-date .d{font-family:'Poppins',sans-serif;font-weight:800;font-size:28px;color:var(--deep);line-height:1;}
.tl-date .m{font-size:12.5px;color:var(--muted);font-weight:700;text-transform:uppercase;margin-top:4px;letter-spacing:.03em;}
.tl-body{flex:1;min-width:0;}
.tl-body b{font-size:16.5px;display:block;color:var(--ink);}
.tl-body .cat{margin-top:10px;}
.cal-empty{padding:100px 10px;text-align:center;color:var(--muted);font-size:15px;min-height:420px;display:flex;align-items:center;justify-content:center;}
.cat-pill{font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:999px;display:inline-block;}
.cat-letivo{background:#eaf1ff;color:var(--primary);}
.cat-feriado{background:var(--danger-bg);color:var(--danger);}
.cat-recesso{background:#f1eefc;color:#6b4fc9;}
.cat-avaliacao{background:var(--warn-bg);color:var(--warn);}
.cat-reuniao{background:#e7f8ef;color:var(--ok);}
.cat-evento{background:#eaf1ff;color:var(--strong);}
.cat-encerramento{background:var(--bg);color:var(--deep);font-weight:700;}

/* Comunicados */
.comm-item{display:flex;gap:14px;padding:14px 4px;border-bottom:1px solid var(--line);}
.comm-item:last-child{border:none;}
.comm-ic{width:40px;height:40px;border-radius:10px;background:#eaf1ff;color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:17px;flex:none;}
.comm-body{flex:1;min-width:0;}
.comm-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.comm-top b{font-size:14px;}
.new-badge{background:var(--danger);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;}
.comm-meta{font-size:11.5px;color:var(--muted);margin-top:3px;}
.comm-summary{font-size:12.5px;color:var(--ink);margin-top:6px;line-height:1.55;}
.comm-actions{margin-top:10px;}
.btn-read{background:var(--bg);color:var(--deep);border:1.5px solid var(--line);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;}
.btn-read:hover{background:#eaf1ff;border-color:var(--primary);}
.btn-read:disabled{opacity:.6;cursor:default;background:var(--ok-bg);color:var(--ok);border-color:transparent;}

/* Info grid */
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 24px;}

/* Foto de perfil */
.profile-photo-row{display:flex;align-items:center;gap:16px;padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid var(--line);}
.profile-photo-wrap{position:relative;flex:none;}
.profile-photo{width:64px;height:64px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,var(--strong),var(--deep));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:20px;box-shadow:0 2px 8px rgba(18,35,63,.15);}
.profile-photo img{width:100%;height:100%;object-fit:cover;}
.profile-photo-edit{position:absolute;bottom:-2px;right:-2px;width:24px;height:24px;border-radius:50%;background:#fff;border:1.5px solid var(--line);color:var(--primary);font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 5px rgba(18,35,63,.15);transition:transform .12s,background .12s;}
.profile-photo-edit:hover{background:var(--bg);transform:scale(1.06);}
.profile-photo-info{min-width:0;}
.profile-photo-title{font-size:13.5px;font-weight:600;color:var(--ink);}
.profile-photo-sub{font-size:11.5px;color:var(--muted);margin-top:2px;line-height:1.4;}
.info-field{background:var(--bg);border-radius:10px;padding:12px 14px;}
.info-field .l{font-size:11.5px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.03em;}
.info-field .v{font-size:14.5px;margin-top:4px;color:var(--ink);font-weight:500;}
.info-field input{width:100%;border:1.5px solid var(--line);border-radius:8px;padding:7px 9px;margin-top:4px;font-size:13.5px;font-family:inherit;color:var(--ink);background:#fff;}
.info-field input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(0,88,243,.12);}
.btn-save{background:var(--primary);color:#fff;border:none;padding:9px 20px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;}
.btn-cancel{background:#fff;color:var(--muted);border:1.5px solid var(--line);padding:9px 20px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;}

/* Child profile */
.child-profile{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;margin-bottom:18px;}
.cp-head{color:#fff;padding:22px;display:flex;gap:18px;align-items:center;flex-wrap:wrap;}
.av-xl{width:60px;height:60px;border-radius:50%;background:#fff;color:var(--deep);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:21px;flex:none;}
.cp-head h3{font-size:18px;font-family:'Poppins',sans-serif;}
.cp-head .sub{font-size:12.5px;opacity:.85;margin-top:3px;}
.status-chip{margin-left:auto;background:rgba(255,255,255,.2);padding:5px 14px;border-radius:999px;font-size:11.5px;font-weight:700;}
.cp-body{padding:20px;}
.child-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px;}
.child-stat{background:var(--bg);border-radius:10px;padding:12px;text-align:center;}
.child-stat .v{font-family:'Poppins',sans-serif;font-weight:800;font-size:17px;color:var(--deep);}
.child-stat .l{font-size:10.5px;color:var(--muted);margin-top:2px;}
.shortcut-row{display:flex;gap:10px;flex-wrap:wrap;}
.shortcut-btn{display:flex;align-items:center;gap:8px;background:var(--bg);border:1.5px solid var(--line);color:var(--deep);padding:10px 16px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
.shortcut-btn:hover{background:#eaf1ff;border-color:var(--primary);}

/* Sugestões */
.sug-msg-item{padding:12px 2px;border-bottom:1px solid var(--line);}
.sug-msg-item:last-child{border:none;}
.sug-msg-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;}
.sug-msg-top b{font-size:13.5px;}
.sug-tipo-badge{font-size:11px;font-weight:700;background:#eaf1ff;color:var(--primary);padding:2px 9px;border-radius:999px;white-space:nowrap;}
.sug-feedback{margin-top:14px;padding:10px 14px;border-radius:10px;background:var(--ok-bg);color:var(--ok);font-size:13.5px;font-weight:600;}

/* Channels */
.channel-card{text-decoration:none;display:flex;align-items:center;gap:18px;padding:24px;background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);transition:transform .15s,box-shadow .15s;}
.channel-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(18,35,63,.13);}
.channel-ic{font-size:36px;flex:none;}
.channel-name{font-weight:700;font-size:15px;color:var(--deep);margin-bottom:3px;}
.channel-sub{font-size:12.5px;color:var(--muted);}

/* Placeholder */
.placeholder{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);padding:50px 30px;text-align:center;color:var(--muted);}

/* Mono */
.mono{font-family:'Roboto Mono',monospace;}

@media(max-width:980px){.grid{grid-template-columns:1fr;}.grid-2x2{grid-template-columns:1fr;grid-auto-rows:auto;}}
@media(max-width:860px){
  .lv{grid-template-columns:1fr;}
  .hamburger{display:flex;}
  .sidebar{position:fixed;left:0;top:0;bottom:0;z-index:40;transform:translateX(-104%);width:270px;padding-top:70px;transition:transform .25s;}
  .sidebar.open{transform:translateX(0);box-shadow:12px 0 30px rgba(0,0,0,.25);}
  .sidebar-overlay.show{display:block;}
  .main{padding:20px 16px 50px;}
  .tsubtitle{display:none;}
  .lhero{padding:40px 30px;}
  .lfs{padding:40px 30px;}
}
@media(max-width:600px){.stats-row{grid-template-columns:repeat(2,1fr);}.child-stats{grid-template-columns:repeat(2,1fr);}.freq-summary{grid-template-columns:repeat(3,1fr);}}
@media(max-width:520px){.info-grid{grid-template-columns:1fr;}.student-header{flex-direction:column;align-items:flex-start;}}
@media(max-width:640px){
  .bf{margin:0;border-radius:0;box-shadow:none;height:100vh;height:100dvh;max-width:100%;}
  .bbar{display:none;}
  .topbar{padding:12px 14px;gap:10px;}
  .tbrand{font-size:15.5px;gap:8px;}
  .csw-btn{padding:7px 10px;font-size:12.5px;}
  .csw-btn span:not(.chip-av){display:none;}
  .main{padding:16px 12px 60px;}
  .page-title{font-size:17px;margin-bottom:14px;}
  .lhero{padding:32px 22px;}
  .lhero h1{font-size:26px;}
  .lfs{padding:32px 22px;}
  .card-head{padding:11px 14px;font-size:12.5px;}
  .card-body{padding:14px;}
  .stats-row{grid-template-columns:repeat(2,1fr);gap:10px;}
  .child-stats{grid-template-columns:repeat(2,1fr);gap:10px;}
  .freq-summary{grid-template-columns:repeat(2,1fr);gap:10px;}
  .tl-item{gap:14px;padding:16px 4px;}
  .tl-date{width:52px;}
  .tl-date .d{font-size:21px;}
  .tl-body b{font-size:14.5px;}
  .cal-picker{gap:8px;}
  .cal-select{padding:8px 10px;font-size:13px;flex:1;min-width:0;}
  .cal-today-btn{margin-left:0;order:5;width:100%;text-align:center;}
  .auth-top,.auth-meta-row{gap:8px;}
  .modal-overlay{padding:0;align-items:flex-end;}
  .modal-panel{max-width:100%;width:100%;max-height:92vh;max-height:92dvh;border-radius:16px 16px 0 0;}
  .shortcut-row{gap:8px;}
  .shortcut-btn{flex:1 1 calc(50% - 8px);justify-content:center;}
}
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Card({ head, tag, editBtn, children, bodyClass, scroll }) {
  return (
    <div className={`card${scroll?" card-scroll":""}`}>
      <div className="card-head">
        <span>{head}</span>
        <span style={{display:"flex",gap:8,alignItems:"center"}}>
          {tag && <span className="tag">{tag}</span>}
          {editBtn}
        </span>
      </div>
      <div className={`card-body${bodyClass?" "+bodyClass:""}`}>{children}</div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
function PageInicio({ child, onNav, respFirstName }) {
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

function PageFilhos({ children: kids, currentIdx, onNav, onSelect }) {
  return (
    <>
      <h2 className="page-title">Meus Filhos</h2>
      {kids.map((c, i) => (
        <div key={c.name} className="child-profile">
          <div className="cp-head" style={{background:i===0?"linear-gradient(90deg,var(--deep),var(--strong))":"linear-gradient(90deg,var(--mid),var(--strong))"}}>
            <div className="av-xl">{c.initials}</div>
            <div><h3>{c.name}</h3><div className="sub">{c.turma} · Matrícula {c.mat} · Ano letivo 2026</div></div>
            <span className="status-chip">Matrícula ativa</span>
          </div>
          <div className="cp-body">
            {i === currentIdx ? (
              <>
                <div className="child-stats">
                  {[
                    {v:c.home.media,l:"Média geral"},{v:c.home.freq,l:"Frequência"},
                    {v:c.frequencia.summary[2].v,l:"Faltas no ano"},{v:c.situacao,l:"Situação"},
                  ].map(s=>(
                    <div key={s.l} className="child-stat"><div className="v">{s.v}</div><div className="l">{s.l}</div></div>
                  ))}
                </div>
                <div className="shortcut-row">
                  {[["⭐","boletim","Ver boletim"],["✅","frequencia","Ver frequência"],["🕒","horario","Ver horário"],["📅","calendario","Calendário letivo"]].map(([ic,page,label])=>(
                    <button key={page} className="shortcut-btn" onClick={()=>onNav(page)}>{ic} {label}</button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p style={{fontSize:"12.5px",color:"var(--muted)",marginBottom:12}}>Selecione este aluno para consultar boletim, frequência, horário e calendário específicos de {c.first}.</p>
                <div className="shortcut-row">
                  <button className="shortcut-btn" onClick={()=>onSelect(i)}>🔄 Selecionar {c.first}</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

function PageDados({ data, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);
  const fotoRef = useRef();

  useEffect(() => {
    if (!editing) setDraft(data);
  }, [data, editing]);

  const fields = [
    {key:"nome",label:"Nome completo"},{key:"cpf",label:"CPF"},
    {key:"parentesco",label:"Parentesco"},{key:"telefone",label:"Telefone"},
    {key:"email",label:"E-mail"},{key:"endereco",label:"Endereço"},
  ];

  const maskCPF = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 9) out = d.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    else if (d.length > 6) out = d.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    else if (d.length > 3) out = d.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    return out;
  };

  const maskTelefone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 10) out = d.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
    else if (d.length > 6) out = d.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
    else if (d.length > 2) out = d.replace(/(\d{2})(\d{1,4})/, "($1) $2");
    else if (d.length > 0) out = d.replace(/(\d{1,2})/, "($1");
    return out;
  };

  const handleChange = (key, value) => {
    let v = value;
    if (key === "cpf") v = maskCPF(value);
    if (key === "telefone") v = maskTelefone(value);
    setDraft({...draft, [key]: v});
  };

  const iniciais = (data.nome || "")
    .split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();

  const handleFoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onSave({ ...data, foto: reader.result });
    reader.readAsDataURL(file);
  };

  const removerFoto = () => onSave({ ...data, foto: null });

  return (
    <>
      <h2 className="page-title">Meus Dados</h2>
      <Card head="DADOS DO RESPONSÁVEL" editBtn={
        <button className="edit-btn" onClick={()=>{
          setDraft(data);
          setEditing(!editing);
        }}>
          {editing ? "Editando…" : "✏️ Editar dados"}
        </button>
      }>
        <div className="profile-photo-row">
          <div className="profile-photo-wrap">
            <input ref={fotoRef} type="file" accept="image/*" onChange={handleFoto} style={{display:"none"}} />
            <div className="profile-photo">
              {data.foto ? <img src={data.foto} alt="Foto de perfil" /> : <span>{iniciais}</span>}
            </div>
            <button
              type="button"
              className="profile-photo-edit"
              title="Alterar foto de perfil"
              onClick={()=>fotoRef.current && fotoRef.current.click()}
            >✎</button>
          </div>
          <div className="profile-photo-info">
            <div className="profile-photo-title">Foto de perfil</div>
            <div className="profile-photo-sub">Visível apenas para você, discretamente ao lado do seu nome.</div>
            {data.foto && <button className="link-btn" style={{padding:"2px 0"}} onClick={removerFoto}>Remover foto</button>}
          </div>
        </div>

        <div className="info-grid">
          {fields.map(f => (
            <div key={f.key} className="info-field">
              <div className="l">{f.label}</div>
              {editing
                ? <input
                    value={draft[f.key]}
                    onChange={e=>handleChange(f.key, e.target.value)}
                    inputMode={(f.key==="cpf"||f.key==="telefone") ? "numeric" : undefined}
                    placeholder={f.key==="cpf" ? "000.000.000-00" : f.key==="telefone" ? "(00) 00000-0000" : undefined}
                    maxLength={f.key==="cpf" ? 14 : f.key==="telefone" ? 15 : undefined}
                  />
                : <div className="v">{data[f.key]}</div>
              }
            </div>
          ))}
        </div>
        {editing && (
          <div style={{display:"flex",gap:10,marginTop:18}}>
            <button className="btn-save" onClick={()=>{onSave({...data, ...draft});setEditing(false);}}>Salvar alterações</button>
            <button className="btn-cancel" onClick={()=>{setDraft(data);setEditing(false);}}>Cancelar</button>
          </div>
        )}
      </Card>
    </>
  );
}

function PageHorario({ child }) {
  return (
    <>
      <h2 className="page-title">Horário — {child.name}</h2>
      <p className="page-subtitle">{child.turma} · {child.turno} · Ano letivo 2026</p>
      <Card head="GRADE SEMANAL DE AULAS">
        <div className="table-scroll no-vscroll">
          <table className="data-table">
            <thead><tr><th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th></tr></thead>
            <tbody>
              {child.horario.map((row, i) =>
                row.breakRow
                  ? <tr key={i} className="break-row"><td colSpan={6}>{row.breakRow}</td></tr>
                  : <tr key={i}>
                      <td className="mono">{row.time}</td>
                      {row.cells.map((c, j) => (
                        <td key={j} className="subject-cell">
                          <b>{c.s}</b><span>{c.p}</span>
                          {c.room && <span className="room-tag">{c.room}</span>}
                        </td>
                      ))}
                    </tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:"11.5px",color:"var(--muted)",marginTop:14}}>{child.horarioNota}</p>
      </Card>
    </>
  );
}

const MESES_CAL = [
  {abrev:"Jan",nome:"Janeiro"},{abrev:"Fev",nome:"Fevereiro"},{abrev:"Mar",nome:"Março"},
  {abrev:"Abr",nome:"Abril"},{abrev:"Mai",nome:"Maio"},{abrev:"Jun",nome:"Junho"},
  {abrev:"Jul",nome:"Julho"},{abrev:"Ago",nome:"Agosto"},{abrev:"Set",nome:"Setembro"},
  {abrev:"Out",nome:"Outubro"},{abrev:"Nov",nome:"Novembro"},{abrev:"Dez",nome:"Dezembro"},
];
const CAL_ANOS_DISPONIVEIS = [2025, 2026, 2027];
const CAL_ANO_LETIVO = 2026; // ano com dados de eventos cadastrados

function PageCalendario({ child }) {
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

function PageBoletim({ child }) {
  const [bim, setBim] = useState("all");

  const calcMedia = (notas) => {
    const nums = notas.map(v => parseFloat(String(v).replace(",", ".")));
    const soma = nums.reduce((a, b) => a + b, 0);
    const media = Math.round((soma / nums.length) * 10 + Number.EPSILON * 100) / 10;
    return media.toFixed(1).replace(".", ",");
  };

  return (
    <>
      <h2 className="page-title">Boletim Escolar</h2>
      <div className="student-header">
        <div className="av-lg">{child.initials}</div>
        <div className="sh-item"><div className="l">Aluno(a)</div><div className="v">{child.name}</div></div>
        <div className="sh-item"><div className="l">Turma</div><div className="v">{child.turma}</div></div>
        <div className="sh-item"><div className="l">Ano letivo</div><div className="v">2026</div></div>
        <div className="sh-item"><div className="l">Curso</div><div className="v">{child.curso}</div></div>
        <span className="status-badge ok" style={{marginLeft:"auto"}}>{child.boletim.badge}</span>
      </div>
      <Card head="NOTAS POR BIMESTRE">
        <div className="tab-bar">
          {["1","2","3","4","all"].map(b => (
            <button key={b} className={`tab-btn${bim===b?" active":""}`} onClick={()=>setBim(b)}>
              {b==="all"?"Ano completo":`${b}º Bimestre`}
            </button>
          ))}
        </div>
        <div className="table-scroll no-vscroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Disciplina</th>
                {["1","2","3","4"].map(b=><th key={b} className={`num${bim===b?" col-active":""}`}>{b}ºB</th>)}
                <th className="num">Média</th>
              </tr>
            </thead>
            <tbody>
              {child.boletim.rows.map(r => (
                <tr key={r.d}>
                  <td>{r.d}</td>
                  {r.n.map((val,i)=>(
                    <td key={i} className={`num grade-cell${r.low===(i+1)?" low":""}${bim===String(i+1)?" col-active":""}`}
                      title={r.low===(i+1)?"Nota abaixo da média mínima (6,0)":undefined}>{val}</td>
                  ))}
                  <td className="num grade-cell avg">{calcMedia(r.n)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",gap:18,flexWrap:"wrap",marginTop:14,fontSize:"11.5px",color:"var(--muted)"}}>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--deep)",display:"inline-block",marginRight:6}}/>Nota regular</span>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--danger)",display:"inline-block",marginRight:6}}/>Abaixo da média (6,0)</span>
          <span><span style={{width:9,height:9,borderRadius:"50%",background:"var(--primary)",display:"inline-block",marginRight:6}}/>Média final</span>
        </div>
      </Card>
    </>
  );
}

function PageFrequencia({ child, onNav }) {
  return (
    <>
      <h2 className="page-title">Frequência Escolar</h2>
      <div className="student-header">
        <div className="av-lg">{child.initials}</div>
        <div className="sh-item"><div className="l">Aluno(a)</div><div className="v">{child.name}</div></div>
        <div className="sh-item"><div className="l">Turma</div><div className="v">{child.turma}</div></div>
        <div className="sh-item"><div className="l">Ano letivo</div><div className="v">2026</div></div>
        <span className="status-badge ok" style={{marginLeft:"auto"}}>{child.frequencia.badge}</span>
      </div>
      <Card head="RESUMO GERAL">
        <div className="freq-summary">
          {child.frequencia.summary.map(s=>(
            <div key={s.l} className={`freq-box${s.cls?" "+s.cls:""}`}>
              <div className="v">{s.v}</div><div className="l">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="section-subhead">Frequência por disciplina</div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Disciplina</th><th className="num">Aulas</th><th className="num">Presenças</th><th className="num">Faltas</th><th className="num">Frequência</th></tr></thead>
            <tbody>
              {child.frequencia.disciplinas.map(d=>(
                <tr key={d.d}><td>{d.d}</td><td className="num">{d.aulas}</td><td className="num">{d.pres}</td><td className="num">{d.falt}</td><td className="num grade-cell">{d.freq}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,flexWrap:"wrap"}}>
          <div>
            <b style={{fontSize:14.5,color:"var(--ink)",display:"block"}}>Precisa justificar uma falta?</b>
            <span style={{fontSize:12.5,color:"var(--muted)"}}>Registre o motivo, anexe um atestado e acompanhe o histórico de justificativas.</span>
          </div>
          <button className="btn-primary" style={{whiteSpace:"nowrap"}} onClick={()=>onNav("justificativas")}>Justificar uma falta →</button>
        </div>
      </Card>
    </>
  );
}

function PageJustificativas({ child, onNav }) {
  const disciplinasOpts = child.frequencia.disciplinas.map(d=>d.d);

  // Justificativas extras registradas pelo responsável (além das já existentes no mock)
  const [extras, setExtras] = useState([]);

  // Campos do formulário de nova justificativa
  const [fData, setFData] = useState("");
  const [fMateria, setFMateria] = useState(disciplinasOpts[0] || "");
  const [fMotivo, setFMotivo] = useState("");
  const [fAnexo, setFAnexo] = useState(null); // {name, url}
  const [erro, setErro] = useState("");
  const [feedback, setFeedback] = useState(false);
  const fileRef = useRef();

  const [arrastando, setArrastando] = useState(false);

  const processarArquivo = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErro("Selecione um arquivo de imagem (JPG, PNG etc.).");
      return;
    }
    setErro("");
    const reader = new FileReader();
    reader.onload = () => setFAnexo({ name: file.name, url: reader.result });
    reader.readAsDataURL(file);
  };

  const handleAnexo = (e) => {
    const file = e.target.files && e.target.files[0];
    processarArquivo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setArrastando(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    processarArquivo(file);
  };

  const removerAnexo = () => {
    setFAnexo(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const registrar = () => {
    if (!fData.trim() || !fMateria || !fMotivo.trim()) {
      setErro("Preencha a data, a matéria e o motivo da falta.");
      return;
    }
    setErro("");
    const [ano, mes, dia] = fData.split("-");
    const dataBR = dia && mes && ano ? `${dia}/${mes}/${ano}` : fData;
    setExtras(prev => [
      { data: dataBR, d: fMateria, motivo: fMotivo.trim(), ok: true, anexo: fAnexo },
      ...prev,
    ]);
    setFData(""); setFMotivo(""); setFAnexo(null);
    if (fileRef.current) fileRef.current.value = "";
    setFeedback(true);
    setTimeout(()=>setFeedback(false), 3000);
  };

  const todasJustificativas = [...extras, ...child.frequencia.justificativas];

  return (
    <>
      <button className="link-btn" style={{marginBottom:8,padding:0}} onClick={()=>onNav("frequencia")}>← Voltar para Frequência</button>
      <h2 className="page-title">Justificar uma Falta</h2>
      <p className="page-subtitle">Registre o motivo de uma falta de {child.first} e acompanhe o histórico de justificativas já enviadas.</p>

      <Card head="JUSTIFICAR UMA FALTA" bodyClass="pad-lg">
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div className="field">
            <label>Data da falta</label>
            <input type="date" value={fData} onChange={e=>setFData(e.target.value)} />
          </div>
          <div className="field">
            <label>Matéria</label>
            <select value={fMateria} onChange={e=>setFMateria(e.target.value)}>
              {disciplinasOpts.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label>Motivo da falta</label>
          <textarea rows={3} placeholder="Descreva o motivo da falta…" value={fMotivo} onChange={e=>setFMotivo(e.target.value)} style={{resize:"vertical"}} />
        </div>
        <div className="field">
          <label>Atestado ou comprovante (imagem)</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAnexo} style={{display:"none"}} />

          {!fAnexo ? (
            <div
              onClick={()=>fileRef.current && fileRef.current.click()}
              onDragOver={(e)=>{ e.preventDefault(); setArrastando(true); }}
              onDragLeave={()=>setArrastando(false)}
              onDrop={handleDrop}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:6, textAlign:"center", cursor:"pointer", padding:"22px 14px", borderRadius:12,
                border:`2px dashed ${arrastando ? "var(--primary)" : "var(--line)"}`,
                background: arrastando ? "rgba(0,0,0,0.03)" : "transparent",
                transition:"background .15s, border-color .15s",
              }}
            >
              <span style={{fontSize:24}}>📎</span>
              <span style={{fontSize:13.5,fontWeight:600}}>
                Clique para escolher uma imagem ou arraste o arquivo aqui
              </span>
              <span style={{fontSize:12,color:"var(--muted)"}}>
                Formatos aceitos: JPG, PNG (imagem do atestado ou comprovante)
              </span>
            </div>
          ) : (
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:10,padding:"8px 10px",border:"1px solid var(--line)",borderRadius:10}}>
              <img src={fAnexo.url} alt="Prévia do atestado" style={{width:56,height:56,objectFit:"cover",borderRadius:8}} />
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12.5,color:"var(--muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fAnexo.name}</div>
                <div style={{fontSize:11.5,color:"var(--primary)"}}>✓ Arquivo anexado</div>
              </div>
              <button className="link-btn" onClick={removerAnexo}>Remover</button>
            </div>
          )}
        </div>
        {erro && <div className="sug-feedback" style={{background:"#fdecec",color:"#c0392b"}}>{erro}</div>}
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}>
          <button className="btn-primary" style={{padding:"11px 28px",fontSize:14}} onClick={registrar}>Registrar justificativa</button>
        </div>
        {feedback && <div className="sug-feedback">✓ Justificativa registrada com sucesso!</div>}
      </Card>

      <Card head="JUSTIFICATIVAS REGISTRADAS">
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Data</th><th>Disciplina</th><th>Motivo</th><th>Atestado</th><th>Status</th></tr></thead>
            <tbody>
              {todasJustificativas.length===0
                ? <tr><td colSpan={5} style={{textAlign:"center",color:"var(--muted)"}}>Nenhuma justificativa.</td></tr>
                : todasJustificativas.map((j,i)=>(
                  <tr key={i}>
                    <td className="mono">{j.data}</td><td>{j.d}</td><td>{j.motivo}</td>
                    <td>
                      {j.anexo
                        ? <a href={j.anexo.url} target="_blank" rel="noreferrer" style={{color:"var(--primary)",fontSize:12.5}}>📎 Ver anexo</a>
                        : <span style={{color:"var(--muted)",fontSize:12.5}}>—</span>}
                    </td>
                    <td><span className={`status-badge ${j.ok?"ok":"warn"}`}>{j.ok?"Justificada":"Não justificada"}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

const DETALHE_LABELS = {
  local:"📍 Local", data:"📅 Data", saida:"🚌 Saída", retorno:"🏁 Retorno",
  transporte:"🚌 Transporte", responsaveis:"👩‍🏫 Responsáveis", custo:"💰 Custo",
  levar:"🎒 O que levar", contatoEmergencia:"📞 Contato de emergência", observacoes:"📝 Observações",
  finalidade:"🎯 Finalidade", validade:"🗓️ Validade", canais:"📢 Canais de divulgação", revogacao:"↩️ Revogação",
  horarioSaida:"🕒 Horário de saída", motivo:"📝 Motivo", retiradoPor:"🙋 Retirado por", motivoRecusa:"⚠️ Motivo da recusa",
  horario:"🕒 Horário", traje:"👕 Traje",
};

function DetalhesModal({ autorizacao, statusAtual, labels, onClose, onAutorizar, onRecusar, onVoltarAtras }) {
  if (!autorizacao) return null;
  const det = autorizacao.detalhes || {};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className={`auth-status ${statusAtual}`}>{labels[statusAtual]}</span>
            <h3>{autorizacao.titulo}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="modal-body">
          <p className="desc" style={{margin:"0 0 14px"}}>{autorizacao.desc}</p>
          {Object.keys(det).length > 0 && (
            <div className="modal-detail-grid">
              {Object.entries(det).map(([k,v]) => (
                <div key={k} className="modal-detail-item">
                  <div className="l">{DETALHE_LABELS[k] || k}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
          )}
          <div className="auth-meta-row" style={{marginTop:14}}>{autorizacao.meta.map(m=><span key={m}>{m}</span>)}</div>
        </div>
        <div className="modal-foot">
          {statusAtual==="pendente"
            ? <>
                <button className="btn-decline" onClick={onRecusar}>Recusar</button>
                <button className="btn-approve" onClick={onAutorizar}>Autorizar</button>
              </>
            : <button className="link-btn" onClick={onVoltarAtras}>↺ Voltar atrás / alterar decisão</button>
          }
        </div>
      </div>
    </div>
  );
}

function PageAutorizacoes({ child }) {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(child.autorizacoes.map((a,i)=>[i, a.status]))
  );
  const [detalheIdx, setDetalheIdx] = useState(null);
  const respond = (i, val) => setStatuses(prev=>({...prev,[i]:val}));
  const labels = {pendente:"Pendente",autorizada:"Autorizada",recusada:"Recusada"};

  return (
    <>
      <h2 className="page-title">Autorizações</h2>
      <Card head={`AUTORIZAÇÕES — ${child.name.toUpperCase()}`}>
        {child.autorizacoes.map((a,i)=>(
          <div key={i} className="auth-item">
            <div className="auth-top">
              <b>{a.titulo}</b>
              <span className={`auth-status ${statuses[i]}`}>{labels[statuses[i]]}</span>
            </div>
            <div className="desc">{a.desc}</div>
            <div className="auth-meta-row">{a.meta.map(m=><span key={m}>{m}</span>)}</div>
            <div className="auth-actions">
              <button className="btn-outline" onClick={()=>setDetalheIdx(i)}>Ver detalhes</button>
              {statuses[i]==="pendente"
                ? <>
                    <button className="btn-approve" onClick={()=>respond(i,"autorizada")}>Autorizar</button>
                    <button className="btn-decline" onClick={()=>respond(i,"recusada")}>Recusar</button>
                  </>
                : <button className="link-btn" onClick={()=>respond(i,"pendente")}>↺ Voltar atrás / alterar decisão</button>
              }
            </div>
          </div>
        ))}
      </Card>

      <DetalhesModal
        autorizacao={detalheIdx!==null ? child.autorizacoes[detalheIdx] : null}
        statusAtual={detalheIdx!==null ? statuses[detalheIdx] : null}
        labels={labels}
        onClose={()=>setDetalheIdx(null)}
        onAutorizar={()=>respond(detalheIdx,"autorizada")}
        onRecusar={()=>respond(detalheIdx,"recusada")}
        onVoltarAtras={()=>respond(detalheIdx,"pendente")}
      />
    </>
  );
}

function PageComunicados() {
  const [lidos, setLidos] = useState({});
  const marcar = (i) => setLidos(prev=>({...prev,[i]:true}));
  return (
    <>
      <h2 className="page-title">Comunicados</h2>
      <Card head="COMUNICADOS DA SECRETARIA DA EDUCAÇÃO">
        {COMUNICADOS.map((c,i)=>(
          <div key={i} className="comm-item">
            <div className="comm-ic">{c.ic}</div>
            <div className="comm-body">
              <div className="comm-top">
                <b>{c.titulo}</b>
                {c.isNew && !lidos[i] && <span className="new-badge">Novo</span>}
              </div>
              <div className="comm-meta">{c.meta}</div>
              <div className="comm-summary">{c.resumo}</div>
              <div className="comm-actions">
                <button className="btn-read" disabled={lidos[i]} onClick={()=>marcar(i)}>
                  {lidos[i]?"Lido ✓":"Ler comunicado"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

function PageCanais() {
  const canais = [
    {ic:"📷",nome:"Instagram",sub:"@secretariaeducacao"},
    {ic:"📘",nome:"Facebook",sub:"Secretaria Municipal de Educação"},
    {ic:"✉️",nome:"E-mail",sub:"secretaria@educacao.gov.br"},
    {ic:"💬",nome:"Chat online",sub:"Disponível de seg. a sex., das 8h às 17h"},
  ];
  return (
    <>
      <h2 className="page-title">Canais de Atendimento</h2>
      <p className="page-subtitle">Você pode utilizar todos os canais abaixo para dialogar e interagir com a Secretaria da Educação.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
        {canais.map(c=>(
          <a key={c.nome} href="#" className="channel-card">
            <span className="channel-ic">{c.ic}</span>
            <div><div className="channel-name">{c.nome}</div><div className="channel-sub">{c.sub}</div></div>
          </a>
        ))}
      </div>
    </>
  );
}

function PageSugestoes() {
  const TIPOS = {sugestao:"Sugestão",critica:"Crítica",elogio:"Elogio",duvida:"Dúvida"};

  const [tipo, setTipo] = useState("sugestao");
  const [assunto, setAssunto] = useState("");
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [feedback, setFeedback] = useState(false);

  // Edição de mensagem já enviada
  const [editIdx, setEditIdx] = useState(null);
  const [editTipo, setEditTipo] = useState("sugestao");
  const [editAssunto, setEditAssunto] = useState("");
  const [editMsg, setEditMsg] = useState("");

  const formatarData = () => {
    const now = new Date();
    return now.toLocaleDateString("pt-BR") + " às " + now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  };

  const enviar = () => {
    if (!assunto.trim() || !msg.trim()) return;
    setMsgs(prev => [{tipoKey:tipo, tipo:TIPOS[tipo], assunto:assunto.trim(), msg:msg.trim(), data:formatarData()}, ...prev]);
    setAssunto(""); setMsg(""); setTipo("sugestao");
    setFeedback(true);
    setTimeout(()=>setFeedback(false), 3000);
  };

  const apagar = (i) => {
    if (editIdx === i) setEditIdx(null);
    setMsgs(prev => prev.filter((_,idx) => idx !== i));
  };

  const iniciarEdicao = (i) => {
    const m = msgs[i];
    setEditIdx(i);
    setEditTipo(m.tipoKey || "sugestao");
    setEditAssunto(m.assunto);
    setEditMsg(m.msg);
  };

  const cancelarEdicao = () => setEditIdx(null);

  const salvarEdicao = (i) => {
    if (!editAssunto.trim() || !editMsg.trim()) return;
    setMsgs(prev => prev.map((m,idx) => idx === i
      ? {...m, tipoKey:editTipo, tipo:TIPOS[editTipo], assunto:editAssunto.trim(), msg:editMsg.trim(), editado:true}
      : m
    ));
    setEditIdx(null);
  };

  return (
    <>
      <h2 className="page-title">Críticas ou sugestões</h2>
      <p className="page-subtitle">Sua mensagem será enviada à coordenação da escola.</p>
      <div className="grid" style={{gridTemplateColumns:"1.2fr 1fr",alignItems:"start"}}>
        <Card head="NOVA MENSAGEM" bodyClass="pad-lg">
          <div className="field">
            <label>Tipo</label>
            <select value={tipo} onChange={e=>setTipo(e.target.value)}>
              <option value="sugestao">Sugestão</option>
              <option value="critica">Crítica</option>
              <option value="elogio">Elogio</option>
              <option value="duvida">Dúvida</option>
            </select>
          </div>
          <div className="field">
            <label>Assunto</label>
            <input type="text" placeholder="Sobre o que é sua mensagem?" value={assunto} onChange={e=>setAssunto(e.target.value)} />
          </div>
          <div className="field">
            <label>Mensagem</label>
            <textarea rows={5} placeholder="Descreva com detalhes…" value={msg} onChange={e=>setMsg(e.target.value)} style={{resize:"vertical"}} />
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button className="btn-primary" style={{padding:"11px 28px",fontSize:14}} onClick={enviar}>Enviar mensagem</button>
          </div>
          {feedback && <div className="sug-feedback">✓ Mensagem enviada com sucesso!</div>}
        </Card>

        <Card head="MENSAGENS ENVIADAS" tag={String(msgs.length)}>
          {msgs.length === 0
            ? <p style={{fontSize:13,color:"var(--muted)",textAlign:"center",padding:"20px 0"}}>Nenhuma mensagem enviada ainda.</p>
            : msgs.map((m,i)=>(
              <div key={i} className="sug-msg-item">
                {editIdx === i ? (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Tipo</label>
                      <select value={editTipo} onChange={e=>setEditTipo(e.target.value)}>
                        <option value="sugestao">Sugestão</option>
                        <option value="critica">Crítica</option>
                        <option value="elogio">Elogio</option>
                        <option value="duvida">Dúvida</option>
                      </select>
                    </div>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Assunto</label>
                      <input type="text" value={editAssunto} onChange={e=>setEditAssunto(e.target.value)} />
                    </div>
                    <div className="field" style={{marginBottom:0}}>
                      <label>Mensagem</label>
                      <textarea rows={3} value={editMsg} onChange={e=>setEditMsg(e.target.value)} style={{resize:"vertical"}} />
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
                      <button className="link-btn" onClick={cancelarEdicao}>Cancelar</button>
                      <button className="btn-primary" style={{padding:"8px 18px",fontSize:13}} onClick={()=>salvarEdicao(i)}>Salvar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="sug-msg-top"><b>{m.assunto}</b><span className="sug-tipo-badge">{m.tipo}</span></div>
                    <p style={{fontSize:"12.5px",color:"var(--muted)",lineHeight:1.5,marginBottom:4}}>{m.msg}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                      <span style={{fontSize:11,color:"var(--muted)"}}>
                        Enviado em {m.data}{m.editado ? " · editado" : ""}
                      </span>
                      <div style={{display:"flex",gap:6}}>
                        <button className="btn-outline" style={{padding:"4px 12px",fontSize:11.5}} onClick={()=>iniciarEdicao(i)}>Editar</button>
                        <button className="btn-decline" style={{padding:"4px 12px",fontSize:11.5}} onClick={()=>apagar(i)}>Apagar</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          }
        </Card>
      </div>
    </>
  );
}

function PagePrivacidade() {
  return (
    <>
      <h2 className="page-title">Políticas de Privacidade</h2>
      <div className="placeholder"><span style={{fontSize:34,display:"block",marginBottom:10}}>🛡️</span>Consulte a política de privacidade da plataforma.</div>
    </>
  );
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
  {id:"inicio",ic:"🏠",label:"Início"},
  {id:"filhos",ic:"👨‍👩‍👧‍👦",label:"Meus Filhos"},
  {id:"dados",ic:"🧑",label:"Meus Dados"},
  {id:"horario",ic:"🕒",label:"Horário"},
  {id:"calendario",ic:"📅",label:"Calendário Letivo"},
  {id:"boletim",ic:"⭐",label:"Boletim"},
  {id:"frequencia",ic:"✅",label:"Frequência"},
  {id:"justificativas",ic:"📝",label:"Justificar Falta"},
  "div",
  {id:"autorizacoes",ic:"📋",label:"Autorizações"},
  {id:"comunicados",ic:"🔔",label:"Comunicados"},
  {id:"canais",ic:"📞",label:"Canais de Atendimento"},
  "div",
  {id:"sugestoes",ic:"💬",label:"Críticas ou sugestões"},
  {id:"privacidade",ic:"🛡️",label:"Políticas de Privacidade"},
];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("inicio");
  const [childIdx, setChildIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [childMenuOpen, setChildMenuOpen] = useState(false);
  const [responsavel, setResponsavel] = useState({
    nome:"Carla Andrade Souza", cpf:"034.812.xxx-xx", parentesco:"Mãe",
    telefone:"(88) 9xxxx-xxxx", email:"carla.souza@email.com", endereco:"Iguatu — CE",
  });
  const child = CHILDREN[childIdx];
  const cmRef = useRef();
  const mainRef = useRef();

  const respIniciais = responsavel.nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join("")
    .toUpperCase();
  const respFirstName = responsavel.nome.split(" ").filter(Boolean)[0] || "";

  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover");
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (cmRef.current && !cmRef.current.contains(e.target)) setChildMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const nav = (p) => { setPage(p); setSidebarOpen(false); };
  const selectChild = (i) => { setChildIdx(i); setChildMenuOpen(false); };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (mainRef.current) mainRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [page]);

  const renderPage = () => {
    switch(page) {
      case "inicio":      return <PageInicio child={child} onNav={nav} respFirstName={respFirstName} />;
      case "filhos":      return <PageFilhos children={CHILDREN} currentIdx={childIdx} onNav={nav} onSelect={selectChild} />;
      case "dados":       return <PageDados data={responsavel} onSave={setResponsavel} />;
      case "horario":     return <PageHorario child={child} />;
      case "calendario":  return <PageCalendario child={child} />;
      case "boletim":     return <PageBoletim child={child} />;
      case "frequencia":  return <PageFrequencia child={child} onNav={nav} />;
      case "justificativas": return <PageJustificativas child={child} onNav={nav} />;
      case "autorizacoes":return <PageAutorizacoes child={child} />;
      case "comunicados": return <PageComunicados />;
      case "canais":      return <PageCanais />;
      case "sugestoes":   return <PageSugestoes />;
      case "privacidade": return <PagePrivacidade />;
      default:            return null;
    }
  };

  if (!loggedIn) return (
    <>
      <style>{CSS}</style>
      <div className="bf">
        <div className="bbar"><div className="bdots"><span className="bdot"/><span className="bdot"/><span className="bdot"/></div><div className="burl">🔒 localhost:5176</div></div>
        <div className="lv">
          <div className="lhero">
            <span className="lbadge">ESC ONLINE · RESPONSÁVEL</span>
            <h1>Bem-vindo de volta</h1>
            <p>Acompanhe a vida escolar do seu filho ou filha, receba comunicados e cuide de tudo em um só lugar.</p>
          </div>
          <div className="lfs">
            <h2>Tela de Login</h2>
            <p className="role-line">Entrando como <b>RESPONSÁVEL</b></p>
            <div className="field"><label>CPF ou usuário</label><input type="text" placeholder="Digite seu CPF ou usuário" /></div>
            <div className="field"><label>Senha</label><input type="password" defaultValue="••••••••" /></div>
            <div className="lactions">
              <button className="link-btn">Voltar</button>
              <button className="btn-primary" onClick={()=>setLoggedIn(true)}>Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="bf">
        <div className="bbar"><div className="bdots"><span className="bdot"/><span className="bdot"/><span className="bdot"/></div><div className="burl">🔒 localhost:5176/responsavel</div></div>
        <div style={{background:"var(--bg)",flex:1,minHeight:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>

          {/* Topbar */}
          <div className="topbar">
            <button className="hamburger" onClick={()=>setSidebarOpen(!sidebarOpen)}>☰</button>
            <div className="tbrand"><span>🎓</span> ESC Online</div>
            <div className="tsubtitle">Painel do Responsável</div>
            <div className="tspacer"/>
            <div className="csw" ref={cmRef}>
              <button className="csw-btn" onClick={()=>setChildMenuOpen(!childMenuOpen)}>
                <span className="chip-av">{child.initials}</span>
                <span>Filho(a): {child.name}</span> ▾
              </button>
              {childMenuOpen && (
                <div className="cmenu">
                  {CHILDREN.map((c,i)=>(
                    <div key={c.name} className={`copt${i===childIdx?" active":""}`} onClick={()=>selectChild(i)}>
                      <span className="copt-av">{c.initials}</span>
                      <div><b>{c.name}</b><br/><span style={{color:"var(--muted)",fontSize:"11.5px"}}>{c.turma} · {c.mat}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="layout">
            {/* Overlay */}
            <div className={`sidebar-overlay${sidebarOpen?" show":""}`} onClick={()=>setSidebarOpen(false)}/>

            {/* Sidebar */}
            <aside className={`sidebar${sidebarOpen?" open":""}`}>
              <div className="profile">
                <div className="avatar">
                  {responsavel.foto ? <img src={responsavel.foto} alt="Foto de perfil" /> : respIniciais}
                </div>
                <div className="who">
                  <b title={responsavel.nome}>{responsavel.nome}</b>
                  <span className="cpf-line" title={`CPF ${responsavel.cpf}`}>CPF {responsavel.cpf}</span>
                  <span className="resp-tag">RESPONSÁVEL LEGAL</span>
                </div>
              </div>
              <nav className="navlist">
                {NAV.map((item,i) =>
                  item === "div"
                    ? <div key={i} className="nav-div"/>
                    : <button key={item.id} className={`navbtn${page===item.id?" active":""}`} onClick={()=>nav(item.id)}>
                        <span className="ic">{item.ic}</span> {item.label}
                      </button>
                )}
                <button className="navbtn" onClick={()=>setLoggedIn(false)}><span className="ic">↩</span> Sair</button>
              </nav>
            </aside>

            {/* Main */}
            <main className="main" ref={mainRef}>{renderPage()}</main>
          </div>

        </div>
      </div>
    </>
  );
}
