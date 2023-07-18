import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, Months, Remain } from '../../components'
import { formatMoney } from '../../functions'
import { useDateContext } from '../../context/DateContext'
import { Button } from '@mui/material'
import { AddOutlinedIcon, RotateLeftOutlinedIcon } from '../../assets/icons'
const Budget = () => {
  const { list, addGroupHandler, resetBudget } = useDateContext()
  return (
    <Wrapper>
      <Months />
      <Remain amount={formatMoney(7343)} />
      {list.map((item) => {
        return <Card key={item.id} {...item} />
      })}
      <AddGroupBtn onClick={addGroupHandler} startIcon={<AddOutlinedIcon />}>
        add group
      </AddGroupBtn>
      <ResetBtn onClick={resetBudget} startIcon={<RotateLeftOutlinedIcon />}>
        reset budget
      </ResetBtn>
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


const Btn = styled(Button)(() => ({
  margin: '1.5rem auto',
  display: 'flex',
  justifyContent: 'start',
  color: 'var(--bg-s-800)',
  fontWeight: '700',
  '*': {
    cursor: 'pointer',
  },
}))
const AddGroupBtn = styled(Btn)(() => ({
  width: '100%',
  maxWidth: '720px',
  border: '1px dashed var(--text-100)',
  padding: ' 1.5rem',
  fontSize: '1rem',
}))
const ResetBtn = styled(Btn)(() => ({
  padding: ' 1rem',
  fontSize: '.9rem',
  textTransform: 'capitalize',
}))
