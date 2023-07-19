export const formatMoney = (amount) => {
  if (amount >= 1_000_000_000) {
    amount = `${amount / 1_000_000_000} B`
  } else if (amount >= 1_000_000) {
    amount = `${amount / 1_000_000} M`
  } else if (amount >= 1_000) {
    amount = `${amount / 1_000} K`
  }
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

export const formatPercent = (amount, parentheses) => {
  const percentage = (amount * 100).toFixed(2)

  return isNaN(percentage) || !isFinite(percentage)
    ? `(??%)`
    : parentheses
    ? `(${percentage}%)`
    : `${percentage}%`
}

export const calcPercentValue = (data, type) => {
  const total = data.reduce((a, b) => a + b.value, 0)
  const items = data.filter((d) => d.type === type)
  return items.length
    ? formatPercent(items.reduce((a, b) => a + b.value, 0) / total)
    : '-'
}
