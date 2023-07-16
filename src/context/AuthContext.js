import React, { useContext, createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [authUser, setAuthUser] = useState(null)

  const [error, setError] = useState('')
  const [pending, setPending] = useState(true)
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        setPending(false)
      } else {
        setAuthUser(null)
        setPending(false)
      }

      return () => {
        listen()
      }
    })
  }, [])

  const existingUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential.user)
        // ...
      })
      .catch((error) => {
        setError(error.code.slice(5))
      })
  }

  const newUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setAuthUser(userCredential.user)

        // ...
      })
      .catch((error) => {
        setError(error.code.slice(5))

        // ..
      })
  }

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
        existingUser,
        newUser,
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
