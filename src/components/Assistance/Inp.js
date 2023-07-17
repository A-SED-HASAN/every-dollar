import React from 'react'
import { styled } from '@mui/material/styles'

const Inp = ({ seconde, value, onChange }) => {
  return (
    <Input seconde={seconde} onChange={onChange} value={value} type='text' />
  )
}

export default Inp

const Input = styled('input')(({ seconde }) => ({
  border: '1px solid var(--card-bg)',
  width: '100%',
  maxWidth: '336px',
  outline: 'none',
  backgroundColor: 'var(--card-bg)',
  fontSize: '1.1rem',
  padding: '.3rem',
  borderRadius: 'var(--light-radius)',
  textAlign: seconde && 'end',
  ':hover': {
    background: 'var(--text-50)',
    cursor: 'text',
  },
  ':focus': {
    border: '1px solid var(--bg-s-500)',
    color: 'var(--bg-s-500)',
    background: 'var(--bg-card)',
  },
}))
