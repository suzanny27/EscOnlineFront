// Todos os dados abaixo são FICTÍCIOS, criados apenas para fins de demonstração
// visual do layout. Nenhuma informação real de aluno, escola ou responsável
// deve ser inserida diretamente no código-fonte — em produção, esses dados
// devem vir de uma API autenticada.

export const student = {
  name: 'João Pedro Andrade Souza',
  registration: '2026001234',
  birthDate: '12/03/2008',
  personalEmail: 'joao.andrade@exemplo.com',
  institutionalEmail: 'joao.souza@aluno.exemplo.gov.br',
  className: 'Integrado 3ª Série | Ensino Médio | Profissional | Integral (45h) | TÉCNICO EM DESENVOLVIMENTO DE SISTEMAS',
  father: 'Marcos Souza',
  mother: 'Renata Andrade Souza',
  guardian: 'Não informado',
  avatarInitials: 'JP',
};

export const school = {
  inep: '00000000',
  name: 'EEEP MODELO DE ENSINO PROFISSIONAL',
  address: 'RUA DAS FLORES, 100, CENTRO, CIDADE MODELO, CE',
  cep: '60000-000',
  phone: '(85) 0000-0000',
  email: 'contato@escolamodelo.exemplo.gov.br',
};

export const calendarEvents = [
  { day: '03', weekday: 'SEG', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
  { day: '04', weekday: 'TER', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
  { day: '05', weekday: 'QUA', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
  { day: '06', weekday: 'QUI', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
  { day: '07', weekday: 'SEX', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
  { day: '10', weekday: 'SEG', month: 'AGO', title: 'Dia Letivo', info: 'Aula regular' },
];

export const news = [
  {
    date: '21/08/2026',
    tag: 'NOVO',
    title: 'Aluno Online passa a contar com cadastro de e-mail pessoal',
    excerpt:
      'Agora é possível inserir seu login com e-mail próprio para facilitar a recuperação de conta e o acesso à plataforma.',
  },
];

export const latestPosts = [
  {
    title: 'Tutorial de Acesso ao Aluno Online - Tutorial de Acesso ao Aluno Online',
    date: '18/08/2026 às 09:30',
  },
];

export const partners = [
  {
    name: 'Google Classroom',
    color: 'bg-amber-400',
    description:
      'Ajuda alunos e professores a organizar as tarefas, aumentar a colaboração e melhorar a comunicação.',
  },
  {
    name: 'Enem Mix',
    color: 'bg-pink-400',
    description:
      'Simulados online, conteúdo em vídeo e mais de 3.000 aulas em vídeo disponíveis para consulta.',
  },
  {
    name: 'SISEDU',
    color: 'bg-teal-400',
    description:
      'Sistema Online de Avaliação, Suporte e Acompanhamento Educacional.',
  },
  {
    name: 'SIC',
    color: 'bg-sky-500',
    description:
      'Plataforma Educacional para geração de boletins, acompanhamento e emissão de certificados online.',
  },
  {
    name: 'Conexão Educação',
    color: 'bg-purple-400',
    description:
      'Conexão Educação é um sistema de acompanhamento de conteúdos educacionais nos mais diversos formatos.',
  },
  {
    name: 'Rede de Estudos',
    color: 'bg-emerald-500',
    description:
      'Projeto voltado para alunos do Ensino Médio, com foco na preparação para o ENEM.',
  },
];

// Grade de disciplinas para a página de Boletim
export const subjects = [
  { name: 'Biologia', b1: '9.0', b2: '—', b3: '—', b4: '—' },
  { name: 'Química', b1: '7.5', b2: '—', b3: '—', b4: '—' },
  { name: 'Física', b1: '10', b2: '—', b3: '—', b4: '—' },
  { name: 'Português', b1: '8.5', b2: '—', b3: '—', b4: '—' },
  { name: 'Matemática', b1: '8.5', b2: '—', b3: '—', b4: '—' },
  { name: 'Filosofia', b1: '9.0', b2: '—', b3: '—', b4: '—' },
  { name: 'Educação Física', b1: '10', b2: '—', b3: '—', b4: '—' },
  { name: 'Sociologia', b1: '10', b2: '—', b3: '—', b4: '—' },
  { name: 'Língua Estrangeira - Inglês', b1: '9.5', b2: '—', b3: '—', b4: '—' },
  { name: 'Língua Estrangeira - Espanhol', b1: '8.0', b2: '—', b3: '—', b4: '—' },
  { name: 'História', b1: '8.0', b2: '—', b3: '—', b4: '—' },
];

// Horário semanal (dia -> lista de disciplinas por aula)
export const weekDays = [
  { key: 'seg', label: 'SEG', date: '17/08' },
  { key: 'ter', label: 'TER', date: '18/08' },
  { key: 'qua', label: 'QUA', date: '19/08' },
  { key: 'qui', label: 'QUI', date: '20/08' },
  { key: 'sex', label: 'SEX', date: '21/08' },
];

export const schedule = {
  seg: ['Português', 'Física', 'Matemática', 'Espanhol', 'Inglês', 'Filosofia', 'Sociologia', 'Química', 'Biologia'],
  ter: ['Filosofia', 'Inglês', 'Biologia', 'Sociologia', 'Física', 'Química', 'Espanhol', 'Português', 'Matemática'],
  qua: ['Matemática', 'Filosofia', 'Espanhol', 'Português', 'Sociologia', 'Biologia', 'Química', 'Inglês', 'Física'],
  qui: ['Biologia', 'Matemática', 'Física', 'Inglês', 'Português', 'Espanhol', 'Química', 'Sociologia', 'Filosofia'],
  sex: ['Física', 'Português', 'Química', 'Espanhol', 'Biologia', 'Matemática', 'Filosofia', 'Sociologia', 'Inglês'],
};

// Faltas por disciplina no mês selecionado
export const attendance = [
  { subject: 'Aprofundamento em Matemática', absences: 0 },
  { subject: 'Biologia', absences: 2 },
  { subject: 'Educação Física', absences: 0 },
  { subject: 'Estágio Curricular', absences: 0 },
  { subject: 'Filosofia', absences: 1 },
  { subject: 'Física', absences: 0 },
  { subject: 'Geografia', absences: 0 },
  { subject: 'História', absences: 0 },
  { subject: 'Horário de Estudo I', absences: 0, dividerAfter: true },
  { subject: 'Horário de Estudo II', absences: 3 },
  { subject: 'Língua Estrangeira - Espanhol', absences: 0 },
  { subject: 'Língua Estrangeira - Inglês', absences: 0 },
  { subject: 'Língua Portuguesa', absences: 0 },
];

export const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

// Turma do aluno (usada na página Minha Turma)
export const classInfo = {
  crede: 'Crede 16',
  school: school.name,
  className: 'Integrado 3ª Série | Ensino Médio | Profissional | Integral | TÉCNICO EM DESENVOLVIMENTO DE SISTEMAS',
  year: '2026',
  status: 'Letivo',
};

// Colegas de turma (nomes fictícios)
export const classmates = [
  'Amanda Felix', 'Ana Beatriz', 'Antônia Ticyane', 'Bruno Castro',
  'Camila Duarte', 'Danyelle Batista', 'Eduardo Franlin', 'Estela Garcia',
  'Fábio Lima', 'Gustavo Silva', 'Heitor Gonçalves', 'João Victor',
  'Jonas Vicente', 'Jonny Lacerda', 'Jorge Felipe', 'Kyara Duarte',
  'Letícia Silva', 'Levi Mesquita', 'Lívia Gonçalves', 'Marina Alves',
];
