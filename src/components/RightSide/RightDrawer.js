import React from 'react'
import { Box, Drawer } from '@mui/material'
import RightCard from './RightCard'
import { styled } from '@mui/material/styles'
import { useGlobalContext } from '../../context/GlobalContext'
import { useDataContext } from '../../context/DataContext'

export default function RightDrawer() {
  const { drawerOpen } = useGlobalContext()
  const { specificList } = useDataContext()

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerWrapper
        elevation={0}
        hideBackdrop
        variant='temporary'
        anchor='right'
        open={specificList?.array.length > 0 ? drawerOpen : false}>
        <RightCard />
      </DrawerWrapper>
    </Box>
  )
}

const DrawerWrapper = styled(Drawer)(() => ({
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
