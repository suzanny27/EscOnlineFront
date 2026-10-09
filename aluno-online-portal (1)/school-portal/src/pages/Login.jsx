import React, { useState } from 'react';
import { GraduationCap, Presentation, Heart, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../components/Button';

const roles = [
  {
    key: 'aluno',
    label: 'Aluno',
    icon: GraduationCap,
    classes: 'border-slate-200 text-brand-900 hover:bg-brand-50 hover:border-brand-700',
    ring: 'focus:ring-brand-700/30 focus:border-brand-700',
    button: 'bg-brand-900 hover:bg-brand-700',
  },
  {
    key: 'professor',
    label: 'Professor',
    icon: Presentation,
    classes: 'border-slate-200 text-brand-900 hover:bg-brand-50 hover:border-brand-700',
    ring: 'focus:ring-brand-700/30 focus:border-brand-700',
    button: 'bg-brand-900 hover:bg-brand-700',
  },
  {
    key: 'responsavel',
    label: 'Responsável',
    icon: Heart,
    classes: 'border-slate-200 text-brand-900 hover:bg-brand-50 hover:border-brand-700',
    ring: 'focus:ring-brand-700/30 focus:border-brand-700',
    button: 'bg-brand-900 hover:bg-brand-700',
  },
  {
    key: 'gestao',
    label: 'Gestão escolar',
    icon: Building2,
    classes: 'border-slate-200 text-brand-900 hover:bg-brand-50 hover:border-brand-700',
    ring: 'focus:ring-brand-700/30 focus:border-brand-700',
    button: 'bg-brand-900 hover:bg-brand-700',
  },
];

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(selectedRole, username.trim());
  }

  const role = roles.find((r) => r.key === selectedRole);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: '#010120',
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 px-1">
          <GraduationCap size={22} className="text-accent-mint" />
          <span className="font-bold text-white">ESC Online</span>
        </div>

        <div className="bg-white rounded-xl2 border border-white/10 shadow-card-hover p-7 sm:p-8">
          {!selectedRole ? (
            <>
              <h1 className="text-xl font-bold text-slate-800 mb-1">Quem está acessando?</h1>
              <p className="text-sm text-slate-400 mb-6">Escolha seu perfil pra continuar.</p>

              <div className="space-y-2.5">
                {roles.map(({ key, label, icon: Icon, classes }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(key)}
                    className={`w-full flex items-center justify-between gap-3 bg-white border-2 rounded-xl px-4 py-3.5 font-semibold text-sm transition-colors duration-150 ${classes}`}
                  >
                    <span className="flex items-center gap-3 whitespace-normal text-left">
                      <Icon size={18} className="shrink-0" />
                      {label}
                    </span>
                    <ChevronRight size={16} className="shrink-0 opacity-60" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 mb-1"
              >
                <ChevronLeft size={14} />
                Voltar
              </button>

              <div>
                <h1 className="text-xl font-bold text-slate-800">Entrar como {role.label.toLowerCase()}</h1>
                <p className="text-sm text-slate-400 mt-0.5">Digite seus dados de acesso.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1" htmlFor="username">
                  Usuário ou matrícula
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${role.ring}`}
                  placeholder="Digite sua matrícula"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${role.ring}`}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full text-white font-semibold py-2.5 rounded-lg transition-colors ${role.button}`}
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
