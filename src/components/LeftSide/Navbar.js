import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

import MuiDrawer from '@mui/material/Drawer'
import { Button, Divider, Tooltip } from '@mui/material'
import { Link, useHref } from 'react-router-dom'

import { navigation } from '../../assets/constants'
import { dollarImg } from '../../assets/images'
import { LogoutOutlinedIcon } from '../../assets/icons'
import { useAuthContext } from '../../context/AuthContext'

import { AccAvatar } from '../'
const drawerWidth = 240

export default function MiniDrawer() {
  const href = useHref().slice(1)
  const { authUser, userWantExit } = useAuthContext()

  const [open, setOpen] = useState(false)

  const handleDrawer = () => {
    if (window.innerWidth >= 1330) {
      setOpen((prev) => !prev)
    }
  }
  useEffect(() => {
    if (window.innerWidth < 1330) setOpen(false)
    // eslint-disable-next-line
  }, [window.innerWidth])
  return (
    <Drawer sx={{ zIndex: '100' }} variant='permanent' open={open}>
      <DrawerHeader>
        <img
          style={{
            width: open ? '70%' : '100%',
            margin: 'auto',
            padding: open ? '2rem ' : '1rem 0',
            cursor: 'pointer',
          }}
          src={dollarImg}
          alt='dollarImg'
          onClick={handleDrawer}
        />
      </DrawerHeader>
      <Divider />
      <FlexWrapper open={open}>
        <div
          style={{
            textAlign: 'center',
            maxHeight: '73vh',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}>
          {navigation.map((item) => {
            const { id, title, icon, to, disIcon } = item
            return (
              <LinkRow
                key={id}
                to={to}
                className={`${href === to ? 'active' : null}`}>
                {href === to ? icon : disIcon || icon}
                {open && title}
              </LinkRow>
            )
          })}
        </div>
        <div className='account'>
          <AccAvatar name={`${authUser.email}`} />
          {open && (
            <Tooltip title={authUser.email} arrow>
              <p> {authUser.displayName}</p>
            </Tooltip>
          )}
          <Btn size='small' color='error' onClick={userWantExit}>
            <LogoutOutlinedIcon />
          </Btn>
        </div>
      </FlexWrapper>
    </Drawer>
  )
}

const LinkRow = styled(Link)(() => ({
  margin: 'auto',
  cursor: 'pointer',
  color: 'var(--text-500)',
  fontWeight: '500',
  fontSize: '.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.7rem',
  padding: '1rem 0 .5rem 1rem',
  ':hover': {
    color: 'var(--bg-p-500)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const FlexWrapper = styled('div')(({ open }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
  '.account': {
    display: 'flex',
    flexDirection: open ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid var(--text-50)',
    padding: open ? '.5rem .2rem 0' : '.5rem 0 0',
    gap: '.3rem',
    p: {
      fontWeight: '600',
      color: 'var(--text-600)',
    },
  },
}))

const Btn = styled(Button)(() => ({
  '*': { cursor: 'pointer' },
}))

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  display: 'flex',
  '.active': {
    fontWeight: '600',
    color: 'var(--bg-s-500)',
  },
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
