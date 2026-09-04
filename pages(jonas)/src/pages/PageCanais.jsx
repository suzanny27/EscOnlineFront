export function PageCanais() {
  const canais = [
    {ic:"📷",nome:"Instagram",sub:"@secretariaeducacao"},
    {ic:"📘",nome:"Facebook",sub:"Secretaria Municipal de Educação"},
    {ic:"✉️",nome:"E-mail",sub:"secretaria@educacao.gov.br"},
    {ic:"💬",nome:"Chat online",sub:"Disponível de seg. a sex., das 8h às 17h"},
  ];
  return (
    <>
      <h2 className="page-title">Canais de Atendimento</h2>
      <p className="page-subtitle">Você pode utilizar todos os canais abaixo para dialogar e interagir com a Secretaria da Educação.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
        {canais.map(c=>(
          <a key={c.nome} href="#" className="channel-card">
            <span className="channel-ic">{c.ic}</span>
            <div><div className="channel-name">{c.nome}</div><div className="channel-sub">{c.sub}</div></div>
          </a>
        ))}
      </div>
    </>
  );
}

