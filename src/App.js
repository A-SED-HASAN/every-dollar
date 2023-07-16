import React from 'react'

import { Main } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Error, SignIn, PrivateRoute } from './routes'

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
          <Route path='/budget' element={<h1>budget</h1>} />
          <Route path='/paycheck-planning' element={<h1>paycheck</h1>} />
          <Route path='/goals' element={<h1>goals</h1>} />
          <Route path='/roadMap' element={<h1>roadMap</h1>} />
          <Route path='/insights' element={<h1>insights</h1>} />
          <Route path='/ramsey-pros' element={<h1>coaching</h1>} />
          <Route path='/learn' element={<h1>learn</h1>} />
          <Route path='/ask-a-coach' element={<h1>coaching</h1>} />
          <Route path='/settings' element={<h1>settings</h1>} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
