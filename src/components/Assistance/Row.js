import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'

const Row = ({ title }) => {
  return (
    <Wrapper>
      Row
      <Divider />
    </Wrapper>
  )
}

export default Row

const Wrapper = styled('div')(() => ({}))
