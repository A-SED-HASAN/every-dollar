import React from 'react'
import ReactDOM from 'react-dom/client'

//date picker
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import { GlobalProvider } from './context/GlobalContext'

import App from './App'

import './global/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <AuthProvider>
      <GlobalProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </GlobalProvider>
    </AuthProvider>
  </LocalizationProvider>
)
