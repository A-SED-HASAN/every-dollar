import React, { useContext, createContext, useState } from 'react'
import moment from 'moment/moment'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [monthExpanded, setMonthExpanded] = useState(false)

  const toggleExpandMonth = () => {
    setMonthExpanded((prev) => !prev)
  }

  const [thisMonth, setThisMonth] = useState(+moment().format('M'))
  const [thisYear, setThisYear] = useState(+moment().format('YYYY'))

  return (
    <AppContext.Provider
      value={{
        monthExpanded,
        toggleExpandMonth,
        thisMonth,
        thisYear,
        setThisYear,
        setThisMonth,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
