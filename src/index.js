import React from 'react'
import ReactDOM from 'react-dom/client'
import { DateProvider } from './context/DateContext'
import { AuthProvider } from './context/AuthContext'
import App from './App'

import './global/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </AuthProvider>
  </React.StrictMode>
)
