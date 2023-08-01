import React from 'react'
import { styled } from '@mui/material/styles'
import { Modal, Divider, Button } from '@mui/material'
import { useGlobalContext } from '../../context/GlobalContext'
import { useDataContext } from '../../context/DataContext'
import useSound from 'use-sound'
import { deleteModal } from '../../assets/sound'

const DeleteModal = () => {
  const { openDelete, handleCloseDelete } = useGlobalContext()
  const { info, deleteGroup, deleteSingle } = useDataContext()
  const [play] = useSound(deleteModal)

  const deleteHandler = () => {
    if (info) {
      var { title, subTitle, index, id } = info

      if (subTitle) {
        deleteSingle(title, index, id)
      } else {
        deleteGroup(id)
      }
      handleCloseDelete()
      play()
    }
  }
  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
      <ContentWrapper>
        <p>
          Are you sure you want to <span className='error'>delete </span>
          {info?.subTitle ? `¨${info.subTitle}¨` : `¨${info?.title}¨`} ?
        </p>
        <Divider />
        <div className='btn-container'>
          <Btn onClick={handleCloseDelete}>cancel</Btn>
          <Btn variant='contained' onClick={deleteHandler}>
            delete
          </Btn>
        </div>
      </ContentWrapper>
    </Modal>
  )
}

export default DeleteModal

const Btn = styled(Button)(({ variant }) => ({
  color: variant === 'contained' ? 'var(--card-bg)' : 'var(--bg-s-800)',
  background: variant === 'contained' ? 'var(--error-light)' : 'var(--card-bg)',
  fontWeight: '600',
  padding: '6px 20px',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    background: variant === 'contained' ? 'var(--error)' : 'var(--bg-s-50)',
  },
}))

const ContentWrapper = styled('article')(() => ({
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '600px',
  background: 'var(--card-bg)',
  borderRadius: 'var(--light-radius)',
  fontSize: '1.3rem',
  fontWeight: '500',
  padding: '2.5rem',
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  p: {
    fontWeight: '600',
  },
  '.error': {
    color: 'var(--error)',
  },
  '.btn-container': {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'end',
  },
}))
