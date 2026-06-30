import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 ${
        isDark ? 'bg-slate-700' : 'bg-pink-200'
      } ${className}`}
    >
      <span
        className={`inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {isDark ? <Moon size={15} className="text-slate-700" /> : <Sun size={15} className="text-pink-500" />}
      </span>
    </button>
  )
}
