import React from 'react'
import { styled } from '@mui/material/styles'
import { AddBtn, Card, DeleteModal, ResetBtn, Top } from '../components'
import { useDataContext } from '../context/DataContext'
import { AddOutlinedIcon, RotateLeftOutlinedIcon } from '../assets/icons'
import { useGlobalContext } from '../context/GlobalContext'
import ResetModal from '../components/Modal/ResetModal'
const Budget = () => {
  const { list, addGroupHandler } = useDataContext()
  const { handleOpenReset } = useGlobalContext()

  return (
    <Wrapper>
      <DeleteModal />
      <ResetModal />

      <Top />
      {list.map((item, index) => {
        return <Card key={item.id} {...item} index={index} />
      })}
      <AddBtn onClick={addGroupHandler} startIcon={<AddOutlinedIcon />}>
        add group
      </AddBtn>
      <ResetBtn
        onClick={handleOpenReset}
        startIcon={<RotateLeftOutlinedIcon />}>
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
