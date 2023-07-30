import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Navbar, RightDrawer } from './'
import { useHref, useNavigate } from 'react-router-dom'

import { Budget, Goals, Insights } from '../routes'
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
      {href === 'budget' && <Budget />}
      {href === 'budget' && <RightDrawer />}

      {href === 'goals' && <Goals />}
      {href === 'insights' && <Insights />}
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
