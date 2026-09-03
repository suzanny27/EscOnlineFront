export default function PageHeader({ eyebrow, title, description, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-mid">{eyebrow}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-brand-navy sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">{description}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-action px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          {ActionIcon && <ActionIcon className="h-4 w-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
