import { useState, useEffect, useRef } from "react";
import { CHILDREN } from "./domain/schoolData";
import { NAV } from "./domain/nav";
import { CSS } from "./styles/theme";
import { PageInicio } from "./pages/PageInicio";
import { PageFilhos } from "./pages/PageFilhos";
import { PageDados } from "./pages/PageDados";
import { PageHorario } from "./pages/PageHorario";
import { PageCalendario } from "./pages/PageCalendario";
import { PageBoletim } from "./pages/PageBoletim";
import { PageFrequencia } from "./pages/PageFrequencia";
import { PageJustificativas } from "./pages/PageJustificativas";
import { PageAutorizacoes } from "./pages/PageAutorizacoes";
import { PageComunicados } from "./pages/PageComunicados";
import { PageCanais } from "./pages/PageCanais";
import { PageSugestoes } from "./pages/PageSugestoes";
import { PagePrivacidade } from "./pages/PagePrivacidade";

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
