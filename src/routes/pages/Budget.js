import React from 'react'
import { styled } from '@mui/material/styles'
import { AddBtn, Card, ResetBtn, Top } from '../../components'
import { useDataContext } from '../../context/DataContext'
import { AddOutlinedIcon, RotateLeftOutlinedIcon } from '../../assets/icons'

const Budget = () => {
  const { list, addGroupHandler, resetBudget } = useDataContext()
  return (
    <Wrapper>
      <Top />
      {list.map((item) => {
        return <Card key={item.id} {...item} />
      })}
      <AddBtn onClick={addGroupHandler} startIcon={<AddOutlinedIcon />}>
        add group
      </AddBtn>
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
