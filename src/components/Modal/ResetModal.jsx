import React from 'react'
import { styled } from '@mui/material/styles'
import { Modal, Button } from '@mui/material'
import { useGlobalContext } from '../../context/GlobalContext'
import { useDataContext } from '../../context/DataContext'
import { reset } from '../../assets/images'
import { MiniCard } from '..'

const ResetModal = () => {
  const { openReset, handleCloseReset } = useGlobalContext()
  const { resetPlan, setResetPlan, resetBudget, resetBudgetJustValue } =
    useDataContext()

  const handleReset = () => {
    if (resetPlan === 1) {
      resetBudgetJustValue()
    } else {
      resetBudget()
    }
    handleCloseReset()
    setResetPlan(null)
  }
  return (
    <Modal open={openReset} onClose={handleCloseReset}>
      <ContentWrapper>
        <img src={reset} alt='reset' />
        <p>How would you like to reset your budget?</p>
        <MiniCard selected={resetPlan === 1} onClick={() => setResetPlan(1)}>
          Make my planned amounts $0.00
        </MiniCard>
        <MiniCard selected={resetPlan === 2} onClick={() => setResetPlan(2)}>
          Untrack all my transactions and pull over last month’s budget items
        </MiniCard>

        <div className='btn-container'>
          <Btn
            onClick={() => {
              handleCloseReset()
              setResetPlan(null)
            }}>
            cancel
          </Btn>
          <Btn disabled={!resetPlan} onClick={handleReset} variant='contained'>
            delete
          </Btn>
        </div>
      </ContentWrapper>
    </Modal>
  )
}

export default ResetModal

const Btn = styled(Button)(({ variant }) => ({
  color: variant === 'contained' ? 'var(--card-bg)' : 'var(--bg-s-800)',
  background: variant === 'contained' ? 'var(--bg-s-800)' : 'var(--card-bg)',
  fontWeight: '600',
  padding: '16px 24px',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    background: variant === 'contained' ? 'var(--bg-s-850)' : 'var(--bg-s-50)',
  },
}))

const ContentWrapper = styled('article')(() => ({
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  width: '90%',
  maxWidth: '600px',
  background: 'var(--card-bg)',
  borderRadius: 'var(--light-radius)',
  fontWeight: '500',
  padding: '2.5rem',
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  img: {
    width: '20%',
  },
  p: {
    fontWeight: '600',
    fontSize: '1.5rem',
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
