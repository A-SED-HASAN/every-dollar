import React, { useContext, createContext, useState, useEffect } from 'react'

const GlobalContext = createContext()
const GlobalProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)

  const [openReset, setOpenReset] = useState(false)

  const handleOpenReset = () => {
    setOpenReset(true)
  }
  const handleCloseReset = () => {
    setOpenReset(false)
  }

  const [openTrans, setOpenTrans] = useState(false)

  const handleOpenTrans = () => setOpenTrans(true)
  const handleCloseTrans = () => setOpenTrans(false)

  // eslint-disable-next-line
  const [drawerOpen, setDrawerOpen] = useState(true)
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
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
