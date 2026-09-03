import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import { NAV_SECTIONS } from '../data/nav.js';

// Constrói um mapa { "/rota": "Rótulo" } a partir da navegação da sidebar,
// para que o breadcrumb do Topbar sempre reflita a página ativa.
const BREADCRUMB_MAP = NAV_SECTIONS.flatMap((s) => s.items).reduce((acc, item) => {
  acc[item.to] = item.label;
  return acc;
}, {});

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  // Correspondência exata primeiro; para rotas de detalhe (ex.: /turmas/1-info)
  // cai para o rótulo da rota-base mais próxima na navegação.
  const matchedBase = Object.keys(BREADCRUMB_MAP)
    .filter((path) => path !== '/' && location.pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];
  const breadcrumb =
    BREADCRUMB_MAP[location.pathname] ?? (matchedBase ? BREADCRUMB_MAP[matchedBase] : 'Página');

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Desloca o conteúdo para a direita da sidebar apenas em telas >= lg */}
      <div className="lg:pl-[251px]">
        <Topbar breadcrumb={breadcrumb} onOpenMobile={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
