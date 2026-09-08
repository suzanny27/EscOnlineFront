import { Users, BookOpen, Sparkles, GraduationCap, ClipboardList, FileEdit } from 'lucide-react';
import { ALUNOS, MATRICULAS, TURMAS, getTurma, getCurso } from './schoolData.js';

// Trio de estatísticas repetido no rodapé da maioria das páginas
// (visto em Turmas, Matrículas, Notas, Planejamento).
export const DEFAULT_FOOTER_STATS = [
  { icon: Users, label: 'Cadastros', value: '418', caption: 'pessoas na comunidade' },
  { icon: BookOpen, label: 'Planejamento', value: '24', caption: 'em revisão esta semana' },
  { icon: Sparkles, label: 'Eventos', value: '3', caption: 'nos próximos 15 dias' },
];

// Trio de estatísticas específico da página de Cadastros — derivado da
// estrutura real (12 turmas, matrículas cadastradas) para manter coerência.
export const CADASTROS_FOOTER_STATS = [
  { icon: GraduationCap, label: 'Turmas', value: String(TURMAS.length), caption: '3 anos · 4 cursos técnicos' },
  { icon: ClipboardList, label: 'Matrículas', value: String(MATRICULAS.length), caption: 'com pendência documental' },
  { icon: FileEdit, label: 'Notas', value: '2º', caption: 'bimestre em andamento' },
];

export const PLANEJAMENTO_ROWS = [
  { title: 'Plano de ação · Frequência', subtitle: 'Atualizado há 2 horas', context: 'Agosto', owner: 'Coordenação pedagógica', status: 'Em andamento' },
  { title: 'Conselho de classe · 2º bimestre', subtitle: 'Atualizado há 2 horas', context: '28 ago', owner: 'Equipe gestora', status: 'Agendado' },
  { title: 'Reforço de aprendizagem · Devs e Informática', subtitle: 'Atualizado há 2 horas', context: 'Setembro', owner: 'Área de Exatas', status: 'Em revisão' },
  { title: 'Feira de profissões', subtitle: 'Atualizado há 2 horas', context: '02 set', owner: 'Comissão de eventos', status: 'Em andamento' },
];

// Derivado diretamente de schoolData.ALUNOS/TURMAS/CURSOS para garantir que o
// curso e a turma exibidos em Cadastros sejam sempre coerentes com Turmas,
// Matrículas e Notas (mesma fonte de verdade).
export const CADASTROS_ALUNOS_ROWS = ALUNOS.map((a) => {
  const turma = getTurma(a.turmaId);
  const curso = getCurso(turma?.cursoId);
  return {
    id: a.id.replace(/[0-9]/g, '').slice(0, 2),
    name: a.nome,
    code: a.matriculaId,
    etapa: curso?.nome ?? '—',
    turma: turma?.nome ?? '—',
    status: a.situacao,
  };
});

export const CADASTROS_PROFESSORES_ROWS = [
  { id: 'HM', name: 'Helena Martins', code: 'ID 2021-HM', etapa: 'Núcleo comum · Língua Portuguesa', turma: 'Todos os cursos', status: 'Ativo' },
  { id: 'RS', name: 'Rafael Souza', code: 'ID 2019-RS', etapa: 'Curso técnico · Informática', turma: '1º, 2º e 3º · Informática', status: 'Ativo' },
  { id: 'CM', name: 'Carla Mendes', code: 'ID 2022-CM', etapa: 'Curso técnico · Devs', turma: '1º, 2º e 3º · Devs', status: 'Ativo' },
  { id: 'AL', name: 'André Lima', code: 'ID 2018-AL', etapa: 'Curso técnico · Enfermagem', turma: '1º, 2º e 3º · Enfermagem', status: 'Ativo' },
  { id: 'FD', name: 'Fernanda Duarte', code: 'ID 2020-FD', etapa: 'Curso técnico · Administração', turma: '1º, 2º e 3º · Administração', status: 'Ativo' },
];
