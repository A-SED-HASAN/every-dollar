import React from 'react'
import { styled } from '@mui/material/styles'
import { Link, useHref } from 'react-router-dom'
import { navigation } from '../../assets/constants'
import { dollarImg } from '../../assets/images'
import { Divider } from '@mui/material'
const Navbar = ({ width }) => {
  const href = useHref().slice(1)
  const docWidth = window.innerWidth

  return (
    <Wrapper width={width}>
      <div className='img-wrapper'>
        <img src={dollarImg} alt='dollarImg' />
      </div>
      <Divider />
      <div className='flex'>
        <ul>
          {navigation.map((item) => {
            const { id, title, icon, to, disIcon } = item
            return (
              <LinkRow
                key={id}
                to={to}
                className={`${href === to ? 'active' : null}`}>
                {href === to ? icon : disIcon || icon}
                {title}
              </LinkRow>
            )
          })}
        </ul>
        <div>end</div>
      </div>
    </Wrapper>
  )
}

export default Navbar

const LinkRow = styled(Link)(() => ({
  cursor: 'pointer',
  color: 'var(--text-700)',
  fontWeight: '500',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.7rem',
  padding: '1rem 0 1rem 1rem',
  ':hover': {
    color: 'var(--bg-p-500)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const Wrapper = styled('nav')(({ width }) => ({
  width: `${width}px`,
  height: '100%',
  overflow: 'auto',
  '.img-wrapper': {
    background: 'var(--card-bg)',
    display: 'grid',
    placeItems: 'center',
    img: {
      width: '60%',
      padding: '2rem',
      textAlign: 'center',
    },
  },
  '.flex': {
    height: '87%',
    overflow: 'auto',
    background: 'var(--card-bg)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    ul: {
      paddingTop: '1.4rem',
      paddingLeft: '.7rem',
      display: 'flex',
      flexDirection: 'column',
      '.active': {
        color: 'var(--bg-s-400)',
        fontWeight: '700',
      },
    },
  },
}))
