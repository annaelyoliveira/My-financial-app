import { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalendarDays, TrendingUp, Lightbulb, Table2 } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import { useTheme } from '../context/ThemeContext'
import { CATEGORIES, getCategory } from '../utils/categories'
import { formatBRL, monthLabel } from '../utils/format'

const TODAS = { id: 'todas', label: 'Todas', icon: TrendingUp, color: '#8b5cf6' }
const FILTERS = [TODAS, ...CATEGORIES]

export default function MonthlyExpenses() {
  const { monthlyEvolution, allCategoriesTotalAllTime } = useFinance()
  const { theme } = useTheme()
  const [filter, setFilter] = useState('todas')

  const data = useMemo(() => monthlyEvolution(6).map((d) => ({ ...d, label: monthLabel(d.key) })), [monthlyEvolution])
  const totals = allCategoriesTotalAllTime()

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

  const linesToShow = filter === 'todas' ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter)

  return (
    <div className="space-y-5">
      <div className="card space-y-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-violet-500" size={22} />
          <h2 className="font-display text-xl font-extrabold">Despesas Mensais por Categoria</h2>
        </div>

        <div>
          <p className="text-sm font-bold mb-2">Escolha uma categoria para ver detalhes:</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {FILTERS.map((f) => {
              const Icon = f.icon
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-semibold transition-all ${
                    active ? 'text-white shadow-soft' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
                  }`}
                  style={active ? { backgroundColor: f.color } : {}}
                >
                  <Icon size={18} />
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold mb-2">💰 Total Gasto por Categoria (Todos os Meses)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border-2 px-4 py-3"
                style={{ borderColor: c.color, backgroundColor: `${c.color}14` }}
              >
                <p className="text-xs font-bold flex items-center gap-1" style={{ color: c.color }}>
                  <c.icon size={14} /> {c.label}
                </p>
                <p className="font-display text-lg font-extrabold mt-1" style={{ color: c.color }}>
                  {formatBRL(totals[c.id] || 0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
          📈 Evolução das Despesas por Mês
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="label" stroke={axisColor} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(v) => formatBRL(v)}
                contentStyle={{ borderRadius: 12, border: 'none', background: theme === 'dark' ? '#1e1b2e' : '#fff' }}
              />
              <Legend />
              {linesToShow.map((c) => (
                <Line key={c.id} type="monotone" dataKey={c.id} name={c.label} stroke={c.color} strokeWidth={2.5} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card overflow-hidden">
        <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
          <Table2 size={18} /> Todas as Categorias por Mês
        </h3>
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-violet-500 font-bold border-b border-slate-100 dark:border-white/10">
                <th className="py-2 pr-3">Mês</th>
                {CATEGORIES.map((c) => (
                  <th key={c.id} className="py-2 pr-3" style={{ color: c.color }}>
                    {c.label}
                  </th>
                ))}
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.key} className="border-b border-slate-50 dark:border-white/5">
                  <td className="py-2 pr-3 font-semibold">{row.label}</td>
                  {CATEGORIES.map((c) => (
                    <td key={c.id} className="py-2 pr-3" style={{ color: row[c.id] ? c.color : undefined }}>
                      {row[c.id] ? formatBRL(row[c.id]) : '-'}
                    </td>
                  ))}
                  <td className="py-2 font-extrabold">{formatBRL(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-4 flex items-start gap-2">
        <Lightbulb size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong className="text-blue-600 dark:text-blue-400">Dica Especial:</strong> Compare todas as categorias
          para ver onde você gasta mais ao longo dos meses!
        </p>
      </div>
    </div>
  )
}