import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import CategoryExpenses from './pages/CategoryExpenses'
import MonthlyExpenses from './pages/MonthlyExpenses'
import Transactions from './pages/Transactions'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 pb-24 sm:pb-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/categorias" element={<CategoryExpenses />} />
          <Route path="/mensal" element={<MonthlyExpenses />} />
          <Route path="/transacoes" element={<Transactions />} />
        </Routes>
      </main>
    </div>
  )
}
