import React from 'react'
import { styled } from '@mui/material/styles'
import { useDataContext } from '../../context'
export default function Inp({ seconde, value, name, className }) {
  const { inputHandler, blurHandler, listLoading } = useDataContext()

  return (
    <Input
      disabled={listLoading}
      onBlurCapture={blurHandler}
      className={className}
      style={{ background: value === 0 && 'var(--bg-main)' }}
      seconde={seconde}
      onChange={(e) => inputHandler(e)}
      onFocus={(e) => e.target.select()}
      value={value}
      type='text'
      name={name}
    />
  )
}

const Input = styled('input')(({ seconde }) => ({
  border: '1px solid var(--card-bg)',
  width: seconde ? '50%' : '100%',
  minWidth: '100px',
  maxWidth: '190px',
  outline: 'none',
  textAlign: seconde && 'center',
  backgroundColor: 'var(--card-bg)',
  fontSize: '1.1rem',
  padding: '.3rem',
  borderRadius: 'var(--light-radius)',
  ':hover': {
    background: 'var(--bg-main)',
    cursor: 'text',
  },
  ':focus': {
    border: '1px solid var(--bg-s-700)',
    color: 'var(--bg-s-500)',
    background: 'var(--bg-card)',
  },
}))
