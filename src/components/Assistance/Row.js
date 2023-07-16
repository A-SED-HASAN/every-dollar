import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'

const Row = ({ title }) => {
  return (
    <Wrapper>
      <div className='grid'>
        <span>{title}</span>
        <span style={{ justifySelf: 'end' }}>2</span>
        <span style={{ justifySelf: 'end' }}>3</span>
      </div>
      <Divider />
    </Wrapper>
  )
}

export default Row

const Wrapper = styled('div')(() => ({
  padding: '.3rem ',
  '.grid': {
    // background: 'red',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: '0 0 .2rem',
    span: {
      fontWeight: '600',
    },
  },
}))
