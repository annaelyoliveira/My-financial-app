import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BarChart3, PieChart, CalendarRange, Receipt, PiggyBank } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Início', icon: LayoutDashboard },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/categorias', label: 'Categorias', icon: PieChart },
  { to: '/mensal', label: 'Mensal', icon: CalendarRange },
  { to: '/transacoes', label: 'Transações', icon: Receipt },
]

export default function Navbar() {
  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-pink-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐷</span>
            <h1 className="font-display font-extrabold text-lg tracking-tight">Meu Bolso</h1>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-1">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Bottom tab bar for mobile */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-pink-100 dark:border-white/5 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-pink-500' : 'text-slate-400 dark:text-slate-500'
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

export function BrandMark() {
  return <PiggyBank className="text-pink-500" />
}
