import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import Button from './components/Button';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentInfo from './pages/StudentInfo';
import MinhaTurma from './pages/MinhaTurma';
import Horario from './pages/Horario';
import Calendario from './pages/Calendario';
import Boletim from './pages/Boletim';
import Atividades from './pages/Atividades';
import Frequencia from './pages/Frequencia';
import MaterialDidatico from './pages/MaterialDidatico';
import Avaliacoes from './pages/Avaliacoes';
import FichaBiografica from './pages/FichaBiografica';
import Partners from './pages/Partners';
import Noticias from './pages/Noticias';
import Feedback from './pages/Feedback';
import Privacidade from './pages/Privacidade';
import ProfessorTurmas from './pages/professor/Turmas';
import ProfessorDiario from './pages/professor/Diario';
import ProfessorNotas from './pages/professor/Notas';
import ProfessorHorario from './pages/professor/Horarios';
import ProfessorParceiros from './pages/professor/Parceiros';
import ProfessorCriticas from './pages/professor/Criticas';
import GestaoHome from './pages/gestao/Home';
import GestaoCadastros from './pages/gestao/Cadastros';
import GestaoTurmas from './pages/gestao/Turmas';
import ResponsavelInicio from './pages/responsavel/Inicio';
import ResponsavelBoletim from './pages/responsavel/Boletim';
import ResponsavelFrequencia from './pages/responsavel/Frequencia';
import ResponsavelComunicados from './pages/responsavel/Comunicados';
import { CadastrosProvider } from './context/CadastrosContext';
import { Users, Star, Clock, Handshake, MessageSquareWarning, Home as HomeIcon, GraduationCap, NotebookPen, ClipboardCheck, Megaphone } from 'lucide-react';

const pages = {
  inicio: { title: 'ESC Online', component: Dashboard },
  'dados-pessoais': { title: 'Dados Pessoais', component: StudentInfo },
  'minha-turma': { title: 'Minha Turma', component: MinhaTurma },
  horario: { title: 'Horários', component: Horario },
  calendario: { title: 'Calendário Letivo', component: Calendario },
  boletim: { title: 'Boletim', component: Boletim },
  atividades: { title: 'Atividades', component: Atividades },
  frequencia: { title: 'Frequência', component: Frequencia },
  material: { title: 'Material Didático', component: MaterialDidatico },
  avaliacoes: { title: 'Avaliações Online', component: Avaliacoes },
  ficha: { title: 'Ficha Biográfica', component: FichaBiografica },
  parceiros: { title: 'Parceiros', component: Partners },
  noticias: { title: 'Notícias', component: Noticias },
  feedback: { title: 'Críticas ou Sugestões', component: Feedback },
  privacidade: { title: 'Políticas de Privacidade', component: Privacidade },
};

const professorMenuItems = [
  { key: 'diario', label: 'Diário', icon: NotebookPen },
  { key: 'turmas', label: 'Minhas Turmas', icon: Users },
  { key: 'notas', label: 'Lançar Notas', icon: Star },
  { key: 'horario', label: 'Meu Horário', icon: Clock },
  { key: 'parceiros', label: 'Parceiros', icon: Handshake },
  { key: 'criticas', label: 'Críticas ou Sugestões', icon: MessageSquareWarning },
];

const professorPages = {
  diario: { title: 'Diário', component: ProfessorDiario },
  turmas: { title: 'Minhas Turmas', component: ProfessorTurmas },
  notas: { title: 'Lançar Notas', component: ProfessorNotas },
  horario: { title: 'Meu Horário', component: ProfessorHorario },
  parceiros: { title: 'Parceiros', component: ProfessorParceiros },
  criticas: { title: 'Críticas ou Sugestões', component: ProfessorCriticas },
};

const gestaoMenuItems = [
  { key: 'home', label: 'Início', icon: HomeIcon },
  { key: 'cadastros', label: 'Cadastros', icon: Users },
  { key: 'turmas', label: 'Turmas', icon: GraduationCap },
];

const gestaoPages = {
  home: { title: 'Início', component: GestaoHome },
  cadastros: { title: 'Cadastros', component: GestaoCadastros },
  turmas: { title: 'Turmas', component: GestaoTurmas },
};

const responsavelMenuItems = [
  { key: 'inicio', label: 'Início', icon: HomeIcon },
  { key: 'boletim', label: 'Boletim', icon: Star },
  { key: 'frequencia', label: 'Frequência', icon: ClipboardCheck },
  { key: 'comunicados', label: 'Comunicados', icon: Megaphone },
];

const responsavelPages = {
  inicio: { title: 'Início', component: ResponsavelInicio },
  boletim: { title: 'Boletim', component: ResponsavelBoletim },
  frequencia: { title: 'Frequência', component: ResponsavelFrequencia },
  comunicados: { title: 'Comunicados', component: ResponsavelComunicados },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [activePage, setActivePage] = useState('inicio');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const isProfessor = role === 'professor';
  const isGestao = role === 'gestao';
  const isResponsavel = role === 'responsavel';

  const currentPages = isProfessor ? professorPages : isGestao ? gestaoPages : isResponsavel ? responsavelPages : pages;
  const currentMenuItems = isProfessor ? professorMenuItems : isGestao ? gestaoMenuItems : isResponsavel ? responsavelMenuItems : undefined;
  const currentProfile = isProfessor
    ? { name: 'Professor', subtitle: loginIdentifier ? `ID ${loginIdentifier}` : '', initials: 'P' }
    : isGestao
    ? { name: 'Equipe Gestora', subtitle: 'Escola Estadual', initials: 'EG' }
    : isResponsavel
    ? { name: 'Responsável', subtitle: loginIdentifier ? `ID ${loginIdentifier}` : '', initials: 'R' }
    : { name: 'Aluno', subtitle: loginIdentifier ? `Matrícula ${loginIdentifier}` : '', initials: 'A' };

  function handleLogin(selectedRole, identifier) {
    setRole(selectedRole);
    setLoginIdentifier(identifier);
    setIsAuthenticated(true);
    if (selectedRole === 'professor') setActivePage('turmas');
    else if (selectedRole === 'gestao') setActivePage('home');
    else if (selectedRole === 'responsavel') setActivePage('inicio');
    else setActivePage('inicio');
  }

  function handleNavigate(page) {
    setActivePage(currentPages[page] ? page : Object.keys(currentPages)[0]);
    setSidebarOpen(false);
  }

  function confirmLogout() {
    setIsAuthenticated(false);
    setRole(null);
    setLoginIdentifier('');
    setLogoutModalOpen(false);
    setActivePage('inicio');
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const PageComponent = currentPages[activePage]?.component ?? Object.values(currentPages)[0].component;
  const pageTitle = currentPages[activePage]?.title ?? Object.values(currentPages)[0].title;

  const accentByRole = {
    professor: { 900: '1 1 32', 700: '252 76 2', 500: '239 44 193', 400: '189 187 255', 50: '200 246 249' },
    gestao: { 900: '1 1 32', 700: '252 76 2', 500: '239 44 193', 400: '189 187 255', 50: '200 246 249' },
    responsavel: { 900: '1 1 32', 700: '252 76 2', 500: '239 44 193', 400: '189 187 255', 50: '200 246 249' },
  };
  const accent = accentByRole[role];
  const accentStyle = accent ? {
    '--accent-900': accent[900],
    '--accent-700': accent[700],
    '--accent-500': accent[500],
    '--accent-400': accent[400],
    '--accent-50': accent[50],
  } : undefined;

  const content = (
    <div className="min-h-screen flex bg-slate-50" style={accentStyle}>
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setLogoutModalOpen(true)}
        items={currentMenuItems}
        profile={currentProfile}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          title={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8">
          {isGestao
            ? <PageComponent onNavigate={handleNavigate} />
            : activePage === 'boletim' && !isProfessor && !isResponsavel
              ? <PageComponent matricula={loginIdentifier} />
              : <PageComponent matricula={loginIdentifier} />}
        </main>
      </div>

      <Modal open={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <div className="p-6 text-center">
          <h3 className="text-lg font-bold text-brand-900 mb-2">Saindo</h3>
          <p className="text-sm text-slate-500 mb-6">Você realmente deseja sair?</p>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setLogoutModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" className="flex-1" onClick={confirmLogout}>
              Sair
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );

  return isGestao ? <CadastrosProvider>{content}</CadastrosProvider> : content;
}
