import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Btn } from './SignIn'
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>Error</h1>
        <p>
          This application has no explicit mapping for /Error, so you are seeing
          this as a fallback.
        </p>
        <Link to='/budget' style={{ width: '30vw' }}>
          <Btn
            sx={{
              background: 'var(--text-600)',
              ':hover': { background: 'var(--text-700)' },
            }}
            fullWidth
            size='large'
            variant='contained'>
            Back
          </Btn>
        </Link>
      </div>
    </Wrapper>
  )
}

export default Error

const Wrapper = styled('section')(() => ({
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
  background: 'var(--bg-main)',

  div: {
    color: 'var(--text-800)',
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
