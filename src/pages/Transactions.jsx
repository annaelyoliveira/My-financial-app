import { FileText } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import TransactionItem from '../components/TransactionItem'
import Mascot from '../components/Mascot'

export default function Transactions() {
  const { transactions } = useFinance()

  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="font-display text-xl font-extrabold flex items-center gap-2 mb-4">
          <FileText size={20} className="text-violet-500" /> Minhas Transações
        </h2>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
            <Mascot mood="sleepy" size={84} />
            <p className="font-bold text-sm text-center max-w-[220px]">
              Nenhuma transação ainda. Adicione a primeira na aba Início!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        )}
      </div>

      {transactions.length > 0 && (
        <p className="text-center text-sm font-bold text-slate-400 dark:text-slate-500">
          ☀️ Continue economizando e alcance seus sonhos! ☀️
        </p>
      )}
    </div>
  )
}
