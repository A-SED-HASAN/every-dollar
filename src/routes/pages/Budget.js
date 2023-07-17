import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, Months, Remain } from '../../components'
import { formatMoney } from '../../functions'
import { useDateContext } from '../../context/DateContext'
const Budget = () => {
  const { name } = useDateContext()
  const init = [
    {
      id: 1,
      title: 'income',
      month: name,
      array: [
        { title: 'paycheck 1', value: 0 },
        { title: 'paycheck 2', value: 0 },
      ],
    },
    {
      id: 2,
      title: 'giving',
      array: [
        { title: 'church', value: 0 },
        { title: 'charity', value: 0 },
      ],
    },
    {
      id: 3,
      title: 'saving',
      array: [{ title: 'Emergency Fund', value: 0 }],
    },
    {
      id: 4,
      title: 'Bills & Subscriptions',
      array: [
        { title: 'Mortgage/Rent', value: 0 },
        { title: 'water', value: 0 },
        { title: 'natural gas', value: 0 },
        { title: 'Electricity', value: 0 },
        { title: 'internet', value: 0 },
        { title: 'Streaming Services', value: 0 },
        { title: 'Trash', value: 0 },
        { title: 'Phone', value: 0 },
        { title: 'Health Insurance', value: 0 },
        { title: 'Life Insurance', value: 0 },
        { title: 'Auto Insurance', value: 0 },
        { title: 'Identity Theft', value: 0 },
        { title: 'Gym', value: 0 },
      ],
    },
    {
      id: 5,
      title: 'Spending',
      array: [
        { title: 'Groceries', value: 0 },
        { title: 'Restaurants', value: 0 },
        { title: 'gas', value: 0 },
        { title: 'Clothing', value: 0 },
        { title: 'Hair & Skin Care', value: 0 },
        { title: 'Fun & Entertainment', value: 0 },
        { title: 'Pet Care', value: 0 },
        { title: 'Child Care', value: 0 },
        { title: 'Repairs & Maintenance', value: 0 },
        { title: 'Miscellaneous', value: 0 },
      ],
    },
    {
      id: 6,
      title: 'debt',
      array: [
        { title: 'bank', value: 0 },
        { title: 'father', value: 0 },
        { title: 'friend', value: 0 },
      ],
    },
  ]
  return (
    <Wrapper>
      <Months />
      <Remain amount={formatMoney(7343)} />
      {init.map((item) => {
        return <Card key={item.id} {...item} />
      })}
    </Wrapper>
  )
}

export default Budget

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  position: 'relative',
  padding: '1.5rem',

  '@media (width<= 1200px)': {
    padding: '.5rem',
  },
}))
