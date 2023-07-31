import React, { useContext, createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { useLocalStorage } from '../hook'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [authUser, setAuthUser] = useLocalStorage('authUser', null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(true)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
      setPending(false)

      return () => {
        listen()
      }
    })
    // eslint-disable-next-line
  }, [])

  const userWantExit = () => {
    signOut(auth)
      .then(() => console.log('out'))
      .catch((e) => console.log(e))
  }
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        authUser,
        setAuthUser,
        error,
        setError,
        pending,
        userWantExit,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthContext, AuthProvider }
