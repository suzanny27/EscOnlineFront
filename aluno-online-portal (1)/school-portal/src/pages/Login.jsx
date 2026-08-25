import React, { useState } from 'react';
import { GraduationCap, Presentation, Users2, ChevronRight } from 'lucide-react';
import Button from '../components/Button';

const roles = [
  { key: 'aluno', label: 'ALUNO', icon: GraduationCap },
  { key: 'professor', label: 'PROFESSOR', icon: Presentation },
  { key: 'responsavel', label: 'RESPONSÁVEL', icon: Users2 },
];

/**
 * Tela de login inicial. Ao escolher um perfil, o formulário de
 * usuário/senha correspondente é revelado (useState controla a seleção).
 */
export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Mock: qualquer usuário/senha preenchidos avança para o dashboard
    onLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl2 shadow-card-hover overflow-hidden grid md:grid-cols-2">
        {/* Painel lateral de boas-vindas */}
        <div className="bg-brand-900 text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-brand-700/40" />
          <div className="absolute top-10 -right-10 w-32 h-32 rounded-full bg-brand-400/30" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-3">Bem-vindo de volta</h2>
            <p className="text-white/80">Acesse sua conta agora e continue de onde parou.</p>
          </div>
        </div>

        {/* Formulário */}
        <div className="p-8 md:p-10">
          <h3 className="text-xl font-bold text-brand-900 mb-6">Tela de Login</h3>

          {!selectedRole ? (
            <div className="space-y-3">
              {roles.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key)}
                  className="w-full flex items-center justify-between gap-3 bg-slate-100 hover:bg-brand-50 active:bg-brand-50 border border-transparent hover:border-brand-400 rounded-xl px-5 py-4 transition-all duration-150"
                >
                  <span className="flex items-center gap-3 font-semibold text-slate-700">
                    <Icon size={20} className="text-brand-400" />
                    {label}
                  </span>
                  <ChevronRight size={18} className="text-slate-400" />
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-500">
                Entrando como <span className="font-bold text-brand-700 uppercase">{selectedRole}</span>
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1" htmlFor="username">
                  Usuário ou matrícula
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => setSelectedRole(null)}>
                  Voltar
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Entrar
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
