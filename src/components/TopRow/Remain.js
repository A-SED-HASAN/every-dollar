import React from 'react'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { formatMoney } from '../../functions'
const Remain = ({ amount }) => {
  return (
    <Wrapper>
      <p>
        <span style={{ color: amount < 0 && 'var(--error)' }}>
          {formatMoney(amount)}
        </span>
        {amount >= 0 ? ' left to' : ' over'} budget
      </p>
      <Divider />
    </Wrapper>
  )
}

export default Remain

const Wrapper = styled('div')(() => ({
  p: {
    color: 'var(--text-600)',
    fontWeight: '500',
    paddingBottom: '1rem',
  },
  span: {
    color: 'var(--text-800)',
    fontWeight: '700',
  },
  //   background: 'salmon',
}))
