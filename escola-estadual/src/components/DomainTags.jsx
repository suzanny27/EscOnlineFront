export default function DomainTags({ tags }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5">
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        Entidades do domínio
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-brand-action/10 px-3 py-1 text-xs font-medium text-brand-action"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
