import React, { useContext, createContext, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthContext } from './AuthContext.js'

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

  // eslint-disable-next-line
  const [drawerOpen, setDrawerOpen] = useState(true)

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
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
