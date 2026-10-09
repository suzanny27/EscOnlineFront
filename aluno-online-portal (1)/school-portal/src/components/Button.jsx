import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-mono font-medium rounded-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none uppercase';

  const variants = {
    primary:
      'bg-brand-900 text-white hover:bg-brand-700 active:bg-brand-900',
    outline:
      'border border-black/10 text-brand-900 bg-white hover:bg-slate-100 active:bg-slate-100',
    ghost:
      'text-brand-900 hover:bg-slate-100 active:bg-slate-100',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}
