import { Divider } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'

const Remain = ({ amount }) => {
  return (
    <Wrapper>
      <p>
        <span>{amount}</span> left to budget
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
