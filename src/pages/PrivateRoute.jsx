import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context'

export default function PrivateRoute({ children }) {
  const { authUser } = useAuthContext()

  return !authUser ? <Navigate to='sign-in' replace /> : children
}
