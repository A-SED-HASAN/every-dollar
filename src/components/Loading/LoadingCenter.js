import { CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const LoadingCenter = () => {
  return (
    <Wrapper>
      <div>
        <CircularProgress sx={{ color: 'var(--bg-s-800)' }} size='4rem' />
        loading ...
      </div>
    </Wrapper>
  )
}

export default LoadingCenter

const Wrapper = styled('div')(({ float }) => ({
  display: 'grid',
  placeItems: 'center',
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    fontSize: '1rem',
    fontWight: '600',
  },
}))
