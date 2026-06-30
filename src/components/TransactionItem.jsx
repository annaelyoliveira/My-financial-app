import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { getCategory } from '../utils/categories'
import { useFinance } from '../context/FinanceContext'
import { formatBRL, formatDateBR } from '../utils/format'

export default function TransactionItem({ tx }) {
  const { updateTransaction, deleteTransaction } = useFinance()
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [draftAmount, setDraftAmount] = useState(tx.amount)
  const [draftDescription, setDraftDescription] = useState(tx.description)

  const cat = getCategory(tx.category)
  const Icon = cat.icon
  const isReceita = tx.type === 'receita'

  function saveEdit() {
    const value = parseFloat(String(draftAmount).replace(',', '.'))
    updateTransaction(tx.id, {
      amount: value > 0 ? value : tx.amount,
      description: draftDescription,
    })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${cat.bg} ${cat.text}`}>
            <Icon size={16} />
          </span>
          <span className="font-bold text-sm">{isReceita ? 'Receita' : 'Despesa'} · {cat.label}</span>
        </div>
        <input
          inputMode="decimal"
          value={draftAmount}
          onChange={(e) => setDraftAmount(e.target.value)}
          className="w-full rounded-xl bg-white dark:bg-surface-dark px-3 py-2 font-bold outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          value={draftDescription}
          onChange={(e) => setDraftDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full rounded-xl bg-white dark:bg-surface-dark px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className="flex gap-2">
          <button
            onClick={saveEdit}
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-emerald-500 text-white py-2 font-bold text-sm"
          >
            <Check size={16} /> Salvar
          </button>
          <button
            onClick={() => setEditing(false)}
            className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-slate-200 dark:bg-white/10 py-2 font-bold text-sm"
          >
            <X size={16} /> Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-white/5 p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${cat.bg} ${cat.text}`}>
        <Icon size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-bold text-sm truncate">{tx.description || (isReceita ? 'Receita' : 'Despesa')}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {cat.label} · {formatDateBR(tx.date)}
        </p>
      </div>

      <span className={`font-bold text-sm shrink-0 ${isReceita ? 'text-emerald-500' : 'text-red-500'}`}>
        {isReceita ? '+' : '-'}
        {formatBRL(tx.amount)}
      </span>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setEditing(true)}
          aria-label="Editar transação"
          className="p-1.5 rounded-lg text-slate-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-white/10"
        >
          <Pencil size={15} />
        </button>
        {confirmDelete ? (
          <button
            onClick={() => deleteTransaction(tx.id)}
            onBlur={() => setConfirmDelete(false)}
            autoFocus
            className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold"
          >
            Confirmar
          </button>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            aria-label="Excluir transação"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  )
}
