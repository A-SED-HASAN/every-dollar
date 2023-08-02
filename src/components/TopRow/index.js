import React from 'react'
import Months from './Months'
import Remain from './Remain'
import { useDataContext } from '../../context/DataContext'
const Top = ({ treeMap }) => {
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

export default Top
