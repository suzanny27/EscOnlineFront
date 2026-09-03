import {
  LayoutGrid,
  Users,
  GraduationCap,
  ClipboardList,
  FileEdit,
  CalendarDays,
  NotebookText,
  BarChart3,
  Sparkles,
  Newspaper,
  Building2,
} from 'lucide-react';

// Estrutura de navegação da sidebar, organizada por seção — espelha
// exatamente a hierarquia vista no design (Visão geral / Gestão acadêmica /
// Acompanhamento / Comunicação / Institucional).
export const NAV_SECTIONS = [
  {
    label: 'Visão geral',
    items: [{ to: '/', label: 'Tela inicial', icon: LayoutGrid }],
  },
  {
    label: 'Gestão acadêmica',
    items: [
      { to: '/cadastros', label: 'Cadastros', icon: Users, badge: '2' },
      { to: '/turmas', label: 'Turmas', icon: GraduationCap, badge: '12' },
      { to: '/matriculas', label: 'Matrículas', icon: ClipboardList, badge: 'NOVO', badgeTone: 'accent' },
      { to: '/notas', label: 'Notas', icon: FileEdit },
      { to: '/calendario', label: 'Calendário letivo', icon: CalendarDays },
    ],
  },
  {
    label: 'Acompanhamento',
    items: [
      { to: '/planejamento', label: 'Planejamento', icon: NotebookText },
      { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
    ],
  },
  {
    label: 'Comunicação',
    items: [
      { to: '/eventos', label: 'Eventos', icon: Sparkles },
      { to: '/noticias', label: 'Notícias escolares', icon: Newspaper },
    ],
  },
  {
    label: 'Institucional',
    items: [{ to: '/escola', label: 'Informações da escola', icon: Building2 }],
  },
];
