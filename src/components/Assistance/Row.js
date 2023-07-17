import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'

const Row = ({ title, planned }) => {
  return (
    <Wrapper planned={planned}>
      <div className='grid'>
        <span>{title}</span>
        <span>$230.00</span>
        {planned && <span style={{ justifySelf: 'end' }}>100%</span>}
      </div>
      <Divider />
    </Wrapper>
  )
}

export default Row

const Wrapper = styled('div')(({ planned }) => ({
  padding: '.3rem ',
  '.grid': {
    display: 'grid',
    gridTemplateColumns: planned ? '1fr .2fr .3fr' : '1fr .2fr ',
    padding: ' .4rem 0',
    span: {
      fontWeight: '600',
    },
  },
}))
