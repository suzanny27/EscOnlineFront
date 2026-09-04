export function Card({ head, tag, editBtn, children, bodyClass, scroll }) {
  return (
    <div className={`card${scroll?" card-scroll":""}`}>
      <div className="card-head">
        <span>{head}</span>
        <span style={{display:"flex",gap:8,alignItems:"center"}}>
          {tag && <span className="tag">{tag}</span>}
          {editBtn}
        </span>
      </div>
      <div className={`card-body${bodyClass?" "+bodyClass:""}`}>{children}</div>
    </div>
  );
}
