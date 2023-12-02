import React, { useState } from 'react'
import moment from 'moment/moment.js'
import { useForm, Controller } from 'react-hook-form'
import { updateProfile } from 'firebase/auth'

import { styled } from '@mui/material/styles'
import {
  Button,
  Divider,
  Link,
  OutlinedInput,
  FormControl,
  InputLabel,
} from '@mui/material'
import { useAuthContext, useDataContext } from '../context'
import { user } from '../assets/images'
import { LoadingCenter } from '../components'
export default function Settings() {
  const { authUser } = useAuthContext()
  const { loading } = useDataContext()

  const { email, displayName, emailVerified, reloadUserInfo } = authUser

  const [showChanges, setShowChanges] = useState(false)

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data) => {
    updateProfile(authUser, {
      displayName: data.name,
    })
      .then(() => {
        setShowChanges(false)
      })
      .catch((error) => {})
  }

  if (loading) {
    return <LoadingCenter />
  }
  return (
    <Wrapper>
      <h1>Settings </h1>
      <div className='grid-container'>
        <div className='col'>
          <SeCard color='blue' main title='profile info'>
            <div className='info'>
              <p>{displayName ? displayName : 'John Doe'}</p>
              <p>{email}</p>
            </div>
            <Divider sx={{ margin: '1rem 0' }} />
            <div className='email-info info'>
              <p>
                <span>user created at :</span>
                {moment(+reloadUserInfo?.createdAt).format(' MMMM / DD / YYYY')}
              </p>
              <p>
                <span>last Login At : </span>
                {moment(+reloadUserInfo?.lastLoginAt).fromNow()}
              </p>
              <p>
                <span>email Verified : </span>
                {emailVerified ? 'yes' : 'no'}
              </p>
              <p>
                <span>disabled : </span>
                {reloadUserInfo?.disabled ? 'yes' : 'no'}
              </p>
            </div>
          </SeCard>
          {showChanges && (
            <SeCard bold color='blue' title='change profile info'>
              <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <FormControl variant='outlined' fullWidth {...field}>
                      <InputLabel htmlFor='name'>name</InputLabel>
                      <OutlinedInput id='name' label='name' />
                    </FormControl>
                  )}
                />
                <p>password and ....</p>
                <Btn type='submit'>submit</Btn>
              </form>
            </SeCard>
          )}
        </div>
        <div className='col'>
          <SeCard bold color='black' title='change your setting'>
            <div className='info'>
              <p>Update your profile or change your password here.</p>
            </div>

            <Btn
              variant='contained'
              onClick={() => setShowChanges((prev) => !prev)}
            >
              manage your account
            </Btn>
          </SeCard>

          <SeCard
            color='blue'
            title='Budget Easier and Faster with Premium Features'
          >
            <div className='info'>
              <p>
                Stream transactions from your bank to your budget, monitor bank
                balances, and get priority support.
              </p>
            </div>
            <Btn variant='contained'>upgrade to premium</Btn>
          </SeCard>

          <SeCard bold color='black' title='GOT A VOUCHER?'>
            <div className='info'>
              <Link
                href='#no_where'
                underline='hover'
                sx={{
                  fontSize: '1.1rem',
                  color: 'var(--bg-s-700)',
                  cursor: 'pointer',
                }}
              >
                Redeem Your Voucher
              </Link>
            </div>
          </SeCard>
        </div>
      </div>
    </Wrapper>
  )
}

function SeCard({ style, children, main, title, color, bold, hidden_form }) {
  return (
    <SeCardWrapper style={style} color={color} bold={bold}>
      {main ? (
        <div className='flex'>
          <img src={user} alt='user' />
          <h2>{title}</h2>
        </div>
      ) : (
        <h2>{title}</h2>
      )}

      {children}
    </SeCardWrapper>
  )
}

const SeCardWrapper = styled('div')(({ color, bold }) => ({
  background: 'var(--card-bg)',
  borderRadius: 'var(--radius)',
  padding: '1rem',
  textAlign: 'center',
  '.flex': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    img: {
      width: '44px',
    },
  },
  h2: {
    color: color === 'blue' ? 'var(--bg-s-700)' : 'var(--text-500)',
    fontWeight: bold ? '700' : '500',
  },
  '.info': {
    color: 'var(--text-700)',
    fontWeight: '600',
    fontSize: '1rem',
    lineHeight: '2',
  },
  '.email-info': {
    p: {
      color: 'var(--text-800)',
      span: {
        color: 'var(--bg-s-700)',
      },
    },
  },
  '.form': {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
}))

const Wrapper = styled('section')(() => ({
  padding: '1.5rem',
  '.grid-container': {
    maxWidth: '1400px',
    margin: 'auto',
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    '.col': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  h1: {
    color: 'var(--text-800)',
    fontSize: '2.5rem',
  },

  '@media (width<= 1200px)': {
    padding: '.9rem',
  },
  '@media (width<=960px)': {
    '.grid-container': {
      gridTemplateColumns: '1fr ',
    },
  },
}))

const Btn = styled(Button)(() => ({
  color: 'var(--card-bg)',
  background: 'var(--bg-s-800)',
  textTransform: 'capitalize',
  padding: '.9rem 2.7rem',
  fontSize: '.9rem',
  fontWeight: '600',
  margin: '1rem auto 0',
  ':hover': {
    background: 'var(--bg-s-850)',
  },
}))
