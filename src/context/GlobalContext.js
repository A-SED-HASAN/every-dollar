import React, { useContext, createContext, useState, useEffect } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const resize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [width])

  // eslint-disable-next-line
  const [drawerOpen, setDrawerOpen] = useState(true)
  return (
    <GlobalContext.Provider value={{ drawerOpen, width }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalProvider }
