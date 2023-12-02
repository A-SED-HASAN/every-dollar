import React from 'react'
import { Box, Drawer } from '@mui/material'
import { RightCard } from '..'
import { styled } from '@mui/material/styles'
import { useGlobalContext, useDataContext } from '../../context'

export default function RightDrawer() {
  const { drawerOpen, setDrawerOpen } = useGlobalContext()
  const { specificList, listLoading } = useDataContext()
  const width = window.innerWidth
  return (
    <Box sx={{ display: 'flex' }} className={listLoading ? 'loading' : null}>
      <DrawerWrapper
        width={width}
        elevation={0}
        onClose={() => setDrawerOpen(false)}
        variant={width < 900 ? 'temporary' : 'persistent'}
        anchor='right'
        open={specificList?.array.length > 0 ? drawerOpen : false}
      >
        <RightCard />
      </DrawerWrapper>
    </Box>
  )
}

const DrawerWrapper = styled(Drawer)(() => ({
  width: window.innerWidth < 900 ? '75vw' : '30vw',
  maxWidth: '439px',

  flexShrink: 0,

  '& .MuiDrawer-paper': {
    border: 'none',
    padding: '1.5rem',
    paddingLeft: '0rem',
    background: 'transparent',
    width: window.innerWidth < 900 ? '75vw' : '30vw',
    maxWidth: '439px',

    '@media (width<= 1200px)': {
      padding: '.5rem',
      paddingLeft: '0rem',
    },
  },
}))
