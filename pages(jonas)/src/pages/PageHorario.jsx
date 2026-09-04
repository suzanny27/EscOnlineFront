import { Card } from "../components/Card";

export function PageHorario({ child }) {
  return (
    <>
      <h2 className="page-title">Horário — {child.name}</h2>
      <p className="page-subtitle">{child.turma} · {child.turno} · Ano letivo 2026</p>
      <Card head="GRADE SEMANAL DE AULAS">
        <div className="table-scroll no-vscroll">
          <table className="data-table">
            <thead><tr><th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th></tr></thead>
            <tbody>
              {child.horario.map((row, i) =>
                row.breakRow
                  ? <tr key={i} className="break-row"><td colSpan={6}>{row.breakRow}</td></tr>
                  : <tr key={i}>
                      <td className="mono">{row.time}</td>
                      {row.cells.map((c, j) => (
                        <td key={j} className="subject-cell">
                          <b>{c.s}</b><span>{c.p}</span>
                          {c.room && <span className="room-tag">{c.room}</span>}
                        </td>
                      ))}
                    </tr>
              )}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:"11.5px",color:"var(--muted)",marginTop:14}}>{child.horarioNota}</p>
      </Card>
    </>
  );
}

