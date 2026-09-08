import { Plus } from 'lucide-react';
import PageHeader from './PageHeader.jsx';
import RecentItemsTable from './RecentItemsTable.jsx';
import FooterStats from './FooterStats.jsx';

// Observação: o parâmetro `tags` (entidades do domínio) é aceito por
// compatibilidade com quem chama este componente, mas não é mais exibido
// visualmente — a seção "ENTIDADES DO DOMÍNIO" foi removida da interface.
export default function ListPage({
  eyebrow,
  title,
  description,
  actionLabel = 'Adicionar Item',
  tableColumns,
  rows,
  footerStats,
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actionLabel={actionLabel}
        actionIcon={Plus}
        onAction={() => alert(`Ação "${actionLabel}" ainda não implementada neste protótipo.`)}
      />
      <RecentItemsTable columns={tableColumns} rows={rows} />
      <FooterStats items={footerStats} />
    </>
  );
}
