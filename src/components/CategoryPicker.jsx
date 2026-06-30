import { CATEGORIES } from '../utils/categories'

export default function CategoryPicker({ value, onChange, accentClass = 'bg-pink-500 text-white' }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        const active = value === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`btn-pop flex flex-col items-center justify-center gap-1 rounded-2xl py-3 px-2 text-xs font-semibold ${
              active
                ? `${accentClass} shadow-soft scale-[1.02]`
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            <Icon size={20} />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
