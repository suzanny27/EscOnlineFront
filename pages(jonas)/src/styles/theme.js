export const CSS = `
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
.bf{ height: 100vh;}
.bbar{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#1b1f27;color:#aab3c2;font-size:13px;flex:none;}
.bdots{display:flex;gap:6px;}
.bdot{width:10px;height:10px;border-radius:50%;background:#3a4150;}
.burl{flex:1;background:#11151c;border-radius:20px;padding:6px 14px;color:#c7cede;font-size:12.5px;}

/* Login */
.lv{display:grid;grid-template-columns:1fr 1fr;height:100vh;background:var(--card);}
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
