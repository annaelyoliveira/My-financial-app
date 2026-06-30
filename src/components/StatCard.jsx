export default function StatCard({ icon: Icon, label, value, tone = 'neutral' }) {
  const tones = {
    income: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    expense: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20',
    neutral: 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-100 dark:border-white/10',
    info: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
  }
  return (
    <div className={`rounded-2xl border px-4 py-3 ${tones[tone]}`}>
      <div className="flex items-center gap-1.5 text-xs font-bold opacity-80">
        {Icon && <Icon size={14} />}
        {label}
      </div>
      <p className="font-display text-xl font-extrabold mt-1">{value}</p>
    </div>
  )
}
