import { styled } from '@mui/material/styles'
import React from 'react'
import { CircleLoader } from '../../global'

export default function LoadingCenter() {
  return (
    <Wrapper>
      <div>
        <CircleLoader />
        loading ...
      </div>
    </Wrapper>
  )
}

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
