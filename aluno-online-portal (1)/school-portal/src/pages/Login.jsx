import React, { useState } from 'react';
import { GraduationCap, Presentation, Users2, School, ChevronRight } from 'lucide-react';
import Button from '../components/Button';

const roles = [
  { key: 'aluno', label: 'Aluno', icon: GraduationCap },
  { key: 'professor', label: 'Professor', icon: Presentation },
  { key: 'responsavel', label: 'Responsável', icon: Users2 },
  { key: 'gestao', label: 'Gestão escolar', icon: School },
];

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(selectedRole);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl2 shadow-card-hover overflow-hidden grid md:grid-cols-2">
        {/* Painel esquerdo */}
        <div className="bg-brand-900 text-white p-10 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-0 left-0 w-24 h-24 rounded-br-[3rem] bg-white/5" />

          <div className="relative z-10">
            <GraduationCap size={32} className="text-brand-400 mb-6" />
            <h2 className="text-3xl font-extrabold mb-3 leading-tight">
              Bem-vindo de volta
            </h2>
            <p className="text-white/70 leading-relaxed">
              Acesse sua conta e continue de onde parou — notas, faltas e
              atividades em um só lugar.
            </p>
          </div>
        </div>

        {/* Painel direito */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {!selectedRole ? (
            <>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                Como você quer entrar?
              </h3>
              <p className="text-sm text-slate-400 mb-7">
                Escolha seu perfil para continuar
              </p>

              <div className="space-y-3">
                {roles.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(key)}
                    className="w-full flex items-center justify-between gap-3 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-400 rounded-xl px-5 py-4 transition-all duration-150 group"
                  >
                    <span className="flex items-center gap-3 font-semibold text-slate-700">
                      <span className="w-9 h-9 rounded-full bg-brand-50 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors">
                        <Icon size={18} className="text-brand-500" />
                      </span>
                      {label}
                    </span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-400 transition-colors" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Entrar</h3>
                <p className="text-sm text-slate-400">
                  Como <span className="font-semibold text-brand-500">{roles.find(r => r.key === selectedRole)?.label}</span>
                </p>
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
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
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
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
