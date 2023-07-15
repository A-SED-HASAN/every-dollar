import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, Months, Remain } from '../../components'
import { formatMoney } from '../../functions'

const Budget = () => {
  return (
    <Wrapper>
      <Months />
      <Remain amount={formatMoney(7343)} />
      <Card title='income' month='july'>
        ali
      </Card>
    </Wrapper>
  )
}

export default Budget

const Wrapper = styled('div')(() => ({
  // background: 'black',
  width: '100%',
  height: '100vh',
  '@media (width<= 350px)': {},
}))
