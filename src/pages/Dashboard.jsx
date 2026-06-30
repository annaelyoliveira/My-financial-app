import BalanceCard from '../components/BalanceCard'
import TransactionForm from '../components/TransactionForm'
import { useFinance } from '../context/FinanceContext'

export default function Dashboard() {
  const { totals } = useFinance()

  return (
    <div className="space-y-5">
      <BalanceCard saldo={totals.saldo} receitas={totals.receitas} despesas={totals.despesas} />
      <TransactionForm />
    </div>
  )
}
