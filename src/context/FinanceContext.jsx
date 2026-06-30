import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { todayISO, monthKey } from '../utils/format'

const FinanceContext = createContext(null)
const STORAGE_KEY = 'meu-bolso:transactions'

function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction({ type, category, amount, description, date }) {
    const tx = {
      id: uid(),
      type, // 'receita' | 'despesa'
      category,
      amount: Math.abs(Number(amount) || 0),
      description: description?.trim() || '',
      date: date || todayISO(),
      createdAt: new Date().toISOString(),
    }
    setTransactions((prev) => [tx, ...prev])
    return tx
  }

  function updateTransaction(id, updates) {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // ---- Derived data ----

  const totals = useMemo(() => {
    const receitas = transactions.filter((t) => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
    const despesas = transactions.filter((t) => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)
    return { receitas, despesas, saldo: receitas - despesas }
  }, [transactions])

  function filterByPeriod(period) {
    const now = new Date()
    return transactions.filter((t) => {
      const d = new Date(t.date + 'T00:00:00')
      if (period === 'hoje') {
        return d.toDateString() === now.toDateString()
      }
      if (period === 'semana') {
        const start = new Date(now)
        start.setDate(now.getDate() - now.getDay())
        start.setHours(0, 0, 0, 0)
        return d >= start
      }
      if (period === 'mes') {
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }
      if (period === 'ano') {
        return d.getFullYear() === now.getFullYear()
      }
      return true
    })
  }

  function totalsForPeriod(period) {
    const list = filterByPeriod(period)
    const receitas = list.filter((t) => t.type === 'receita').reduce((s, t) => s + t.amount, 0)
    const despesas = list.filter((t) => t.type === 'despesa').reduce((s, t) => s + t.amount, 0)
    return { receitas, despesas, saldo: receitas - despesas, count: list.length, list }
  }

  function expensesByCategory(period = 'mes') {
    const list = filterByPeriod(period).filter((t) => t.type === 'despesa')
    const map = {}
    for (const t of list) {
      map[t.category] = (map[t.category] || 0) + t.amount
    }
    return map
  }

  function topExpenseCategory(period = 'mes') {
    const map = expensesByCategory(period)
    const entries = Object.entries(map)
    if (entries.length === 0) return null
    return entries.sort((a, b) => b[1] - a[1])[0][0]
  }

  function categoryStats(categoryId) {
    const monthList = filterByPeriod('mes').filter((t) => t.type === 'despesa' && t.category === categoryId)
    const dayList = filterByPeriod('hoje').filter((t) => t.type === 'despesa' && t.category === categoryId)
    const weekList = filterByPeriod('semana').filter((t) => t.type === 'despesa' && t.category === categoryId)
    const yearList = filterByPeriod('ano').filter((t) => t.type === 'despesa' && t.category === categoryId)
    const sum = (l) => l.reduce((s, t) => s + t.amount, 0)
    return {
      gastoNoMes: sum(monthList),
      transacoesNoMes: monthList.length,
      porPeriodo: {
        dia: sum(dayList),
        semana: sum(weekList),
        mes: sum(monthList),
        ano: sum(yearList),
      },
      transacoes: monthList,
    }
  }

  // Monthly evolution across all categories, last N months (chronological)
  function monthlyEvolution(months = 6) {
    const now = new Date()
    const keys = []
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    }
    const data = keys.map((key) => {
      const row = { key }
      const catTotals = { casa: 0, empresa: 0, pessoal: 0, cartao: 0, outros: 0 }
      transactions
        .filter((t) => t.type === 'despesa' && monthKey(t.date) === key)
        .forEach((t) => {
          catTotals[t.category] = (catTotals[t.category] || 0) + t.amount
        })
      row.total = Object.values(catTotals).reduce((a, b) => a + b, 0)
      return { ...row, ...catTotals }
    })
    return data
  }

  function allCategoriesTotalAllTime() {
    const catTotals = { casa: 0, empresa: 0, pessoal: 0, cartao: 0, outros: 0 }
    transactions
      .filter((t) => t.type === 'despesa')
      .forEach((t) => {
        catTotals[t.category] = (catTotals[t.category] || 0) + t.amount
      })
    return catTotals
  }

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totals,
    totalsForPeriod,
    expensesByCategory,
    topExpenseCategory,
    categoryStats,
    monthlyEvolution,
    allCategoriesTotalAllTime,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  return ctx
}
