import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { HomeOutlinedIcon } from '../../assets/icons'

const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>Error</h1>
        <p>
          This application has no explicit mapping for /Error, so you are seeing
          this as a fallback.
        </p>

        <Btn size='large' variant='contained'>
          loading
        </Btn>
      </div>
    </Wrapper>
  )
}

export default Error
const Btn = styled(Button)(() => ({
  // background: 'var(--bg-p-500)',
  // ':hover': {
  //   background: 'var(--bg-p-600)',
  // },

  '*': {
    cursor: 'pointer',
  },
}))
const Wrapper = styled('section')(() => ({
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  background: 'var(--bg-p-400)',

  div: {
    color: 'white',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.5rem',

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
