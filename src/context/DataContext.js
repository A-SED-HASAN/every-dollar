import React, { useContext, createContext, useState, useEffect } from 'react'
import moment from 'moment/moment'
import { init, monthsName } from '../assets/constants'
import { useLocalStorage } from '../hook'

import { db } from '../firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'

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
  const Date = `${thisYear}-${thisMonth}`

  const [allDate, setAllDate] = useState([])

  const budgetCollectionRef = collection(db, 'Budget')
  const [loading, setLoading] = useState(false)
  const getAllDate = async () => {
    setLoading(true)
    const data = await getDocs(budgetCollectionRef)
    setAllDate(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
    setList(false)
  }

  const allDateMaker = async () => {
    getAllDate()
    if (!loading) {
      const initWithDate = { date: Date, array: [] }
      if (
        allDate.find((item) => {
          return item.date === Date
        })
      ) {
        return
      }
      await addDoc(budgetCollectionRef, initWithDate)
    }
  }
  useEffect(() => {
    allDateMaker()
    // eslint-disable-next-line
  }, [Date])

  const makeNewBudget = async () => {
    const specificDate = allDate.find((item) => {
      return item.date === Date
    })
    const specificItem = doc(db, 'Budget', specificDate.id)
    await updateDoc(specificItem, {
      array: init,
    })
  }

  const specificList = allDate.find((item) => {
    return item.date === `${thisYear}-${thisMonth}`
  })

  const [list, setList] = useLocalStorage('list', specificList?.array)

  const addItemHandler = (title, id) => {
    const specific = list?.array.find((item) => {
      return item.title === title && item.id === id
    })
    console.log(specific)

    specific.array.push({
      title:
        title === 'income' ? `paycheck ${specific?.array.length + 1}` : 'label',
      value: 0,
    })

    setList([...specificList?.array])
  }
  const deleteSingle = (title, index, id) => {
    const specific = specificList.array.find((item) => {
      return item.title === title && item.id === id
    })
    const newArray = specific.array.filter((_, i) => {
      return i !== index
    })

    specific.array = newArray
    setList([...specificList?.array])
  }
  const addGroupHandler = () => {
    specificList.array.push({
      id: list?.length + 1,
      title: 'untitled',
      array: [],
    })
    setList([...specificList?.array])
  }
  const resetBudget = () => {
    specificList.array = init
    setList([...specificList.array])
  }
  const resetBudgetJustValue = () => {
    // eslint-disable-next-line
    specificList.array.map((item) => {
      item.array.map((item) => {
        return (item.value = 0)
      })
    })
    setList([...specificList?.array])
  }
  const deleteGroup = (id) => {
    const newList = specificList.array.filter((item) => {
      return item.id !== id
    })
    specificList.array = newList

    setList([...specificList?.array])
  }
  const inputHandler = (e) => {
    const inpVal = e.target.value

    const [id, index, price] = e.target.name.split('-')

    const { array } = specificList?.array.find((item) => {
      return item.id === +id
    })
    if (!index && !price) {
      specificList.array[id - 1].title = inpVal
    }
    if (index && price) {
      if (!isNaN(inpVal)) array[index].value = inpVal
    }
    if (index && !price) {
      array[index].title = inpVal
    }

    setList([...specificList?.array])
  }

  const makeDataForChart = () => {
    const ChartData = []
    // eslint-disable-next-line
    specificList?.array.map((item) => {
      const { sum } = item?.array.reduce(
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
    const { sum } = makeDataForChart().reduce(
      (total, item) => {
        const { value } = item
        total.sum += +value

        return total
      },
      { sum: 0 }
    )
    return !isNaN(makeDataForChart()[0]?.value * 2 - sum)
      ? makeDataForChart()[0]?.value * 2 - sum
      : 0
  }
  const [info, setInfo] = useLocalStorage('info', null)
  const giveInfo = (title, subTitle, index, id) => {
    setInfo({ title, subTitle, index, id })
  }

  const [resetPlan, setResetPlan] = useState(null)

  const [pieTitle, setPieTitle] = useState('')
  const [pieValue, setPieValue] = useState('')

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
        calculateBalance,
        deleteGroup,
        giveInfo,
        info,
        resetPlan,
        setResetPlan,
        resetBudgetJustValue,
        makeNewBudget,
        allDate,
        specificList,
      }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}

export { DataContext, DataProvider }
