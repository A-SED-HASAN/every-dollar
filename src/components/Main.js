import React from 'react'
import { styled } from '@mui/material/styles'
import { Navbar, RightCard } from './'
import { Route, Routes } from 'react-router-dom'

import { Budget } from '../routes'

const Main = () => {
  return (
    <Wrapper>
      <Navbar width={230} />
      <div className='item'>
        <Routes>
          <Route path='/budget' element={<Budget />} />
          <Route path='/paycheck-planning' element={<h1>paycheck</h1>} />
          <Route path='/goals' element={<h1>goals</h1>} />
          <Route path='/roadMap' element={<h1>roadMap</h1>} />
          <Route path='/insights' element={<h1>insights</h1>} />
          <Route path='/ramesy-pros' element={<h1>coaching</h1>} />
          <Route path='/learn' element={<h1>learn</h1>} />
          <Route path='/ask-a-coach' element={<h1>coaching</h1>} />
          <Route path='/settings' element={<h1>settings</h1>} />
        </Routes>
      </div>

      <div className='item'>
        <RightCard />
      </div>
    </Wrapper>
  )
}

export default Main

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr .3fr',
  '.item': {
    padding: '1.5rem',
    border: '1px solid red',
  },

  // '@media (width<= 350px)': {},
}))
