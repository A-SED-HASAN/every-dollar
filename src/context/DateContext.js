import React, { useContext, createContext, useState } from 'react'
import moment from 'moment/moment'
import { init, monthsName } from '../assets/constants'
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
  // eslint-disable-next-line
  const [drawerOpen, setDrawerOpen] = useState(true)

  const { name } = monthsName.find((item) => {
    return item.id === thisMonth
  })

  const [list, setList] = useLocalStorage('list', init)

  const addItemHandler = (title, id) => {
    const specific = list.find((item) => {
      return item.title === title && item.id === id
    })
    specific.array.push({
      title:
        title === 'income' ? `paycheck ${specific.array.length + 1}` : 'label',
      value: 0,
    })

    setList([...list])
  }
  const deleteSingle = (title, index) => {
    const specific = list.find((item) => {
      return item.title === title
    })

    const newArray = specific.array.filter((_, i) => {
      return i !== index
    })
    specific.array = newArray
    setList([...list])
  }
  const addGroupHandler = () => {
    list.push({ id: list.length + 1, title: 'untitled', array: [] })
    setList([...list])
  }
  const resetBudget = () => {
    setList([...init])
  }
  const inputHandler = (e) => {
    const inpVal = e.target.value
    const [id, index, price] = e.target.name.split('-')
    const { array } = list.find((item) => {
      return item.id === +id
    })
    if (price) {
      if (!isNaN(inpVal)) array[index].value = inpVal
    } else {
      array[index].title = inpVal
    }

    setList([...list])
  }

  const makeDataForChart = () => {
    const ChartData = []
    // eslint-disable-next-line
    list.map((item) => {
      const { sum } = item.array.reduce(
        (total, item) => {
          const { value } = item
          total.sum += +value

          return total
        },
        { sum: 0 }
      )
      ChartData.push({
        type:
          item.title.length > 11
            ? `${item.title.slice(0, 11)} ...`
            : item.title,
        value: sum,
      })
    })
    return ChartData
  }

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
        addItemHandler,
        list,
        deleteSingle,
        addGroupHandler,
        resetBudget,
        inputHandler,
        makeDataForChart,
      }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateContext = () => {
  return useContext(DateContext)
}

export { DateContext, DateProvider }
