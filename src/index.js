import React from 'react'
import ReactDOM from 'react-dom/client'

//date picker
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { DateProvider } from './context/DateContext'
import { AuthProvider } from './context/AuthContext'
import App from './App'

import './global/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <AuthProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </AuthProvider>
  </LocalizationProvider>
)
