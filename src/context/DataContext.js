import React, { useContext, createContext, useState } from 'react'
import moment from 'moment/moment'
import { init, monthsName, goalInit } from '../assets/constants'
import { useLocalStorage } from '../hook'
const DataContext = createContext()

const DataProvider = ({ children }) => {
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
  const deleteSingle = (title, index, id) => {
    const specific = list.find((item) => {
      return item.title === title && item.id === id
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
  const deleteGroup = (id) => {
    const specific = list.filter((item) => {
      return item.id !== id
    })
    setList([...specific])
  }
  const inputHandler = (e) => {
    const inpVal = e.target.value

    const [id, index, price] = e.target.name.split('-')

    const { array } = list.find((item) => {
      return item.id === +id
    })
    if (!index && !price) {
      list[id - 1].title = inpVal
    }
    if (index && price) {
      if (!isNaN(inpVal)) array[index].value = inpVal
    }
    if (index && !price) {
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

  const calculateBalance = () => {
    const { value } = makeDataForChart()[0]
    const { sum } = makeDataForChart().reduce(
      (total, item) => {
        const { value } = item
        total.sum += +value

        return total
      },
      { sum: 0 }
    )
    return value * 2 - sum
  }

  const [pieTitle, setPieTitle] = useState('')
  const [pieValue, setPieValue] = useState('')

  // ======== goal =========
  const [openGoal, setOpenGoal] = useState(false)

  const [goalList, setGoalList] = useLocalStorage('goalList', [])
  const [goalInputData, setGoalInputData] = useLocalStorage(
    'goalInputData',
    goalInit
  )

  const handleOpenGoal = () => setOpenGoal(true)
  const handleCloseGoal = () => setOpenGoal(false)

  const changeHandler = (e) => {
    e.preventDefault()
    const inpVal = e.target.value
    const [, name] = e.target.name.split('-')
    if (name === 'name') {
      goalInputData[name] = inpVal
    }

    if (name === 'amount' && !isNaN(+inpVal)) {
      goalInputData[name] = inpVal
    }
    setGoalInputData({ ...goalInputData })
  }
  const setDate = (val) => {
    if (val) goalInputData.date = val
    setGoalInputData({ ...goalInputData })
  }
  const addGoalHandler = () => {
    setGoalList([...goalList, goalInputData])
    setGoalInputData({ ...goalInit })
    handleCloseGoal()
  }
  const resetGoal = () => {
    setGoalList([...[]])
  }

  return (
    <DataContext.Provider
      value={{
        monthExpanded,
        toggleExpandMonth,
        thisMonth,
        thisYear,
        setThisYear,
        setThisMonth,
        name,
        addItemHandler,
        list,
        deleteSingle,
        addGroupHandler,
        resetBudget,
        inputHandler,
        makeDataForChart,
        pieTitle,
        setPieTitle,
        pieValue,
        setPieValue,
        handleCloseGoal,
        handleOpenGoal,
        openGoal,
        goalList,
        resetGoal,
        addGoalHandler,
        goalInputData,
        changeHandler,
        setDate,
        calculateBalance,
        deleteGroup,
      }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}

export { DataContext, DataProvider }
