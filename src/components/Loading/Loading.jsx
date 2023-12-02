import React from 'react'
import { styled } from '@mui/material/styles'
import { dollarLoad, ramseyWhite } from '../../assets/images'
export default function Loading() {
  return (
    <Wrapper>
      <div>
        <img src={dollarLoad} alt='dollar loading' />
        <p>loading ...</p>
      </div>
      <article className='ramsey'>
        <p>from</p>
        <img src={ramseyWhite} alt='ramseyWhite' />
      </article>
    </Wrapper>
  )
}

const Wrapper = styled('section')(() => ({
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  background: 'var(--bg-p-500)',
  position: 'fixed',
  width: '100vw',
  zIndex: '1000',
  '>div': {
    color: 'white',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '3rem',
    p: { fontSize: '2rem' },
    img: {
      width: '80%',
    },
  },
  ' .ramsey': {
    position: 'fixed',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    p: {
      fontSize: '1rem',
      textAlign: 'center',
      color: 'white',
      padding: '.5rem 0',
    },
  },
}))
