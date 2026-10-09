import React from 'react';
import Breadcrumb from './Breadcrumb';

export default function PageHeader({ eyebrow, title, description, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
      <div className="min-w-0">
        {eyebrow && <Breadcrumb items={eyebrow.split(' / ')} />}
        <h1 className="font-display text-3xl font-medium text-brand-navy sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">{description}</p>}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-brand-900 px-4 py-2.5 font-mono text-sm font-medium uppercase text-white transition-colors hover:bg-brand-700 active:bg-brand-900"
        >
          {ActionIcon && <ActionIcon className="h-4 w-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}