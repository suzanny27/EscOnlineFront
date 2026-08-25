import React from 'react';
import { Instagram, Facebook, Mail, MessageCircle } from 'lucide-react';
import Card from '../components/Card';
import { calendarEvents, news, latestPosts } from '../data/mockData';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];
const contactLinks = [
  { icon: Mail, label: 'E-mail', href: '#' },
  { icon: MessageCircle, label: 'Chat', href: '#' },
];

export default function Dashboard() {
  const today = calendarEvents[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendário Letivo */}
        <Card title="CALENDÁRIO LETIVO">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center bg-brand-50 text-brand-900 rounded-xl w-16 h-16 shrink-0">
              <span className="text-2xl font-extrabold leading-none">{today.day}</span>
              <span className="text-[10px] font-bold tracking-wide">{today.weekday}</span>
            </div>
            <div>
              <p className="font-semibold text-slate-700">{today.title}</p>
              <p className="text-xs text-slate-400">{today.info}</p>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-slate-100 text-sm">
            {calendarEvents.slice(1).map((ev, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <span className="text-slate-600">
                  {ev.day}/{ev.month} · {ev.weekday}
                </span>
                <span className="text-slate-400 text-xs">{ev.title}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Últimas Notícias */}
        <Card title="ÚLTIMAS NOTÍCIAS">
          {latestPosts.map((post, i) => (
            <div key={i}>
              <a href="#" className="font-semibold text-brand-700 hover:underline block">
                {post.title}
              </a>
              <p className="text-xs text-slate-400 mt-1">{post.date}</p>
            </div>
          ))}
        </Card>

        {/* Últimas Novidades */}
        <Card title="ÚLTIMAS NOVIDADES">
          {news.map((item, i) => (
            <div key={i} className="text-sm">
              <span className="inline-block bg-brand-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                {item.tag}
              </span>
              <p className="text-slate-400 text-xs mb-1">{item.date}</p>
              <p className="text-slate-700 font-medium">{item.title}</p>
              <p className="text-slate-500 text-xs mt-1">{item.excerpt}</p>
            </div>
          ))}
        </Card>

        {/* Canais de Atendimento */}
        <Card title="CANAIS DE ATENDIMENTO">
          <p className="text-sm text-slate-500 mb-4">
            Você pode utilizar todos os canais abaixo para dialogar e interagir com a Secretaria
            da Educação.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 mb-2">REDES SOCIAIS</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-400 hover:text-white active:scale-95 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-2">OUTROS ATENDIMENTOS</p>
              <div className="flex gap-3">
                {contactLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-400 hover:text-white active:scale-95 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
