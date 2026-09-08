import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import RecentItemsTable from '../components/RecentItemsTable.jsx';
import FooterStats from '../components/FooterStats.jsx';
import AddPlanejamentoModal from '../components/AddPlanejamentoModal.jsx';
import { usePlanejamento } from '../context/PlanejamentoContext.jsx';
import { DEFAULT_FOOTER_STATS } from '../data/pages.js';

export default function Planejamento() {
  const { itens, addItem } = usePlanejamento();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Acompanhamento / Planejamento"
        title="Planejamento"
        description="Transforme intenções pedagógicas em próximos passos claros."
        actionLabel="Adicionar Item"
        actionIcon={Plus}
        onAction={() => setModalOpen(true)}
      />

      <RecentItemsTable
        columns={['Registro', 'Contexto', 'Responsável / Local', 'Status', 'Ação']}
        rows={itens}
      />

      <FooterStats items={DEFAULT_FOOTER_STATS} />

      {modalOpen && (
        <AddPlanejamentoModal
          onClose={() => setModalOpen(false)}
          onSave={(item) => addItem(item)}
        />
      )}
    </>
  );
}
