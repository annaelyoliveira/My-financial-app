import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import Mascot from './Mascot'
import { formatBRL } from '../utils/format'

export default function BalanceCard({ saldo, receitas, despesas }) {
  const negativo = saldo < 0
  const gradient = negativo
    ? 'from-red-400 to-rose-500'
    : 'from-emerald-400 to-green-500'

  return (
    <div className="space-y-3">
      {negativo && (
        <div className="rounded-[1.75rem] bg-gradient-to-r from-orange-400 to-red-400 text-white px-5 py-4 flex items-center gap-3 shadow-soft">
          <Mascot mood="sad" size={52} className="shrink-0 drop-shadow" />
          <p className="font-bold text-sm leading-snug">
            Ops! Suas despesas estão maiores que suas receitas. Hora de economizar! 🐷
          </p>
        </div>
      )}

      <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} text-white p-6 shadow-soft`}>
        {/* blobs decorativos */}
        <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full bg-white/15" />
        <div className="absolute right-14 top-20 h-16 w-16 rounded-full bg-white/10" />
        <div className="absolute left-[-2rem] bottom-[-2rem] h-28 w-28 rounded-full bg-white/10" />

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
              <Wallet size={18} />
              SALDO ATUAL
            </div>
            <p className="font-display text-4xl sm:text-5xl font-extrabold mt-2 tracking-tight">
              {formatBRL(saldo)}
            </p>
            {negativo && <p className="text-sm font-bold text-white/90 mt-1">Você está no negativo!</p>}
          </div>

          <Mascot mood={negativo ? 'sad' : 'happy'} size={76} className="shrink-0 -mt-1 -mr-1" />
        </div>

        <div className="relative grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold">
              <TrendingUp size={14} /> Receitas
            </div>
            <p className="font-display font-extrabold text-lg mt-1">{formatBRL(receitas)}</p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold">
              <TrendingDown size={14} /> Despesas
            </div>
            <p className="font-display font-extrabold text-lg mt-1">{formatBRL(despesas)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
