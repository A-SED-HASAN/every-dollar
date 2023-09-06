import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Navbar, RightDrawer } from './'
import { Outlet, useHref, useNavigate } from 'react-router-dom'

export default function Main() {
  const href = useHref().slice(1)
  const nav = useNavigate()

  useEffect(() => {
    nav('budget')
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
      {href === 'budget' && <RightDrawer />}
    </Wrapper>
  )
}

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
}))
