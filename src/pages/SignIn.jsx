import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { styled } from '@mui/material/styles'
import { ramseyBlue, everyDollar } from '../assets/images'
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Link,
  Divider,
  Alert,
} from '@mui/material'

import {
  VisibilityOutlinedIcon,
  VisibilityOffOutlinedIcon,
} from '../assets/icons'
import { useAuthContext } from '../context'
import { Loading } from '../components'
import { PrimaryBtn, IconBtn } from '../components/Styled/Button'

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setAuthUser,
    error,
    setError,
    pending,
  } = useAuthContext()

  const nav = useNavigate()

  const existingUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential.user)
        nav('/budget')
      })
      .catch((error) => {
        setError(error.code.slice(5))
      })
  }

  const newUser = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential.user)
        nav('/budget')
      })
      .catch((error) => {
        setError(error.code.slice(5))
      })
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((prev) => !prev)
  const handleMouseDownPassword = (e) => e.preventDefault()

  const [hasAccount, setHasAccount] = useState(true)

  useEffect(() => {
    setError('')
    setEmail('')
    setPassword('')
    // eslint-disable-next-line
  }, [hasAccount])

  if (pending) {
    return <Loading />
  }

  return (
    <Wrapper hasAccount={hasAccount}>
      <div className='img-container'>
        <img className='ramseyBlue' src={ramseyBlue} alt='ramseyBlue' />
        <img className='everyDollar' src={everyDollar} alt='everyDollar' />
      </div>

      <div className='container'>
        <h1>{hasAccount ? 'sign in' : 'create account'}</h1>
        <p>to continue to EveryDollar</p>
        {error && (
          <Alert sx={{ width: '100%' }} severity='warning' color='error'>
            {error}
          </Alert>
        )}
        <form onSubmit={(e) => (hasAccount ? existingUser(e) : newUser(e))}>
          <FormControl
            sx={{
              margin: '1rem 0',
              width: '100%',
            }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-email'>email</InputLabel>
            <OutlinedInp
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='outlined-adornment-email'
              endAdornment={<InputAdornment position='end'>@</InputAdornment>}
              aria-describedby='outlined-email-helper-text'
              inputProps={{
                'aria-label': 'email',
              }}
              label='email'
            />
          </FormControl>
          <FormControl
            sx={{ margin: '1rem 0', width: '100%' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInp
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconBtn
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconBtn>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <PrimaryBtn type='submit' variant='contained' fullWidth>
            {hasAccount ? 'sign in' : 'create'}
          </PrimaryBtn>
        </form>

        {hasAccount && (
          <LinkBtn weight='bold' underline='hover'>
            Forgot password ?
          </LinkBtn>
        )}

        {hasAccount && (
          <>
            <Divider sx={{ fontWeight: '700', mt: 2 }}> OR</Divider>
            <PrimaryBtn type='button' variant='outlined' fullWidth>
              login with SSO
            </PrimaryBtn>
          </>
        )}
      </div>

      <div className='end'>
        {hasAccount ? "Don't have an account?" : '  Already have an account?'}
        <LinkBtn underline='hover' onClick={() => setHasAccount(!hasAccount)}>
          {hasAccount ? ' Create an account.' : ' sign in'}
        </LinkBtn>
      </div>
    </Wrapper>
  )
}

const LinkBtn = styled(Link)(({ weight }) => ({
  color: 'var(--bg-s-700)',
  fontWeight: weight === 'bold' && '600',
  fontSize: weight === 'bold' && '1rem',
  cursor: 'pointer',
  ':hover': {
    color: 'var(--bg-s-800)',
  },
}))

const OutlinedInp = styled(OutlinedInput)(() => ({
  '*': {
    cursor: 'pointer',
  },
}))

const Wrapper = styled('section')(({ hasAccount }) => ({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
  background: 'var( --bg-main)',
  padding: '0 2rem 2rem ',
  '.img-container': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    margin: '1rem 0',
    '.ramseyBlue': {
      margin: 'auto',
      width: '80%',
    },
  },
  '.container': {
    alignSelf: 'start',
    textAlign: 'center',
    width: '100%',
    maxWidth: '512px',
    background: 'var( --card-bg)',
    padding: hasAccount ? ' 3rem 3rem 0' : '3rem 3rem 2rem',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--light-shadow)',
    marginBottom: '1rem',
    h1: { fontSize: '1.6rem' },
    p: { fontSize: '.9rem', fontWeight: '500', color: 'var(--text-600)' },
  },
  '.end': {
    alignSelf: 'start',
    fontWeight: '500',
    fontSize: '1rem',
  },
  '@media (width<= 700px)': {
    '.container': {
      padding: '1rem',
      h1: { fontSize: '1.5rem' },
      p: { fontSize: '.8rem' },
    },
    '.end': {
      fontSize: '.8rem',
    },
  },
  input: {
    textTransform: 'lowercase',
  },
}))
