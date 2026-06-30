import { Home, UtensilsCrossed, Briefcase, CreditCard, User, MoreHorizontal } from 'lucide-react'

export const CATEGORIES = [
  { id: 'fixo', label: 'Fixo', icon: Home, color: '#3b82f6', bg: 'bg-blue-100 dark:bg-blue-500/15', text: 'text-blue-600 dark:text-blue-400' },
  { id: 'alimentacao', label: 'Alimentação', icon: UtensilsCrossed, color: '#f59e0b', bg: 'bg-amber-100 dark:bg-amber-500/15', text: 'text-amber-600 dark:text-amber-400' },
  { id: 'trabalho', label: 'Trabalho', icon: Briefcase, color: '#8b5cf6', bg: 'bg-violet-100 dark:bg-violet-500/15', text: 'text-violet-600 dark:text-violet-400' },
  { id: 'cartao', label: 'Cartão', icon: CreditCard, color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400' },
  { id: 'pessoal', label: 'Pessoal', icon: User, color: '#ec4899', bg: 'bg-pink-100 dark:bg-pink-500/15', text: 'text-pink-600 dark:text-pink-400' },
  { id: 'outros', label: 'Outros', icon: MoreHorizontal, color: '#64748b', bg: 'bg-slate-100 dark:bg-slate-500/15', text: 'text-slate-600 dark:text-slate-400' },
]

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}