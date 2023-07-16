import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthContext()

  if (!authUser) {
    return <Navigate to='sign-in' replace />
  } else {
    return children
  }
}
export default PrivateRoute
