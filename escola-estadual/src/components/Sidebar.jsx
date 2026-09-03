import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, BookMarked } from 'lucide-react';
import { NAV_SECTIONS } from '../data/nav.js';

/**
 * Sidebar fixa com marca da escola, seções de navegação e itens ativos.
 * É colapsável (ícone apenas) para telas menores / preferência do usuário,
 * e vira um drawer sobreposto em mobile (controlado por `mobileOpen`).
 */
export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Overlay escurecido no mobile quando o menu está aberto */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-brand-navy text-white transition-all duration-200
        ${collapsed ? 'w-[84px]' : 'w-[251px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo / identidade da escola */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <BookMarked className="h-5 w-5 text-orange-300" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold leading-tight">Escola Estadual</p>
              <p className="truncate text-[10px] font-medium tracking-wide text-indigo-200">
                PROF.ª LÚCIA DE ALMEIDA
              </p>
            </div>
          )}
        </div>

        {/* Cabeçalho do menu com botão de colapsar (apenas desktop) */}
        <div className="flex items-center justify-between px-5 pb-2 pt-2">
          {!collapsed && (
            <span className="text-[11px] font-semibold tracking-wide text-indigo-300">MENU PRINCIPAL</span>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded-md p-1 text-indigo-300 hover:bg-white/10 hover:text-white lg:inline-flex"
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Seções de navegação */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-5">
              {!collapsed && (
                <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wide text-indigo-300">
                  {section.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map(({ to, label, icon: Icon, badge, badgeTone }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-brand-action text-white shadow-card'
                            : 'text-indigo-100/90 hover:bg-white/10 hover:text-white'
                        } ${collapsed ? 'justify-center' : ''}`
                      }
                      title={collapsed ? label : undefined}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                      {!collapsed && <span className="flex-1 truncate">{label}</span>}
                      {!collapsed && badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            badgeTone === 'accent'
                              ? 'bg-orange-300 text-brand-navy'
                              : 'bg-white/15 text-white'
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
