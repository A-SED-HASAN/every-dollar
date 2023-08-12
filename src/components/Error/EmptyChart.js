import React from 'react'
import {
  ErrorOutlineOutlinedIcon,
  ArrowBackOutlinedIcon,
} from '../../assets/icons'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function EmptyChart({ errorText }) {
  return (
    <ErrorWrapper>
      <div>
        <h1>{errorText}</h1>
        <ErrorOutlineOutlinedIcon
          sx={{ fontSize: '9rem', color: 'var(--error)' }}
        />
        <Link to='/budget'>
          <Btn variant='outlined' startIcon={<ArrowBackOutlinedIcon />}>
            back to budget for planning
          </Btn>
        </Link>
      </div>
    </ErrorWrapper>
  )
}

const Btn = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  color: 'var(--bg-s-700)',
  border: '1px solid var(--bg-s-700)',
  padding: '1rem 2rem',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    color: 'var(--bg-s-800)',
    border: '1px solid var(--bg-s-800)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const ErrorWrapper = styled('div')(() => ({
  width: '100%',
  height: 'calc(100vh - 150px)',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  div: { display: 'grid', placeItems: 'center', gap: '1rem' },
}))
