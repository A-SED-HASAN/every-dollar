import React from 'react'
import Months from './Months'
import Remain from './Remain'
import { useDataContext } from '../../context/DataContext'
const Top = () => {
  const { calculateBalance } = useDataContext()
  return (
    <>
      <Months />
      <Remain amount={calculateBalance().balance} />
    </>
  )
}

export default Top
