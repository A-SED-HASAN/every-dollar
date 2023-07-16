import React, { useContext, createContext, useState } from 'react'
import moment from 'moment/moment'

const DateContext = createContext()

const DateProvider = ({ children }) => {
  const [monthExpanded, setMonthExpanded] = useState(false)

  const toggleExpandMonth = () => {
    setMonthExpanded((prev) => !prev)
  }

  const [thisMonth, setThisMonth] = useState(+moment().format('M'))
  const [thisYear, setThisYear] = useState(+moment().format('YYYY'))

  return (
    <DateContext.Provider
      value={{
        monthExpanded,
        toggleExpandMonth,
        thisMonth,
        thisYear,
        setThisYear,
        setThisMonth,
      }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateContext = () => {
  return useContext(DateContext)
}

export { DateContext, DateProvider }
