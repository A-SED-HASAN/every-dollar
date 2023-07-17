import React from 'react'

import { Main } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Error, SignIn, PrivateRoute, Budget } from './routes'

const App = () => {
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
          <Route path='/budget' />
          <Route path='/paycheck-planning' />
          <Route path='/goals' />
          <Route path='/roadMap' />
          <Route path='/insights' />
          <Route path='/ramsey-pros' />
          <Route path='/learn' />
          <Route path='/ask-a-coach' />
          <Route path='/settings' />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
