import React from 'react'
import { styled } from '@mui/material/styles'
import { dollarLoad } from '../../assets/images'
const Refresh = () => {
  return (
    <Wrapper>
      <div>
        <img src={dollarLoad} alt='dollar loading' />
        <p>loading ...</p>
        <p>ramezu</p>
      </div>
    </Wrapper>
  )
}

export default Refresh

const Wrapper = styled('section')(() => ({
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  background: 'var(--bg-p-500)',

  div: {
    color: 'white',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '3rem',
    img: {
      width: '100%',
    },
    '@media (width<= 460px)': {
      h1: {
        fontSize: '1.1rem',
      },
      p: {
        fontSize: '.7rem',
      },
    },
  },
}))
