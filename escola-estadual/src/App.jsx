import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import { EventsProvider } from './context/EventsContext.jsx';
import { MatriculasProvider } from './context/MatriculasContext.jsx';
import { CadastrosProvider } from './context/CadastrosContext.jsx';
import { PlanejamentoProvider } from './context/PlanejamentoContext.jsx';
import Home from './pages/Home.jsx';
import Cadastros from './pages/Cadastros.jsx';
import Turmas from './pages/Turmas.jsx';
import TurmaDetail from './pages/TurmaDetail.jsx';
import Matriculas from './pages/Matriculas.jsx';
import Notas from './pages/Notas.jsx';
import CalendarioLetivo from './pages/CalendarioLetivo.jsx';
import Planejamento from './pages/Planejamento.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Eventos from './pages/Eventos.jsx';
import Noticias from './pages/Noticias.jsx';
import InformacoesEscola from './pages/InformacoesEscola.jsx';

export default function App() {
  return (
    // Providers globais: eventos (Calendário ↔ Eventos ↔ Home), matrículas
    // (assistente "Nova matrícula" ↔ lista ↔ indicadores da Home), cadastros
    // (Novo cadastro de Aluno/Professor ↔ listagem) e planejamento
    // (Adicionar Item ↔ listagem).
    <EventsProvider>
      <MatriculasProvider>
        <CadastrosProvider>
          <PlanejamentoProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cadastros" element={<Cadastros />} />
                <Route path="/turmas" element={<Turmas />} />
                <Route path="/turmas/:turmaId" element={<TurmaDetail />} />
                <Route path="/matriculas" element={<Matriculas />} />
                <Route path="/notas" element={<Notas />} />
                <Route path="/calendario" element={<CalendarioLetivo />} />
                <Route path="/planejamento" element={<Planejamento />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/escola" element={<InformacoesEscola />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </PlanejamentoProvider>
        </CadastrosProvider>
      </MatriculasProvider>
    </EventsProvider>
  );
}
