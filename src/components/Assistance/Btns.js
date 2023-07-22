import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export function AddBtn({ onClick, startIcon, children }) {
  return (
    <AddGroupBtn onClick={onClick} startIcon={startIcon}>
      {children}
    </AddGroupBtn>
  )
}
export function ResetBtn({ onClick, startIcon, children, type }) {
  return (
    <ResetBtnS type={type || 'button'} onClick={onClick} startIcon={startIcon}>
      {children}
    </ResetBtnS>
  )
}

const Btn = styled(Button)(() => ({
  margin: '1.5rem auto',
  display: 'flex',
  justifyContent: 'start',
  color: 'var(--bg-s-800)',
  fontWeight: '700',
  '*': {
    cursor: 'pointer',
  },
}))
const AddGroupBtn = styled(Btn)(() => ({
  width: '100%',
  maxWidth: '720px',
  border: '1px dashed var(--text-100)',
  padding: ' 1.5rem',
  fontSize: '1rem',
}))
const ResetBtnS = styled(Btn)(() => ({
  padding: ' 1rem',
  fontSize: '.9rem',
  textTransform: 'capitalize',
}))
