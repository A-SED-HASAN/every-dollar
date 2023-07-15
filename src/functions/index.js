export const formatMoney = (amount) => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}
