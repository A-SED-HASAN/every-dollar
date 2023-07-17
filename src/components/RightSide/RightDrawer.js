import React, { useState, useEffect } from 'react'
import { Box, Drawer } from '@mui/material'
import RightCard from './RightCard'
import { styled } from '@mui/material/styles'

import { useDateContext } from '../../context/DateContext'

export default function RightDrawer() {
  const { drawerOpen } = useDateContext()
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerWrapper
        elevation
        hideBackdrop
        variant={width < 950 ? 'temporary' : 'persistent'}
        anchor='right'
        open={drawerOpen}>
        <RightCard />
      </DrawerWrapper>
    </Box>
  )
}

const DrawerWrapper = styled(Drawer)(({ width }) => ({
  width: '439px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    border: 'none',
    padding: '1.5rem',
    paddingLeft: '0rem',
    background: 'var(--bg-main)',
    width: '439px',
    '@media (width<= 1200px)': {
      padding: '.5rem',
      paddingLeft: '0rem',
    },
  },
}))
