import React, { useContext, createContext, useState } from 'react'
import moment from 'moment/moment'
import { monthsName } from '../assets/constants'
import { useLocalStorage } from '../hook'
const DateContext = createContext()

const DateProvider = ({ children }) => {
  const [monthExpanded, setMonthExpanded] = useState(false)

  const toggleExpandMonth = () => {
    setMonthExpanded((prev) => !prev)
  }

  const [thisMonth, setThisMonth] = useLocalStorage(
    'thisMonth',
    +moment().format('M')
  )
  const [thisYear, setThisYear] = useLocalStorage(
    'thisYear',
    +moment().format('YYYY')
  )
  const [drawerOpen, setDrawerOpen] = useState(true)

  const { name } = monthsName.find((item) => {
    return item.id === thisMonth
  })

  return (
    <DateContext.Provider
      value={{
        monthExpanded,
        toggleExpandMonth,
        thisMonth,
        thisYear,
        setThisYear,
        setThisMonth,
        drawerOpen,
        name,
      }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateContext = () => {
  return useContext(DateContext)
}

export { DateContext, DateProvider }
