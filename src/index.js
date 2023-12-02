import React from 'react'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DataProvider, AuthProvider, GlobalProvider } from './context'
import App from './App'

import './global/index.css'

const root = createRoot(document.getElementById('root'))
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
