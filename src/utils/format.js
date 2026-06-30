export function formatBRL(value) {
  return (Number(value) || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Returns a Date parsed from an ISO 'yyyy-mm-dd' string, in local time
// (avoids the classic UTC-shift-by-one-day bug from `new Date('yyyy-mm-dd')`).
export function parseLocalDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDateBR(isoDate) {
  return parseLocalDate(isoDate).toLocaleDateString('pt-BR')
}

export function todayISO() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - offset * 60 * 1000)
  return local.toISOString().slice(0, 10)
}

export function monthKey(isoDate) {
  return isoDate.slice(0, 7) // 'yyyy-mm'
}

export function monthLabel(key) {
  const [y, m] = key.split('-').map(Number)
  const d = new Date(y, m - 1, 1)
  return d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', '')
}
