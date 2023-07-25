import React, { useContext, createContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hook'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore'
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

  const goalCollectionRef = collection(db, 'Goal')

  // await addDoc(todoCollectionRef, {
  //     text: inputText,
  //     isCompleted: false,
  //     isImportant: special ? true : false,
  //     note: '',
  //     createdAt: new Date().getTime().toString(),
  //     doneAt: '',
  //   })

  // await getDocs(todoCollectionRef)

  //  await updateDoc(specificItem, {
  //   isCompleted: true,
  //   doneAt: new Date().getTime().toString(),
  // })

  //  await deleteDoc(specificItem)

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
        goalCollectionRef,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
