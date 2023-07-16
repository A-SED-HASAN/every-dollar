import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, Months, Remain } from '../../components'
import { formatMoney } from '../../functions'
import { useAuthContext } from '../../context/AuthContext'
const Budget = () => {
  const { authUser, userWantExit } = useAuthContext()
  return (
    <Wrapper>
      <Months />
      <button onClick={userWantExit}>log out</button>
      {authUser.email}
      <Remain amount={formatMoney(7343)} />
      <Card title='income' month='july'></Card>
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
