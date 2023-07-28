import { monthsName } from '../assets/constants'

export const formatMoney = (amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
  return formatter.format(amount)
}

export const formatPercent = (amount, parentheses) => {
  const percent = new Intl.NumberFormat(undefined, {
    style: 'percent',
  }).format(amount)
  if (!isNaN(amount)) {
    return parentheses ? `(${percent})` : percent
  } else {
    return parentheses ? `(0%)` : '0%'
  }
}

export const calcPercentValue = (data, type) => {
  const total = data.reduce((a, b) => a + b.value, 0)
  const items = data.filter((d) => d.type === type)
  return items.length
    ? formatPercent(items.reduce((a, b) => a + b.value, 0) / total)
    : '-'
}

export const heart = (x, y, width, height) => {
  const r = width / 4
  const dx = x - width / 2
  const dy = y - height / 2
  const path = [
    ['M', dx, dy + r * 2],
    ['A', r, r, 0, 0, 1, x, dy + r],
    ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
    ['L', x, dy + height],
    ['L', dx, dy + r * 2],
    ['Z'],
  ]
  return path
}

export const star = () => (x, y, width, height) => {
  const path = []
  const w = Math.min(width, height)

  for (let i = 0; i < 5; i++) {
    path.push([
      i === 0 ? 'M' : 'L',
      (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
      (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
    ])
    path.push([
      'L',
      (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
      (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
    ])
  }

  path.push(['Z'])
  return path
}

export const monthNameFinder = (monthNumber) => {
  const { name } = monthsName.find((item) => item.id === +monthNumber)
  return name.slice(0, 3)
}

export const paginate = (data) => {
  const itemsPerPage = 5
  const numberOfPages = Math.ceil(data.length / itemsPerPage)

  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  })

  return newData
}

export default paginate
