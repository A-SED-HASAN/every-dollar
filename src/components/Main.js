import React from 'react'
import { styled } from '@mui/material/styles'
import { Navbar, RightDrawer } from './'
import { useHref } from 'react-router-dom'

import { Budget, Goals, Insights } from '../routes'
const Main = () => {
  const href = useHref().slice(1)

  return (
    <Wrapper>
      <Navbar />
      {href === 'budget' && <Budget />}
      {href === 'goals' && <Goals />}
      {href === 'insights' && <Insights />}
      <RightDrawer />
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
