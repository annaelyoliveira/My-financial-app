import { useState } from 'react'
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react'
import CategoryPicker from './CategoryPicker'
import { useFinance } from '../context/FinanceContext'
import { todayISO } from '../utils/format'

export default function TransactionForm() {
  const { addTransaction } = useFinance()
  const [type, setType] = useState('receita')
  const [category, setCategory] = useState('alimentacao')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayISO())
  const [feedback, setFeedback] = useState('')

  const isReceita = type === 'receita'

  function handleSubmit(e) {
    e.preventDefault()
    const value = parseFloat((amount || '0').replace(',', '.'))
    if (!value || value <= 0) {
      setFeedback('Informe um valor maior que zero.')
      return
    }
    addTransaction({ type, category, amount: value, description, date })
    setAmount('')
    setDescription('')
    setFeedback(isReceita ? 'Receita adicionada! 🎉' : 'Despesa registrada.')
    setTimeout(() => setFeedback(''), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐷</span>
        <h2 className="font-display text-xl font-extrabold">Adicionar</h2>
      </div>

      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setType('receita')}
          className={`btn-pop flex flex-col items-center gap-1 rounded-2xl py-4 font-bold transition-all ${
            isReceita
              ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-soft'
              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
          }`}
        >
          <TrendingUp size={20} />
          Receita
        </button>
        <button
          type="button"
          onClick={() => setType('despesa')}
          className={`btn-pop flex flex-col items-center gap-1 rounded-2xl py-4 font-bold transition-all ${
            !isReceita
              ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-soft'
              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300'
          }`}
        >
          <TrendingDown size={20} />
          Despesa
        </button>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Categoria</label>
        <CategoryPicker
          value={category}
          onChange={setCategory}
          accentClass={isReceita ? 'bg-emerald-500 text-white' : 'bg-pink-500 text-white'}
        />
      </div>

      <div>
        <label htmlFor="valor" className="block text-sm font-bold mb-2">
          Valor (R$)
        </label>
        <input
          id="valor"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-2xl bg-slate-100 dark:bg-white/5 px-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-slate-400 placeholder:font-normal"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-bold mb-2">
          Descrição (opcional)
        </label>
        <input
          id="descricao"
          placeholder="Ex: Mesada, Lanche, Brinquedo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-2xl bg-slate-100 dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="data" className="block text-sm font-bold mb-2">
          📅 Data
        </label>
        <input
          id="data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-2xl bg-slate-100 dark:bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <button
        type="submit"
        className={`btn-pop w-full rounded-2xl py-3.5 font-extrabold text-white flex items-center justify-center gap-2 shadow-soft ${
          isReceita ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
        }`}
      >
        <Sparkles size={18} />
        Adicionar {isReceita ? 'Receita' : 'Despesa'}
      </button>

      {feedback && (
        <p role="status" className="text-center text-sm font-semibold text-slate-500 dark:text-slate-300">
          {feedback}
        </p>
      )}
    </form>
  )
}
