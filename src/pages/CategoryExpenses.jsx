import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, FileText } from 'lucide-react'
import CategoryPicker from '../components/CategoryPicker'
import Mascot from '../components/Mascot'
import { useFinance } from '../context/FinanceContext'
import { useTheme } from '../context/ThemeContext'
import { CATEGORIES, getCategory } from '../utils/categories'
import { formatBRL, formatDateBR } from '../utils/format'

export default function CategoryExpenses() {
  const { categoryStats } = useFinance()
  const { theme } = useTheme()
  const [category, setCategory] = useState('fixo')

  const cat = getCategory(category)
  const Icon = cat.icon
  const stats = categoryStats(category)

  const barData = [
    { name: 'Dia', valor: stats.porPeriodo.dia },
    { name: 'Semana', valor: stats.porPeriodo.semana },
    { name: 'Mês', valor: stats.porPeriodo.mes },
    { name: 'Ano', valor: stats.porPeriodo.ano },
  ]

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

  return (
    <div className="space-y-5">
      <div className="card space-y-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-emerald-500" size={22} />
          <h2 className="font-display text-xl font-extrabold">Despesas por Categoria</h2>
        </div>

        <div>
          <p className="text-sm font-bold mb-2">Selecione uma categoria:</p>
          <CategoryPicker value={category} onChange={setCategory} accentClass={`text-white`} />
        </div>

        <div
          className="rounded-2xl border-2 p-5"
          style={{ borderColor: cat.color, backgroundColor: `${cat.color}14` }}
        >
          <p className="text-xs font-bold opacity-70 mb-1">Categoria Selecionada</p>
          <p className="font-display text-lg font-extrabold flex items-center gap-2" style={{ color: cat.color }}>
            <Icon size={20} /> {cat.label}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl bg-white/70 dark:bg-black/20 px-3 py-2">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-300">🌿 Gasto no Mês</p>
              <p className="font-display font-extrabold" style={{ color: cat.color }}>
                {formatBRL(stats.gastoNoMes)}
              </p>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-black/20 px-3 py-2">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-300">📋 Transações</p>
              <p className="font-display font-extrabold" style={{ color: cat.color }}>
                {stats.transacoesNoMes}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display font-extrabold mb-4">
          📊 Despesas por Período - {cat.label}
        </h3>
        {stats.gastoNoMes === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
            <Mascot mood="excited" size={80} />
            <p className="font-bold text-sm">Nenhuma despesa nesta categoria ainda!</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" stroke={axisColor} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(v) => formatBRL(v)}
                  contentStyle={{ borderRadius: 12, border: 'none', background: theme === 'dark' ? '#1e1b2e' : '#fff' }}
                />
                <Bar dataKey="valor" radius={[10, 10, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={cat.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="font-display font-extrabold mb-4 flex items-center gap-2">
          <FileText size={18} /> Detalhamento por Período
        </h3>
        <div className="space-y-2">
          {barData.map((d) => (
            <div key={d.name} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-white/5 px-4 py-3">
              <span className="text-sm font-semibold flex items-center gap-2">📅 {d.name}</span>
              <span className="font-bold">{formatBRL(d.valor)}</span>
            </div>
          ))}
        </div>

        {stats.transacoes.length > 0 && (
          <div className="mt-5 space-y-2">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Transações do mês</p>
            {stats.transacoes.map((t) => (
              <div key={t.id} className="flex items-center justify-between text-sm rounded-xl bg-slate-50 dark:bg-white/5 px-4 py-2.5">
                <span className="truncate">{t.description || cat.label} · {formatDateBR(t.date)}</span>
                <span className="font-bold text-red-500 shrink-0 ml-2">-{formatBRL(t.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
