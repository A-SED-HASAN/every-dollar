import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Navbar, RightDrawer } from './'
import { Outlet, useHref, useNavigate, Routes, Route } from 'react-router-dom'

import { Budget, Goals, Insights, Settings, RoadMap } from '../routes'
const Main = () => {
  const href = useHref().slice(1)
  const nav = useNavigate()

  useEffect(() => {
    nav('budget')
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <Navbar />
      <Routes>
        <Route path='/budget' element={<Budget />} />
        <Route path='/paycheck-planning' />
        <Route path='/goals' element={<Goals />} />
        <Route path='/roadMap' element={<RoadMap />} />
        <Route path='/insights' element={<Insights />} />
        <Route path='/ramsey-pros' />
        <Route path='/learn' />
        <Route path='/ask-a-coach' />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      {href === 'budget' && <RightDrawer />}

      <Outlet />
    </Wrapper>
  )
}

export default Main

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
}))
