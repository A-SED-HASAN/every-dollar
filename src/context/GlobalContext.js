import React, { useContext, createContext, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthContext } from './AuthContext.js'
import { useLocalStorage } from '../hook'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const { authUser } = useAuthContext()

  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)

  const [openReset, setOpenReset] = useState(false)

  const handleOpenReset = () => setOpenReset(true)
  const handleCloseReset = () => setOpenReset(false)

  const [openTrans, setOpenTrans] = useState(false)

  const handleOpenTrans = () => setOpenTrans(true)
  const handleCloseTrans = () => setOpenTrans(false)

  const [openGoal, setOpenGoal] = useState(false)
  const handleOpenGoal = () => setOpenGoal(true)
  const handleCloseGoal = () => setOpenGoal(false)

  const goalCollectionRef = collection(db, `${authUser?.uid}:GOAL`)

  const [goalList, setGoalList] = useState([])
  const [goalListLoading, setGoalListLoading] = useState(true)

  const getGoal = async () => {
    setGoalListLoading(true)
    const data = await getDocs(goalCollectionRef)
    setGoalList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
    setGoalListLoading(false)
  }

  const [drawerOpen, setDrawerOpen] = useState(true)
  const drawerToggleHandler = () => {
    setDrawerOpen((prev) => !prev)
  }

  const [isBarChart, setIsBarChart] = useLocalStorage('isBarChart', true)
  const toggleChartMode = () => setIsBarChart((prev) => !prev)

  const transCollectionRef = collection(db, `${authUser?.uid}:TRANS`)

  const [transList, setTransList] = useState([])
  const [transListLoading, setTransListLoading] = useState(true)

  const getTrans = async () => {
    setTransListLoading(true)
    const data = await getDocs(transCollectionRef)
    setTransList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
    setTransListLoading(false)
  }

  return (
    <GlobalContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        openDelete,
        handleCloseDelete,
        handleOpenDelete,
        openReset,
        handleCloseReset,
        handleOpenReset,
        openTrans,
        handleOpenTrans,
        handleCloseTrans,
        openGoal,
        handleOpenGoal,
        handleCloseGoal,
        goalCollectionRef,
        getGoal,
        goalList,
        goalListLoading,
        drawerToggleHandler,
        isBarChart,
        toggleChartMode,
        transCollectionRef,
        transList,
        transListLoading,
        getTrans,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
