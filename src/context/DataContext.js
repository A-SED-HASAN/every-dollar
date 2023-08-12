import React, { useContext, createContext, useState, useEffect } from 'react'
import moment from 'moment/moment'
import { init, monthsName } from '../assets/constants'
import { useLocalStorage } from '../hook'
import { db } from '../firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from './AuthContext.js'
import { money } from '../assets/sound'
import useSound from 'use-sound'
import { isNanChecker, lengthChecker } from '../functions'

const DataContext = createContext()
const DataProvider = ({ children }) => {
  const [playMoney] = useSound(money)
  const { authUser } = useAuthContext()

  const [monthExpanded, setMonthExpanded] = useState(false)

  const toggleExpandMonth = () => {
    setMonthExpanded((prev) => !prev)
  }

  // eslint-disable-next-line
  const [monthNow, setMonthNow] = useLocalStorage(
    'monthNow',
    +moment().format('M')
  )

  // eslint-disable-next-line
  const [yearNow, setYearNow] = useLocalStorage(
    'yearNow',
    +moment().format('YYYY')
  )
  const [thisMonth, setThisMonth] = useLocalStorage('thisMonth', monthNow)
  const [thisYear, setThisYear] = useLocalStorage('thisYear', yearNow)

  const { name } = monthsName.find((item) => {
    return item.id === thisMonth
  })
  const Date = `${thisYear}-${thisMonth}`

  const [allDate, setAllDate] = useState([])

  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)

  const collectionName = `${authUser?.uid}:BUDGET`
  const budgetCollectionRef = collection(db, collectionName)

  const getAllDate = async () => {
    setListLoading(true)
    const data = await getDocs(budgetCollectionRef)
    const list = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setAllDate(list)
    setListLoading(false)
  }

  const changeMonthMakeDate = async () => {
    setListLoading(true)
    if (authUser) {
      const data = await getDocs(budgetCollectionRef)
      const initWithDate = { date: Date, array: [], income: 0, spent: 0 }
      if (
        data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .find((item) => item.date === Date)
      ) {
        setListLoading(false)
        setLoading(false)
        return
      }
      await addDoc(budgetCollectionRef, initWithDate)

      getAllDate()
    }
    setLoading(false)
  }

  useEffect(() => {
    changeMonthMakeDate()
    spentAndIncome()

    // eslint-disable-next-line
  }, [Date])

  useEffect(() => {
    getAllDate()
    changeMonthMakeDate()
    // eslint-disable-next-line
  }, [authUser])

  const makeNewBudget = async () => {
    setListLoading(true)
    if (authUser) {
      try {
        const specificDate = allDate.find((item) => {
          return item.date === Date
        })
        if (specificDate) {
          const specificItem = doc(db, collectionName, specificDate?.id)
          await updateDoc(specificItem, {
            array: init,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    setListLoading(false)
    getAllDate()
  }

  const specificList = allDate.find((item) => {
    return item.date === Date
  })

  const addItemHandler = async (title, id) => {
    setListLoading(true)

    const { array, id: ID } = specificList
    const specificItem = array.find((item) => {
      return item.title === title && item.id === id
    })
    const newArray = [
      ...specificItem.array,
      {
        title:
          title === 'income'
            ? `paycheck ${specificItem?.array.length + 1}`
            : 'label',
        planned: 0,
        ROS: 0,
      },
    ]

    // eslint-disable-next-line
    array.find((item) => {
      if (item.title === title && item.id === id) item.array = newArray
    })

    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: array })
    getAllDate()
  }

  const deleteSingle = async (title, index, id) => {
    setListLoading(true)

    const { array, id: ID } = specificList

    const specific = specificList.array.find((item) => {
      return item.title === title && item.id === id
    })
    const newArray = specific.array.filter((_, i) => {
      return i !== index
    })
    specific.array = newArray

    // eslint-disable-next-line
    array.find((item) => {
      if (item.title === title && item.id === id) item.array = specific.array
    })
    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: array })
    getAllDate()
  }

  const addGroupHandler = async () => {
    setListLoading(true)
    const { id: ID } = specificList

    specificList.array.push({
      id: specificList.array?.length + 1,
      title: 'untitled',
      array: [],
    })

    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: specificList.array })
    getAllDate()
  }

  const [resetPlan, setResetPlan] = useState(null)

  const resetBudget = async () => {
    setListLoading(true)
    const { id: ID } = specificList
    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: init })
    getAllDate()
  }

  const resetBudgetJustValue = async () => {
    setListLoading(true)
    const { array, id: ID } = specificList
    // eslint-disable-next-line
    array.map((item) => {
      // eslint-disable-next-line
      item.array.map((item) => {
        item.ROS = 0
        item.planned = 0
      })
    })

    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: array })
    getAllDate()
    setListLoading(false)
  }

  const deleteGroup = async (id) => {
    setListLoading(true)

    const { id: ID } = specificList
    const newList = specificList.array.filter((item) => {
      return item.id !== id
    })

    specificList.array = newList

    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: specificList.array })
    getAllDate()
  }
  const [playSound, setPlaySound] = useState(false)
  const blurHandler = async () => {
    playSound && playMoney()
    setListLoading(true)
    const { array, id: ID } = specificList
    const specificItemInDb = doc(db, collectionName, ID)
    await updateDoc(specificItemInDb, { array: array })
    getAllDate()
    setLoading(false)
    setPlaySound(false)
  }

  const inputHandler = async (e) => {
    const inpVal = e.target.value
    setPlaySound(false)

    const [id, index, price] = e.target.name.split('-')

    const { array } = specificList?.array.find((item) => {
      return item.id === +id
    })
    if (!index && !price) {
      specificList.array[id - 1].title = inpVal
    }

    if (index && price && !isNaN(inpVal)) {
      array[index].planned = inpVal
      if (inpVal === '') {
        array[index].planned = 0
      }
      setPlaySound(true)
    }
    if (index && !price) {
      array[index].title = inpVal
    }

    // eslint-disable-next-line
    allDate.find((item) => {
      if (item.id === specificList.id) {
        item.array = specificList.array
      }
    })
    setAllDate([...allDate])
  }

  const makeDataForChart = () => {
    const ChartData = []
    // eslint-disable-next-line
    specificList?.array.map((item) => {
      const { sum } = item?.array.reduce(
        (total, item) => {
          const { planned } = item
          total.sum += +planned

          return total
        },
        { sum: 0 }
      )
      ChartData.push({
        type: lengthChecker(item.title),
        planned: sum,
      })
    })

    return ChartData
  }

  const calculateBalance = () => {
    const { sum } = makeDataForChart().reduce(
      (total, item) => {
        const { planned } = item
        total.sum += +planned

        return total
      },
      { sum: 0 }
    )
    const income = makeDataForChart()[0]?.planned

    return {
      balance: isNanChecker(income * 2 - sum),
      income: income,
      spent: sum - income,
    }
  }
  const spentAndIncome = async () => {
    if (
      calculateBalance().income !== undefined &&
      !listLoading &&
      specificList?.array
    ) {
      const specificItemInDb = doc(db, collectionName, specificList.id)
      await updateDoc(specificItemInDb, {
        spent: calculateBalance().spent,
        income: calculateBalance().income,
      })
    }
  }
  useEffect(() => {
    spentAndIncome()
    // eslint-disable-next-line
  }, [calculateBalance().balance])

  const [info, setInfo] = useLocalStorage('info', null)
  const giveInfo = (title, subTitle, index, id) => {
    setInfo({ title, subTitle, index, id })
  }

  const [pieTitle, setPieTitle] = useState('')
  const [pieValue, setPieValue] = useState('')

  const ctxVal = {
    playMoney,
    monthNow,
    yearNow,
    monthExpanded,
    toggleExpandMonth,
    thisMonth,
    thisYear,
    setThisYear,
    setThisMonth,
    name,
    addItemHandler,
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
    loading,
    listLoading,
    blurHandler,
  }

  return <DataContext.Provider value={ctxVal}>{children}</DataContext.Provider>
}

export const useDataContext = () => {
  return useContext(DataContext)
}

export { DataContext, DataProvider }
