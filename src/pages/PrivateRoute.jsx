import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context'

export default function PrivateRoute({ children }) {
  const { authUser } = useAuthContext()

  if (!authUser) {
    return <Navigate to='sign-in' replace />
  } else {
    return children
  }
}
