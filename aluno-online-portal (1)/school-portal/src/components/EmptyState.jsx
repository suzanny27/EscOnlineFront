import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  message = 'Nada por aqui ainda',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
        <Icon size={22} strokeWidth={1.5} className="text-slate-400" />
      </div>
      <p className="text-sm font-semibold text-slate-700">{message}</p>
      {description && (
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{description}</p>
      )}
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 text-xs font-semibold text-brand-action hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
