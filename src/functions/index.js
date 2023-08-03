import { monthsName } from '../assets/constants'

export const lengthChecker = (string, length = 11) => {
  return string.length > length ? `${string.slice(0, length)} ...` : string
}

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
  const total = data.reduce((a, b) => a + b.planned, 0)
  const items = data.filter((d) => d.type === type)
  return items.length
    ? formatPercent(items.reduce((a, b) => a + b.planned, 0) / total)
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
  const specific = monthsName.find((item) => item.id === +monthNumber)
  return specific?.name.slice(0, 3)
}

export const paginate = (data) => {
  const width = window.innerWidth
  const itemsPerPage = Math.floor(width / 150)

  const numberOfPages = Math.ceil(data.length / itemsPerPage)

  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  })

  return newData
}

export const posORneg = (number, reverse) => {
  if (reverse) {
    return number === 0 ? null : number < 0 ? 't-zero' : 'u-zero'
  } else {
    return number === 0 ? null : number < 0 ? 'u-zero' : 't-zero'
  }
}

export const isNanChecker = (number) => (!isNaN(number) ? number : 0)

export const arrowDirection = (number) =>
  number === 0 ? null : number < 0 ? '⇣' : '⇡'
