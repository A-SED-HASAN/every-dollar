import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function AddBtn({ onClick, startIcon, children }) {
  return (
    <AddButton onClick={onClick} startIcon={startIcon}>
      {children}
    </AddButton>
  )
}

const AddButton = styled(Button)(() => ({
  margin: '1.5rem auto',
  display: 'flex',
  justifyContent: 'start',
  color: 'var(--bg-s-800)',
  fontWeight: '700',
  width: '100%',
  maxWidth: '720px',
  border: '1px dashed var(--text-100)',
  padding: ' 1.5rem',
  fontSize: '1rem',
  '*': {
    cursor: 'pointer',
  },
}))
