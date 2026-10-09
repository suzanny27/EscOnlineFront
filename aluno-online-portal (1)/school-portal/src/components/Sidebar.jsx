import React from 'react';
import {
  Home,
  User,
  Users,
  Clock,
  CalendarDays,
  Star,
  ListChecks,
  ClipboardCheck,
  BookOpen,
  FileEdit,
  FileText,
  Handshake,
  Newspaper,
  MessageSquareWarning,
  ShieldCheck,
  LogOut,
  X,
  GraduationCap,
} from 'lucide-react';

export const menuItems = [
  { key: 'inicio', label: 'Início', icon: Home },
  { key: 'dados-pessoais', label: 'Dados Pessoais', icon: User },
  { key: 'minha-turma', label: 'Minha Turma', icon: Users },
  { key: 'horario', label: 'Horário', icon: Clock },
  { key: 'calendario', label: 'Calendário Letivo', icon: CalendarDays },
  { key: 'boletim', label: 'Boletim', icon: Star },
  { key: 'atividades', label: 'Atividades', icon: ListChecks },
  { key: 'frequencia', label: 'Frequência', icon: ClipboardCheck },
  { key: 'material', label: 'Material Didático', icon: BookOpen },
  { key: 'avaliacoes', label: 'Avaliações Online', icon: FileEdit },
  { key: 'ficha', label: 'Ficha Biográfica', icon: FileText },
  { key: 'parceiros', label: 'Parceiros', icon: Handshake },
  { key: 'noticias', label: 'Notícias', icon: Newspaper },
];

const footerItems = [
  { key: 'feedback', label: 'Críticas ou sugestões', icon: MessageSquareWarning },
  { key: 'privacidade', label: 'Políticas de Privacidade', icon: ShieldCheck },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose, onLogout, items, profile }) {
  const itensMenu = items ?? menuItems;
  const perfil = profile ?? { name: 'Aluno', subtitle: '', initials: 'A' };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-brand-900 text-white border-r border-white/10 z-40 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 md:hidden">
          <span className="font-bold text-lg text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-white/10 active:bg-white/20"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-wide text-white">ESC Online</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center px-5 pt-5 pb-4 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-accent-mint text-brand-900 flex items-center justify-center text-xl font-bold">
            {perfil.initials}
          </div>
          <p className="mt-3 font-bold text-sm leading-tight uppercase text-white">{perfil.name}</p>
          <p className="text-xs text-slate-300 mt-1">{perfil.subtitle}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {itensMenu.map(({ key, label, icon: Icon }) => (
            <NavButton
              key={key}
              active={activePage === key}
              onClick={() => onNavigate(key)}
              icon={Icon}
              label={label}
            />
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          {footerItems.map(({ key, label, icon: Icon }) => (
            <NavButton
              key={key}
              active={activePage === key}
              onClick={() => onNavigate(key)}
              icon={Icon}
              label={label}
            />
          ))}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white active:bg-white/20 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

function NavButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
      ${
        active
          ? 'bg-white/10 text-white border-l-2 border-brand-700'
          : 'text-slate-300 border-l-2 border-transparent hover:bg-white/5 hover:text-white active:bg-white/10'
      }`}
    >
      <Icon size={18} />
      <span className="text-left">{label}</span>
    </button>
  );
}
