import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function ResetBtn({ onClick, startIcon, children, type }) {
  return (
    <ResetButton
      type={type || 'button'}
      onClick={onClick}
      startIcon={startIcon}
    >
      {children}
    </ResetButton>
  )
}

const ResetButton = styled(Button)(() => ({
  padding: ' 1rem',
  fontSize: '.9rem',
  textTransform: 'capitalize',
  margin: '1.5rem auto',
  display: 'flex',
  justifyContent: 'start',
  color: 'var(--bg-s-800)',
  fontWeight: '700',
  '*': {
    cursor: 'pointer',
  },
}))
