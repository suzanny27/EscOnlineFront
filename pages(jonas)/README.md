# ESC Online — Painel do Responsável

Projeto React (Vite) reorganizado em múltiplos arquivos a partir do componente único original.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura de pastas

```
src/
├── App.jsx                  # Componente raiz: login, layout, navegação e roteamento de páginas
├── main.jsx                 # Ponto de entrada React (ReactDOM.createRoot)
│
├── domain/                  # Camada de domínio: dados e configuração de negócio
│   ├── schoolData.js        #   CHILDREN, COMUNICADOS, CALENDARIO_EVENTOS
│   └── nav.js                #   NAV — estrutura do menu lateral
│
├── pages/                   # Camada de páginas: uma tela (ou modal de tela) por arquivo
│   ├── PageInicio.jsx
│   ├── PageFilhos.jsx
│   ├── PageDados.jsx
│   ├── PageHorario.jsx
│   ├── PageCalendario.jsx
│   ├── PageBoletim.jsx
│   ├── PageFrequencia.jsx
│   ├── PageJustificativas.jsx
│   ├── DetalhesModal.jsx     # Modal usado dentro de PageAutorizacoes
│   ├── PageAutorizacoes.jsx
│   ├── PageComunicados.jsx
│   ├── PageCanais.jsx
│   ├── PageSugestoes.jsx
│   └── PagePrivacidade.jsx
│
├── components/               # UI compartilhada entre páginas
│   └── Card.jsx
│
└── styles/                   # Estilos globais
    └── theme.js               # CSS global (string CSS injetada via <style>)
```

## Notas da separação

- Todo o conteúdo e comportamento originais foram preservados; apenas o arquivo foi dividido e imports/exports foram adicionados.
- `domain/` reúne o que é dado/configuração de negócio (mock de alunos, comunicados, calendário letivo e a estrutura do menu), sem lógica de UI.
- `pages/` reúne exclusivamente as telas e o modal de detalhes de autorização, cada uma importando o que precisa de `domain/`, `components/` e `styles/`.
- `App.jsx` importa todas as páginas e o domínio, e monta o estado global (filho selecionado, dados do responsável, página atual etc.).
- `PageCalendario.jsx` mantém localmente as constantes `MESES_CAL`, `CAL_ANOS_DISPONIVEIS` e `CAL_ANO_LETIVO`, usadas apenas por ela (dado auxiliar de UI, não de domínio).
- `DetalhesModal.jsx` mantém localmente `DETALHE_LABELS`, usada apenas por ela, e é importada por `PageAutorizacoes.jsx`.
