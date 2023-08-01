import React from 'react'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { formatMoney } from '../../functions'
const Remain = ({ amount }) => {
  return (
    <Wrapper>
      <div>
        <p className='number' style={{ color: amount < 0 && 'var(--error)' }}>
          {formatMoney(amount)}
        </p>
        <p className='text'> {amount >= 0 ? ' left to' : ' over'} budget</p>
      </div>

      <Divider />
    </Wrapper>
  )
}

export default Remain

const Wrapper = styled('div')(() => ({
  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '.2rem',
    paddingBottom: '1rem',
  },
  p: {
    color: 'var(--text-500)',
    fontWeight: '500',
  },
  '.number': {
    color: 'var(--text-700)',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
}))
