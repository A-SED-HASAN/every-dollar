import React from 'react'
import { styled } from '@mui/material/styles'
import {
  AddBtn,
  Card,
  DeleteModal,
  ResetBtn,
  Top,
  LoadingCenter,
  ResetModal,
} from '../components'
import { useDataContext } from '../context/DataContext'
import { AddOutlinedIcon, RotateLeftOutlinedIcon } from '../assets/icons'
import { useGlobalContext } from '../context/GlobalContext'
import { empty } from '../assets/images'
import { Button } from '@mui/material'
import { CircleLoader } from '../global'

const Budget = () => {
  const {
    addGroupHandler,
    name,
    makeNewBudget,
    specificList,
    loading,
    listLoading,
  } = useDataContext()
  const { handleOpenReset } = useGlobalContext()
  if (loading) {
    return <LoadingCenter />
  }
  return (
    <Wrapper className={listLoading ? 'loading' : null}>
      <DeleteModal />
      <ResetModal />
      <Top />
      {specificList?.array.length > 0 ? (
        <>
          {specificList?.array.map((item, index) => {
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
        </>
      ) : (
        <EmptyWrapper>
          <div className='img-container'>
            <img src={empty} alt='empty' loading='lazy' />
            <p>{name.slice(0, 3)}</p>
          </div>
          <p>Hey there, looks like you need a budget for {name}.</p>
          {listLoading ? (
            <CircleLoader />
          ) : (
            <Button variant='contained' onClick={makeNewBudget}>
              start planning for {name}
            </Button>
          )}
        </EmptyWrapper>
      )}
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

const EmptyWrapper = styled('div')(() => ({
  padding: '3rem 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
  '.img-container': {
    width: '100%',
    height: '300px',
    maxWidth: '300px',
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
    img: {
      width: '100%',
    },
    p: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-20%,-100%)',
      fontSize: '1.2rem',
      textTransform: 'uppercase',
      fontWeight: '800',
      color: 'var(--text-200)',
    },
  },
  p: {
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-800)',
  },
  button: {
    fontSize: '1rem',
    background: 'var(--bg-s-700)',
    textTransform: 'capitalize',
    fontWeight: '700',
    padding: '1rem 3rem',
    ':hover': {
      background: 'var(--bg-s-800)',
    },
  },
}))
