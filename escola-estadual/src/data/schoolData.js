// =============================================================================
// MODELO DE DADOS CENTRAL (mock) — fonte única de verdade da escola.
//
// A escola oferece SOMENTE Ensino Médio, com 3 anos (1º, 2º, 3º) e 4 cursos
// técnicos por ano (Informática, Desenvolvimento de Sistemas, Enfermagem e
// Administração), totalizando exatamente 12 turmas. Todas as páginas leem
// deste arquivo para garantir que Turmas, Alunos, Matrículas, Notas, Eventos
// e Notícias estejam sempre coerentes entre si.
// =============================================================================

// ---------------------------------------------------------------------------
// ETAPA / CURSOS (trilhas técnicas do Ensino Médio)
// ---------------------------------------------------------------------------
export const ETAPA = 'Ensino Médio';

export const ANOS = ['1º ano', '2º ano', '3º ano'];

export const CURSOS = [
  { id: 'info', nome: 'Informática', letra: 'A' },
  { id: 'devs', nome: 'Desenvolvimento de Sistemas', apelido: 'Devs', letra: 'B' },
  { id: 'enf', nome: 'Enfermagem', letra: 'C' },
  { id: 'adm', nome: 'Administração', letra: 'D' },
];

export function getCurso(cursoId) {
  return CURSOS.find((c) => c.id === cursoId) ?? null;
}

// ---------------------------------------------------------------------------
// DISCIPLINAS — um núcleo comum a todos os cursos + disciplinas técnicas
// específicas de cada curso.
// ---------------------------------------------------------------------------
export const DISCIPLINAS_COMUNS = [
  'Língua Portuguesa',
  'Matemática',
  'Educação Física',
  'Física',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Filosofia',
  'Sociologia',
  'Literatura',
  'Inglês',
  'Espanhol',
];

export const DISCIPLINAS_POR_CURSO = {
  info: ['Lógica de Programação', 'Redes de Computadores', 'Manutenção de Computadores'],
  devs: ['Banco de Dados', 'Programação Web', 'Estrutura de Dados'],
  enf: ['Anatomia e Fisiologia', 'Farmacologia', 'Primeiros Socorros'],
  adm: ['Contabilidade Básica', 'Marketing', 'Gestão de Pessoas'],
};

export function getDisciplinasDoCurso(cursoId) {
  return [...DISCIPLINAS_COMUNS, ...(DISCIPLINAS_POR_CURSO[cursoId] ?? [])];
}

// Professor(a) coordenador(a) técnico de cada curso + um professor de núcleo
// comum, reaproveitado nos 3 anos daquele curso.
const PROFESSOR_TECNICO = {
  info: 'Prof. Rafael Souza',
  devs: 'Prof.ª Carla Mendes',
  enf: 'Prof. André Lima',
  adm: 'Prof.ª Fernanda Duarte',
};
const PROFESSOR_NUCLEO_COMUM = 'Prof.ª Helena Martins';

// ---------------------------------------------------------------------------
// TURMAS — exatamente 12: 3 anos × 4 cursos.
// id: "<ano>-<cursoId>" (ex.: "1-info"); nome: "1º A — Informática"
// ---------------------------------------------------------------------------
export const TURMAS = ANOS.flatMap((anoLabel, anoIndex) => {
  const anoNum = anoIndex + 1;
  return CURSOS.map((curso) => ({
    id: `${anoNum}-${curso.id}`,
    nome: `${anoNum}º ${curso.letra} — ${curso.apelido ?? curso.nome}`,
    cursoId: curso.id,
    ano: anoLabel,
    anoNum,
    etapa: ETAPA,
    professores: [PROFESSOR_TECNICO[curso.id], PROFESSOR_NUCLEO_COMUM],
    disciplinas: getDisciplinasDoCurso(curso.id),
    status: 'Ativa',
  }));
});

export function getTurma(turmaId) {
  return TURMAS.find((t) => t.id === turmaId) ?? null;
}
export function getTurmasDoAno(anoLabel) {
  return TURMAS.filter((t) => t.ano === anoLabel);
}
export function getTurmasDoCurso(cursoId) {
  return TURMAS.filter((t) => t.cursoId === cursoId);
}

// ---------------------------------------------------------------------------
// ALUNOS — distribuídos entre as 12 turmas (turmaId liga o aluno à turma;
// matriculaId liga o aluno à matrícula correspondente).
// ---------------------------------------------------------------------------
export const ALUNOS = [
  { id: 'AR', nome: 'Ana Clara Ribeiro', turmaId: '1-info', matriculaId: 'MAT-1042', situacao: 'Ativo', dataNascimento: '12/03/2010', responsavel: 'Fernanda Ribeiro' },
  { id: 'MO', nome: 'Mariana Oliveira', turmaId: '1-info', matriculaId: 'MAT-1043', situacao: 'Ativo', dataNascimento: '05/07/2010', responsavel: 'Carlos Oliveira' },

  { id: 'PC', nome: 'Pedro Cardoso', turmaId: '1-devs', matriculaId: 'MAT-1044', situacao: 'Ativo', dataNascimento: '19/01/2010', responsavel: 'Sandra Cardoso' },
  { id: 'LF', nome: 'Laura Ferreira', turmaId: '1-devs', matriculaId: 'MAT-1045', situacao: 'Ativo', dataNascimento: '02/11/2009', responsavel: 'Marcos Ferreira' },

  { id: 'MC2', nome: 'Mateus Correia', turmaId: '1-enf', matriculaId: 'MAT-1053', situacao: 'Ativo', dataNascimento: '09/02/2010', responsavel: 'Patrícia Correia' },
  { id: 'SN', nome: 'Sofia Nunes', turmaId: '1-enf', matriculaId: 'MAT-1047', situacao: 'Em análise', dataNascimento: '21/10/2010', responsavel: 'Ricardo Nunes' },

  { id: 'IM', nome: 'Isabela Martins', turmaId: '1-adm', matriculaId: 'MAT-1051', situacao: 'Pendente', dataNascimento: '08/04/2010', responsavel: 'André Martins' },

  { id: 'JS', nome: 'João Pedro Santos', turmaId: '2-info', matriculaId: 'MAT-1046', situacao: 'Ativo', dataNascimento: '23/02/2009', responsavel: 'Renata Santos' },

  { id: 'GS', nome: 'Gustavo Silva', turmaId: '2-devs', matriculaId: 'MAT-1050', situacao: 'Ativo', dataNascimento: '30/09/2009', responsavel: 'Juliana Silva' },
  { id: 'BC', nome: 'Beatriz Costa', turmaId: '2-devs', matriculaId: 'MAT-1049', situacao: 'Ativo', dataNascimento: '14/06/2009', responsavel: 'Paulo Costa' },

  { id: 'RT', nome: 'Rafaela Teixeira', turmaId: '2-enf', matriculaId: 'MAT-1052', situacao: 'Ativo', dataNascimento: '11/12/2009', responsavel: 'Eduardo Teixeira' },

  { id: 'CD', nome: 'Camila Duarte', turmaId: '2-adm', matriculaId: 'MAT-1054', situacao: 'Ativo', dataNascimento: '27/05/2009', responsavel: 'Marcelo Duarte' },

  { id: 'LA', nome: 'Lucas Almeida', turmaId: '3-info', matriculaId: 'MAT-1041', situacao: 'Pendente', dataNascimento: '17/05/2008', responsavel: 'Camila Almeida' },

  { id: 'DR', nome: 'Daniel Rocha', turmaId: '3-devs', matriculaId: 'MAT-1048', situacao: 'Pendente', dataNascimento: '25/08/2008', responsavel: 'Vanessa Rocha' },

  { id: 'VH', nome: 'Vitor Hugo Alves', turmaId: '3-enf', matriculaId: 'MAT-1055', situacao: 'Ativo', dataNascimento: '03/07/2008', responsavel: 'Simone Alves' },

  { id: 'LP', nome: 'Larissa Prado', turmaId: '3-adm', matriculaId: 'MAT-1056', situacao: 'Ativo', dataNascimento: '15/09/2008', responsavel: 'Roberto Prado' },
];

export function getAlunosDaTurma(turmaId) {
  return ALUNOS.filter((a) => a.turmaId === turmaId);
}
export function getAluno(alunoId) {
  return ALUNOS.find((a) => a.id === alunoId) ?? null;
}

// ---------------------------------------------------------------------------
// MATRÍCULAS
// tipo: 'Nova' | 'Rematrícula' | 'Transferência'
// ---------------------------------------------------------------------------
export const MATRICULAS = [
  {
    id: 'MAT-1041',
    aluno: 'Lucas Almeida',
    alunoId: 'LA',
    tipo: 'Rematrícula',
    cursoId: 'info',
    ano: '3º ano',
    turmaId: '3-info',
    status: 'Pendente',
    documentosPendentes: ['Comprovante de residência atualizado'],
    escolaOrigem: null,
  },
  {
    id: 'MAT-1047',
    aluno: 'Sofia Nunes',
    alunoId: 'SN',
    tipo: 'Nova',
    cursoId: 'enf',
    ano: '1º ano',
    turmaId: '1-enf',
    status: 'Em análise',
    documentosPendentes: ['Conferência final da documentação'],
    escolaOrigem: null,
  },
  {
    id: 'MAT-1048',
    aluno: 'Daniel Rocha',
    alunoId: 'DR',
    tipo: 'Transferência',
    cursoId: 'devs',
    ano: '3º ano',
    turmaId: '3-devs',
    status: 'Pendente',
    documentosPendentes: ['Histórico escolar da escola de origem'],
    escolaOrigem: 'E.E. Prof. Carlos Drummond',
  },
  {
    id: 'MAT-1049',
    aluno: 'Beatriz Costa',
    alunoId: 'BC',
    tipo: 'Rematrícula',
    cursoId: 'devs',
    ano: '2º ano',
    turmaId: '2-devs',
    status: 'Concluída',
    documentosPendentes: [],
    escolaOrigem: null,
  },
  {
    id: 'MAT-1051',
    aluno: 'Isabela Martins',
    alunoId: 'IM',
    tipo: 'Transferência',
    cursoId: 'adm',
    ano: '1º ano',
    turmaId: '1-adm',
    status: 'Pendente',
    documentosPendentes: ['Histórico escolar', 'Declaração de transferência'],
    escolaOrigem: 'Colégio Municipal Ipê Amarelo',
  },
  {
    id: 'MAT-1054',
    aluno: 'Camila Duarte',
    alunoId: 'CD',
    tipo: 'Nova',
    cursoId: 'adm',
    ano: '2º ano',
    turmaId: '2-adm',
    status: 'Concluída',
    documentosPendentes: [],
    escolaOrigem: null,
  },
];

// ---------------------------------------------------------------------------
// NOTAS / AVALIAÇÕES
// Cada avaliação guarda as notas por aluno (mapa alunoId -> nota 0-10).
// ---------------------------------------------------------------------------
export const AVALIACOES = [
  {
    id: 'AV-01',
    titulo: 'Prova de Lógica de Programação',
    turmaId: '1-info',
    disciplina: 'Lógica de Programação',
    bimestre: '2º bimestre',
    data: '18/08/2026',
    // Exemplo citado no pedido: 100% da turma tirou 10.
    notas: { AR: 10, MO: 10 },
  },
  {
    id: 'AV-02',
    titulo: 'Avaliação do 2º bimestre — Anatomia',
    turmaId: '1-enf',
    disciplina: 'Anatomia e Fisiologia',
    bimestre: '2º bimestre',
    data: '14/08/2026',
    notas: { MC2: 8, SN: 7 },
  },
  {
    id: 'AV-03',
    titulo: 'Prova Bimestral de Banco de Dados',
    turmaId: '2-devs',
    disciplina: 'Banco de Dados',
    bimestre: '2º bimestre',
    data: '20/08/2026',
    notas: { GS: 9, BC: 8.5 },
  },
  {
    id: 'AV-04',
    titulo: 'Prova de Redes de Computadores',
    turmaId: '2-info',
    disciplina: 'Redes de Computadores',
    bimestre: '2º bimestre',
    data: '19/08/2026',
    notas: { JS: 7 },
  },
  {
    id: 'AV-05',
    titulo: 'Avaliação de Marketing',
    turmaId: '3-adm',
    disciplina: 'Marketing',
    bimestre: '2º bimestre',
    data: '17/08/2026',
    notas: { LP: 9 },
  },
  {
    id: 'AV-06',
    titulo: 'Prova de Estrutura de Dados',
    turmaId: '3-devs',
    disciplina: 'Estrutura de Dados',
    bimestre: '2º bimestre',
    data: '21/08/2026',
    notas: { DR: 6 },
  },
  {
    id: 'AV-07',
    titulo: 'Redação dissertativa · Língua Portuguesa',
    turmaId: '1-devs',
    disciplina: 'Língua Portuguesa',
    bimestre: '2º bimestre',
    data: '12/08/2026',
    notas: { PC: 8, LF: 9 },
  },
  {
    id: 'AV-08',
    titulo: 'Prova de Primeiros Socorros',
    turmaId: '3-enf',
    disciplina: 'Primeiros Socorros',
    bimestre: '2º bimestre',
    data: '13/08/2026',
    notas: { VH: 8 },
  },
];

export function getAvaliacoesDaTurma(turmaId) {
  return AVALIACOES.filter((a) => a.turmaId === turmaId);
}

// Calcula estatísticas de uma avaliação: média, maior, menor, % acima/abaixo de 7
export function getEstatisticasAvaliacao(avaliacao) {
  const valores = Object.values(avaliacao.notas);
  const total = valores.length;
  const soma = valores.reduce((acc, v) => acc + v, 0);
  const media = total ? soma / total : 0;
  const maior = total ? Math.max(...valores) : 0;
  const menor = total ? Math.min(...valores) : 0;
  const acima = valores.filter((v) => v >= 7).length;
  const percentualAcima = total ? Math.round((acima / total) * 100) : 0;
  const percentualAbaixo = 100 - percentualAcima;
  const todosMesmaNota = total > 0 && valores.every((v) => v === valores[0]);
  return {
    total,
    media: Number(media.toFixed(1)),
    maior,
    menor,
    percentualAcima,
    percentualAbaixo,
    todosMesmaNota,
    notaComum: todosMesmaNota ? valores[0] : null,
  };
}

// ---------------------------------------------------------------------------
// EVENTOS (institucionais) — usados em Eventos, Calendário letivo e Home.
// ---------------------------------------------------------------------------
export const TIPOS_EVENTO = [
  'Reunião institucional',
  'Palestra',
  'Campanha de conscientização',
  'Evento cultural',
  'Atividade esportiva',
  'Viagem / excursão',
  'Projeto escolar',
  'Cerimônia',
  'Dia de prova',
  'Olimpíada',
  'Recesso escolar',
  'Formação de professores',
];

export const EVENTOS_INICIAIS = [
  {
    id: 'EVT-01',
    titulo: 'Reunião de conselho de classe',
    tipo: 'Reunião institucional',
    data: '2026-08-28',
    horario: '14:00',
    local: 'Sala dos professores',
    publico: 'Corpo docente',
    responsavel: 'Coordenação pedagógica',
    descricao: 'Avaliação do desempenho das turmas no 2º bimestre e definição de encaminhamentos.',
    status: 'Confirmado',
    participantes: 22,
  },
  {
    id: 'EVT-02',
    titulo: 'Feira de profissões e inovação',
    tipo: 'Projeto escolar',
    data: '2026-09-02',
    horario: '08:30',
    local: 'Pátio central',
    publico: 'Todas as turmas do Ensino Médio',
    responsavel: 'Coordenação dos cursos técnicos',
    descricao: 'Exposição de projetos dos 4 cursos técnicos desenvolvidos pelos alunos ao longo do bimestre.',
    status: 'Confirmado',
    participantes: 120,
  },
  {
    id: 'EVT-03',
    titulo: 'Encontro com responsáveis',
    tipo: 'Reunião institucional',
    data: '2026-09-06',
    horario: '18:30',
    local: 'Auditório',
    publico: 'Famílias e responsáveis',
    responsavel: 'Equipe gestora',
    descricao: 'Apresentação dos resultados do 2º bimestre e alinhamento sobre o calendário letivo.',
    status: 'Em divulgação',
    participantes: null,
  },
  {
    id: 'EVT-04',
    titulo: 'Campanha Agosto Lilás',
    tipo: 'Campanha de conscientização',
    data: '2026-08-20',
    horario: '09:00',
    local: 'Pátio central e salas de aula',
    publico: 'Toda a comunidade escolar',
    responsavel: 'Equipe de orientação educacional',
    descricao: 'Ações de conscientização sobre o enfrentamento à violência contra a mulher.',
    status: 'Concluído',
    participantes: 350,
  },
  {
    id: 'EVT-05',
    titulo: 'Palestra sobre Consciência Negra',
    tipo: 'Palestra',
    data: '2026-08-15',
    horario: '10:00',
    local: 'Auditório',
    publico: 'Todas as turmas do Ensino Médio',
    responsavel: 'Coordenação pedagógica',
    descricao: 'Palestra e roda de conversa sobre história e cultura afro-brasileira.',
    status: 'Confirmado',
    participantes: 140,
  },
  {
    id: 'EVT-06',
    titulo: 'Campanha de doação de sangue',
    tipo: 'Campanha de conscientização',
    data: '2026-09-16',
    horario: '08:00',
    local: 'Quadra coberta',
    publico: 'Professores, funcionários e responsáveis',
    responsavel: 'Grêmio estudantil',
    descricao: 'Parceria com o hemocentro municipal para coleta de doações. Curso de Enfermagem apoia a organização.',
    status: 'Planejado',
    participantes: null,
  },
];

// ---------------------------------------------------------------------------
// NOTÍCIAS ESCOLARES (comunicação oficial)
// status: 'Rascunho' | 'Em revisão' | 'Publicado'
// ---------------------------------------------------------------------------
export const NOTICIAS_INICIAIS = [
  {
    id: 'NOT-01',
    titulo: 'Resultados da avaliação diagnóstica',
    categoria: 'Resultado de avaliações',
    dataPublicacao: '26/08/2026',
    dataRelacionada: null,
    resumo: 'Divulgado o panorama geral de desempenho da avaliação diagnóstica aplicada nos 4 cursos técnicos.',
    publico: 'Famílias e responsáveis',
    status: 'Publicado',
  },
  {
    id: 'NOT-02',
    titulo: 'Datas da Olimpíada de Informática 2026',
    categoria: 'Olimpíadas escolares',
    dataPublicacao: '24/08/2026',
    dataRelacionada: '10/09/2026',
    resumo: 'Inscrições abertas para a fase escolar da Olimpíada de Informática, aberta a todos os cursos.',
    publico: 'Alunos do Ensino Médio',
    status: 'Publicado',
  },
  {
    id: 'NOT-03',
    titulo: 'Escola abre inscrições para Feira de Profissões',
    categoria: 'Eventos próximos',
    dataPublicacao: '22/08/2026',
    dataRelacionada: '02/09/2026',
    resumo: 'Alunos interessados em apresentar projetos podem se inscrever até 28/08 na coordenação de curso.',
    publico: 'Todas as turmas do Ensino Médio',
    status: 'Publicado',
  },
  {
    id: 'NOT-04',
    titulo: 'Novos equipamentos chegam ao laboratório de Informática',
    categoria: 'Novos materiais e equipamentos',
    dataPublicacao: '18/08/2026',
    dataRelacionada: null,
    resumo: '15 novos computadores foram instalados no laboratório para as aulas de Lógica de Programação e Redes.',
    publico: 'Toda a comunidade escolar',
    status: 'Em revisão',
  },
  {
    id: 'NOT-05',
    titulo: 'Lembrete: provas bimestrais na próxima semana',
    categoria: 'Lembrete de provas',
    dataPublicacao: '25/08/2026',
    dataRelacionada: '01/09/2026',
    resumo: 'Confira o cronograma de avaliações do 2º bimestre por turma no calendário letivo.',
    publico: 'Alunos e responsáveis',
    status: 'Publicado',
  },
  {
    id: 'NOT-06',
    titulo: 'Recesso escolar: orientações',
    categoria: 'Alterações no calendário',
    dataPublicacao: '14/08/2026',
    dataRelacionada: '20/10/2026',
    resumo: 'Orientações sobre o período de recesso escolar e retorno às aulas.',
    publico: 'Toda a comunidade escolar',
    status: 'Publicado',
  },
];

// ---------------------------------------------------------------------------
// INFORMAÇÕES INSTITUCIONAIS DA ESCOLA
// ---------------------------------------------------------------------------
export const ESCOLA_INFO = {
  dadosInstitucionais: {
    nomeCompleto: 'Escola Estadual de Educação Profissional Professora Lúcia de Almeida',
    nomeAbreviado: 'E.E.E.P. Lúcia de Almeida',
    cnpj: '12.345.678/0001-90',
    inep: '23045678',
    tipoInstituicao: 'Escola pública estadual · Ensino Médio Técnico',
    redeEnsino: 'Rede estadual de ensino',
    anoLetivoAtual: '2026',
    email: 'contato@eeeplucia.edu.br',
    telefonePrincipal: '(85) 3234-5678',
    telefoneSecundario: '(85) 98765-4321',
    site: 'www.eeeplucia.edu.br',
  },
  endereco: {
    cep: '60000-000',
    estado: 'Ceará',
    cidade: 'Pacatuba',
    bairro: 'Centro',
    rua: 'Rua Professora Lúcia de Almeida',
    numero: '450',
    complemento: 'Próximo à praça central',
    referencia: 'Em frente ao Fórum Municipal',
  },
  equipeGestora: [
    { cargo: 'Diretora', nome: 'Marina Costa', email: 'marina.costa@eeeplucia.edu.br', ramal: 'Ramal 101' },
    { cargo: 'Vice-diretor', nome: 'Eduardo Nakamura', email: 'eduardo.nakamura@eeeplucia.edu.br', ramal: 'Ramal 102' },
    { cargo: 'Coordenadora pedagógica', nome: 'Helena Martins', email: 'helena.martins@eeeplucia.edu.br', ramal: 'Ramal 103' },
    { cargo: 'Coordenador administrativo', nome: 'Rafael Souza', email: 'rafael.souza@eeeplucia.edu.br', ramal: 'Ramal 104' },
    { cargo: 'Secretária escolar', nome: 'Patrícia Correia', email: 'secretaria@eeeplucia.edu.br', ramal: 'Ramal 105' },
  ],
  academico: {
    modalidades: ['Ensino Médio Técnico Integrado'],
    cursos: CURSOS.map((c) => c.nome),
    quantidadeAlunos: 384,
    quantidadeProfessores: 34,
    quantidadeTurmas: TURMAS.length,
    turnos: ['Manhã', 'Tarde'],
    anoLetivo: '2026',
  },
  horarioFuncionamento: {
    manha: '07:00 às 12:10',
    tarde: '13:00 às 18:10',
    noite: null,
    diasFuncionamento: 'Segunda a sexta-feira',
    secretaria: '07:00 às 17:00',
  },
  contatos: {
    emailSecretaria: 'secretaria@eeeplucia.edu.br',
    telefoneSecretaria: '(85) 3234-5678',
    emailDirecao: 'direcao@eeeplucia.edu.br',
    canalOficial: 'Aplicativo oficial da escola e mural na secretaria',
    redesSociais: '@eeeplucia',
  },
  identidade: {
    nomeExibicao: 'Escola Estadual Professora Lúcia de Almeida',
    descricao:
      'Escola pública estadual de Ensino Médio integrado à educação profissional, formando técnicos nas áreas de Informática, Desenvolvimento de Sistemas, Enfermagem e Administração.',
    missao:
      'Oferecer educação pública de qualidade, unindo formação geral e técnica, para preparar os estudantes para o mundo do trabalho e para a vida cidadã.',
  },
};
