import React from 'react'

import { Main } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  Error,
  SignIn,
  PrivateRoute,
  Budget,
  Goals,
  Insights,
  Settings,
  TreeMap,
} from './routes'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }>
          <Route path='/budget' element={<Budget />} />
          <Route path='/paycheck-planning' />
          <Route path='/goals' element={<Goals />} />
          <Route path='/tree-map' element={<TreeMap />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='/ramsey-pros' />
          <Route path='/learn' />
          <Route path='/ask-a-coach' />
          <Route path='/settings' element={<Settings />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}
