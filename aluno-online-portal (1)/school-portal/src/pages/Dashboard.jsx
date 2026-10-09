import React from 'react';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="CALENDÁRIO LETIVO">
          <EmptyState message="O backend ainda não fornece eventos escolares." />
        </Card>

        <Card title="ÚLTIMAS NOTÍCIAS">
          <EmptyState message="Ainda não há notícias disponíveis." />
        </Card>

        <Card title="ÚLTIMAS NOVIDADES">
          <EmptyState message="Ainda não há novidades disponíveis." />
        </Card>

        <Card title="CANAIS DE ATENDIMENTO">
          <EmptyState message="Os canais de atendimento ainda não foram configurados." />
        </Card>
      </div>
    </div>
  );
}
