import { useMemo, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Calendar, CalendarDays, CalendarRange, CalendarClock, BarChart3, PieChart as PieIcon, ClipboardList, Coins } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import { useTheme } from '../context/ThemeContext'
import { CATEGORIES, getCategory } from '../utils/categories'
import { formatBRL } from '../utils/format'

const PERIODS = [
  { id: 'hoje', label: 'Hoje', icon: Calendar },
  { id: 'semana', label: 'Esta Semana', icon: CalendarDays },
  { id: 'mes', label: 'Este Mês', icon: CalendarRange },
  { id: 'ano', label: 'Este Ano', icon: CalendarClock },
]

export default function Reports() {
  const { totalsForPeriod, expensesByCategory, topExpenseCategory } = useFinance()
  const { theme } = useTheme()
  const [period, setPeriod] = useState('mes')

  const { receitas, despesas, saldo, count } = totalsForPeriod(period)
  const expByCat = expensesByCategory(period)
  const topCat = topExpenseCategory(period)

  const barData = [
    { name: 'Receitas', valor: receitas, fill: '#10b981' },
    { name: 'Despesas', valor: despesas, fill: '#ef4444' },
  ]

  const pieData = useMemo(
    () =>
      CATEGORIES.map((c) => ({ name: c.label, value: expByCat[c.id] || 0, color: c.color })).filter(
        (d) => d.value > 0,
      ),
    [expByCat],
  )

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

  return (
    <div className="space-y-5">
      <div className="card space-y-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-violet-500" size={22} />
          <h2 className="font-display text-xl font-extrabold">Relatórios</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PERIODS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPeriod(id)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-bold transition-all ${
                period === id
                  ? 'bg-violet-500 text-white shadow-soft'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-4 py-3">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              💰 Receitas
            </p>
            <p className="font-display text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {formatBRL(receitas)}
            </p>
          </div>
          <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-4 py-3">
            <p className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
              🍂 Despesas
            </p>
            <p className="font-display text-xl font-extrabold text-red-600 dark:text-red-400 mt-1">
              {formatBRL(despesas)}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-violet-500" /> Receitas vs Despesas
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={70}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={axisColor} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(v) => formatBRL(v)}
                contentStyle={{ borderRadius: 12, border: 'none', background: theme === 'dark' ? '#1e1b2e' : '#fff' }}
              />
              <Bar dataKey="valor" radius={[10, 10, 0, 0]}>
                {barData.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
          <PieIcon size={18} className="text-pink-500" /> Despesas por Categoria
        </h3>
        {pieData.length === 0 ? (
          <p className="text-center text-slate-400 py-10">Nenhuma despesa neste período ainda.</p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={0} outerRadius={100}>
                  {pieData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatBRL(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="rounded-3xl border-2 border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 p-5 space-y-2">
        <h3 className="font-display font-extrabold text-violet-600 dark:text-violet-400 flex items-center gap-2">
          <ClipboardList size={18} /> Estatísticas do Período
        </h3>
        <p className="text-sm">
          Total de transações: <strong>{count}</strong>
        </p>
        <p className="text-sm flex items-center gap-1">
          Saldo:{' '}
          <strong className={saldo >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>
            {formatBRL(saldo)}
          </strong>
        </p>
        <p className="text-sm flex items-center gap-1.5">
          <Coins size={14} /> Categoria que mais gastou:{' '}
          <strong>{topCat ? getCategory(topCat).label : '—'}</strong>
        </p>
      </div>
    </div>
  )
}
