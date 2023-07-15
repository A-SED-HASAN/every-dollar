import React from 'react'
import { styled } from '@mui/material/styles'

const SingleMonth = ({ name }) => {
  return (
    <Wrapper>
      <h5>{name.slice(0, 3)}</h5>
      <p>2023</p>
    </Wrapper>
  )
}

export default SingleMonth

const Wrapper = styled('article')(() => ({
  border: '1px dashed var(--text-800)',
  textAlign: 'center',
  padding: '.5rem 2rem',
  borderRadius: 'var(--light-radius)',
  h5: {
    fontWeight: '600',
    color: 'var(--text-500)',
    fontSize: '1rem',
  },
  p: {
    color: 'var(--text-500)',
    fontSize: '.6rem',
  },
}))
