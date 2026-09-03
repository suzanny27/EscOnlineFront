# Escola Estadual · Painel de gestão

Frontend em **React + Vite + Tailwind CSS**, recriando fielmente as 11 telas
do design fornecido (Tela inicial, Cadastros, Turmas, Matrículas, Notas,
Calendário letivo, Materiais, Planejamento, Relatórios, Eventos e Notícias
escolares).

## Stack

- **React 18** + **Vite 5**
- **React Router 6** (navegação entre páginas via sidebar)
- **Tailwind CSS 3** (estilização utilitária)
- **lucide-react** (ícones)

## Como rodar

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Estrutura de pastas

```
src/
  components/     # Componentes reutilizáveis (Sidebar, Topbar, tabelas, cards…)
  data/           # Dados mockados de navegação e das páginas
  pages/          # Uma página por rota (Home, Cadastros, Turmas, etc.)
  App.jsx         # Definição das rotas
  main.jsx        # Ponto de entrada
  index.css       # Diretivas Tailwind + estilos globais
```

## Atualizações desta revisão (nº 3 — funcionalidades reais)

- **Cadastros → "Novo cadastro"** agora funciona de verdade: abre
  `NovoCadastroModal` com escolha entre **Aluno** e **Professor**, fichas
  completas (dados pessoais, endereço, responsável/formação, matrícula ou
  atuação), validação de campos obrigatórios com mensagens de erro,
  cálculo automático de idade a partir da data de nascimento, botões
  Salvar/Cancelar/Limpar dados, feedback de sucesso e inclusão imediata na
  listagem via `context/CadastrosContext.jsx`. O botão "Ver ficha" abre
  `ViewFichaModal` com os dados completos do registro.
- **Planejamento → "Adicionar Item"** funciona de verdade: abre
  `AddPlanejamentoModal`, valida campos obrigatórios, salva via
  `context/PlanejamentoContext.jsx` e o item aparece imediatamente na
  listagem.
- **Calendário letivo**: o botão "Novo marco" foi removido (sem
  substituto) — a criação de evento continua acontecendo ao clicar em um
  dia do calendário. O campo de horário do formulário de evento agora usa
  um input nativo de horário (`type="time"`), com valor padrão **07:00**.
- **Notas**: adicionadas as 10 disciplinas da área comum (Física, Química,
  Biologia, História, Geografia, Filosofia, Sociologia, Literatura, Inglês,
  Espanhol) em `DISCIPLINAS_COMUNS`, disponíveis automaticamente para os 4
  cursos técnicos e os 3 anos, sem duplicar registros.
- Estrutura de anos/cursos/turmas revisada e confirmada: **3 anos × 4
  cursos técnicos = 12 turmas**, usada de forma consistente em Cadastros,
  Matrículas e Notas.

## Atualizações desta revisão (nº 2)

- **Nova aba "Informações da escola"** (`/escola`), com seção Institucional
  própria na sidebar: dados institucionais (CNPJ, INEP, contatos), endereço,
  equipe gestora, informações acadêmicas, horário de funcionamento, contatos
  e identidade/missão da escola. Botão "Editar informações" (mock).
- **Estrutura acadêmica corrigida**: a escola oferece somente **Ensino
  Médio**, com **1º, 2º e 3º ano**, cada um com os 4 cursos técnicos
  **Informática, Desenvolvimento de Sistemas (Devs), Enfermagem e
  Administração** — exatamente **12 turmas** no total (nomenclatura
  padronizada, ex.: "1º A — Informática", "2º B — Devs"). Isso está
  centralizado em `src/data/schoolData.js` e usado por todas as páginas.
- **Notas** agora segue Ano → Curso → Turma → Disciplina → Avaliação, com
  disciplinas específicas de cada curso técnico (ex.: Banco de Dados para
  Devs, Anatomia e Fisiologia para Enfermagem).
- **Matrículas** (assistente "Nova matrícula") também segue Ano → Curso →
  Turma, limitado às 12 turmas existentes.
- **"ENTIDADES DO DOMÍNIO"** foi removida visualmente de todas as páginas
  (o componente `DomainTags.jsx` permanece no código, apenas sem uso).
- Dados de Cadastros, Turmas, Matrículas, Notas, Home e Relatórios foram
  revisados para refletir a nova estrutura de forma coerente.

## Atualizações da revisão anterior (nº 1)

- **`src/data/schoolData.js`** passou a ser a fonte única de verdade: cursos,
  anos/etapas, turmas, alunos, matrículas, avaliações/notas, eventos e
  notícias — todos relacionados por id, para que a mesma informação apareça
  de forma coerente em qualquer tela.
- **Turmas** agora tem página de detalhe (`/turmas/:turmaId`) mostrando a
  trilha Escola → Curso → Ano/Etapa → Turma, professores, disciplinas e a
  lista completa de alunos (com situação e link direto para as notas).
- **Matrículas** ganhou o assistente "Nova matrícula" (`NovaMatriculaModal`),
  com fluxo dedicado para Novo aluno / Transferência / Rematrícula, seleção
  de curso → ano → turma, documentos pendentes e finalização como
  "Em análise" ou "Concluída/Pendente". Os dados ficam em
  `context/MatriculasContext.jsx`, refletindo na lista e na Home.
- **Notas** foi redesenhada com seletores em cascata (Curso → Ano → Turma →
  Disciplina → Bimestre), indicadores por avaliação (média, maior, menor,
  % acima/abaixo de 7, destaque quando 100% da turma tira a mesma nota) e
  alternância entre visão da Turma e visão por Aluno.
- **Calendário letivo** é interativo: clicar em um dia abre
  `NewEventModal` para cadastrar um evento (título, tipo, horário, local,
  público, descrição). O evento criado aparece imediatamente em
  "Marcos do mês" e como marcador no dia — via `context/EventsContext.jsx`,
  compartilhado com as páginas Eventos e Home.
- **Eventos** agora tem tom institucional (cartões com tipo, local,
  público-alvo, responsável, status e participantes), cobrindo campanhas,
  palestras, cerimônias etc.
- **Notícias** funciona como comunicação oficial: categoria, status editorial
  (Rascunho/Em revisão/Publicado), data de publicação, data relacionada e
  público-alvo.
- **Materiais** foi completamente removido (menu, rota e arquivo da página).
- **Tela inicial** reflete os novos dados: matrículas pendentes, próximos
  eventos e comunicados recentes publicados, todos linkando para as telas
  correspondentes.

## Observações de fidelidade visual

- A paleta de marca usa os quatro tons enviados: `#0058f3` (ações/botões),
  `#4a77c6` (acentos médios), `#1e478f` (textos de apoio) e a cor da
  sidebar — o valor `#250c8` enviado tem 5 dígitos (hex inválido), então foi
  normalizado para **`#25078c`** em `tailwind.config.js`. Ajuste esse valor
  ali se o tom correto for outro.
- Layout "mobile-first": a sidebar vira um menu do tipo *drawer* em telas
  `< lg` (aberto pelo ícone de menu no topo) e fica fixa em telas maiores;
  tabelas colapsam para cartões empilhados em telas `< md`.
- Todos os botões e campos possuem estados de `hover`, `active` e `focus`
  visíveis (`ring` de foco por teclado), e a preferência do sistema
  `prefers-reduced-motion` é respeitada.
- Interações mockadas com `useState`: abrir/fechar sidebar mobile, menu do
  usuário, alternância Alunos/Professores (Cadastros), alternância de
  período (Notas), navegação de mês (Calendário letivo) e busca local nas
  tabelas.
