import React from 'react'
import { Months, Remain } from '../'
import { useDataContext } from '../../context'
export default function Top({ treeMap }) {
  const { calculateBalance, allDate } = useDataContext()

  const existDate = allDate.map((item) => {
    const splitDate = item.date.split('-')
    return { id: item.id, month: splitDate[1], year: splitDate[0] }
  })

  existDate.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    } else {
      return a.month - b.month
    }
  })
  return (
    <>
      <Months data={existDate} treeMap={treeMap} />
      <Remain amount={calculateBalance().balance} />
    </>
  )
}
