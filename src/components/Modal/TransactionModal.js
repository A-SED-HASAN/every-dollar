import React, { useState } from 'react'

import {
  Modal,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Button,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useGlobalContext } from '../../context/GlobalContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import SplitAdder from '../Assistance/SplitAdder'
export default function TransactionModal() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      amount: '',
      whereSpend_income: '',
      where: '',
      budgetItem: {},
    },
  })

  const onSubmit = (data) => console.log(data)

  const { openTrans, handleCloseTrans } = useGlobalContext()
  const [value, setValue] = useState('income')
  return (
    <Modal open={openTrans} onClose={handleCloseTrans}>
      <ContentWrapper value={value}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>add {value}</h1>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <FormControl {...field}>
                  <RadioGroup
                    sx={{ flexDirection: 'row' }}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue='income'>
                    <FormControlLabel
                      value='expense'
                      control={<Radio />}
                      label='expense'
                    />
                    <FormControlLabel
                      value='income'
                      control={<Radio />}
                      label='income'
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </header>

          <main>
            <Controller
              name='amount'
              control={control}
              render={({ field }) => (
                <FormControl variant='outlined' {...field}>
                  <InputLabel htmlFor='amount'>amount</InputLabel>
                  <OutlinedInput id='amount' label='amount' />
                </FormControl>
              )}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <DatePicker sx={{ maxWidth: '192px' }} />
              <Controller
                name='whereSpend_income'
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    variant='outlined'
                    {...field}>
                    <InputLabel htmlFor='whereSpend_income'>
                      where did
                      {value === 'income'
                        ? ' this money come from '
                        : ' you spend this money '}
                      ?
                    </InputLabel>
                    <OutlinedInput
                      id='whereSpend'
                      label={` where did
                  ${
                    value === 'income'
                      ? ' this money come from '
                      : ' you spend this money '
                  }
                  ?`}
                    />
                  </FormControl>
                )}
              />
            </div>
            <SplitAdder />
          </main>

          <footer>
            <Btn onClick={handleCloseTrans}>cancel</Btn>
            <Btn type='submit' variant='contained'>
              track {value}
            </Btn>
          </footer>
        </form>
      </ContentWrapper>
    </Modal>
  )
}
const Btn = styled(Button)(({ variant }) => ({
  color: variant === 'contained' ? 'var(--card-bg)' : 'var(--bg-s-800)',
  background: variant === 'contained' ? 'var(--bg-s-800)' : 'var(--card-bg)',
  fontWeight: '600',
  padding: '12px 20px',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    background: variant === 'contained' ? 'var(--bg-s-850)' : 'var(--bg-s-50)',
  },
}))

const ContentWrapper = styled('article')(({ value }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  minWidth: '460px',
  maxWidth: '700px',

  background: 'var(--card-bg)',
  borderRadius: 'var(--light-radius)',
  form: {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: value === 'income' ? 'var(--bg-p-50)' : 'var(--bg-s-50)',
      padding: '1rem 2rem ',
      h1: {
        fontSize: '2rem',
      },
    },

    main: {
      overflow: 'auto',
      maxHeight: '80vh',
      display: 'flex',
      gap: '1rem',
      flexDirection: 'column',
      padding: ' 2rem ',
    },

    footer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'end',
      padding: '0 2rem 2rem',
    },
  },
}))
