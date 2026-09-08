import { useState } from 'react';
import { Menu, Bell, ChevronDown, BookMarked } from 'lucide-react';

/**
 * Barra superior fixa: breadcrumb da página atual, sino de notificações
 * (com indicador de novidade) e menu do usuário logado.
 */
export default function Topbar({ breadcrumb, onOpenMobile }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 backdrop-blur sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <BookMarked className="h-4 w-4 shrink-0 text-brand-mid sm:hidden" />
        <nav className="flex min-w-0 items-center gap-1.5 text-sm text-slate-500" aria-label="breadcrumb">
          <span className="hidden truncate sm:inline">Escola Estadual</span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span className="truncate font-medium text-slate-800">{breadcrumb}</span>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-action" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-100"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-action text-xs font-semibold text-white">
              MC
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-slate-800">Marina Costa</span>
              <span className="block text-xs leading-tight text-slate-400">Equipe gestora</span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {userMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg"
              role="menu"
            >
              <button className="block w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50" role="menuitem">
                Meu perfil
              </button>
              <button className="block w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50" role="menuitem">
                Preferências
              </button>
              <hr className="my-1 border-slate-100" />
              <button className="block w-full px-3 py-2 text-left text-sm text-rose-500 hover:bg-rose-50" role="menuitem">
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
