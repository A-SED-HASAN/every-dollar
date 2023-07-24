import React, { useContext, createContext, useState } from 'react'
import { useLocalStorage } from '../hook'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
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
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [goalList, setGoalList] = useLocalStorage('goalList', [])
  const resetGoals = () => {
    setGoalList([...[]])
  }
  return (
    <GlobalContext.Provider
      value={{
        drawerOpen,
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
        goalList,
        setGoalList,
        resetGoals,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
