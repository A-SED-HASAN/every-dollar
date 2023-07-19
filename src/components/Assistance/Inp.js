import React from 'react'
import { styled } from '@mui/material/styles'
// import { formatMoney } from '../../functions'
import { useDateContext } from '../../context/DateContext'
const Inp = ({ seconde, value, name, className }) => {
  const { inputHandler } = useDateContext()
  return (
    <Input
      className={className}
      style={{ background: value === 0 && 'var(--bg-main)' }}
      seconde={seconde}
      onChange={(e) => inputHandler(e)}
      value={value}
      type='text'
      name={name}
    />
  )
}

export default Inp

const Input = styled('input')(({ seconde }) => ({
  border: '1px solid var(--card-bg)',
  width: seconde ? '50%' : '100%',
  minWidth: '100px',
  maxWidth: '300px',
  outline: 'none',
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
