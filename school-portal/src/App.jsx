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

// Cada página do menu tem seu componente e o título exibido na Navbar.
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

export default function App() {
  // Estado global simples de navegação (sem router, conforme escopo do mock)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('inicio');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  function handleNavigate(page) {
    // Todas as páginas do menu agora têm componente próprio (ver `pages` acima)
    setActivePage(pages[page] ? page : 'inicio');
    setSidebarOpen(false);
  }

  function confirmLogout() {
    setIsAuthenticated(false);
    setLogoutModalOpen(false);
    setActivePage('inicio');
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setLogoutModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          title={pages[activePage]?.title ?? 'ESC Online'}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8">
          {(() => {
            const PageComponent = pages[activePage]?.component ?? Dashboard;
            return <PageComponent />;
          })()}
        </main>
      </div>

      {/* Modal de confirmação de saída */}
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
}
