import React, { useState } from 'react'

import {
  Modal,
  Radio,
  FormControlLabel,
  FormControl,
  Input,
  RadioGroup,
  InputAdornment,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useGlobalContext } from '../../context/GlobalContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm } from 'react-hook-form'
export default function TransactionModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  const { openTrans, handleCloseTrans } = useGlobalContext()
  const [value, setValue] = useState('income')
  return (
    <Modal open={openTrans} onClose={handleCloseTrans}>
      <ContentWrapper value={value}>
        <header>
          <h1>add {value}</h1>
          <FormControl>
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
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input {...register('firstName')} /> */}
          <Input
            {...register('firstName')}
            disableUnderline
            sx={{
              borderBottom: '1px solid var(--text-300)',
              '&.Mui-focused': {
                borderBottomColor: 'var(--bg-s-800)',
              },
            }}
            endAdornment={<InputAdornment position='end'>11</InputAdornment>}
          />
          <select {...register('gender')}>
            <option value='female'>female</option>
            <option value='male'>male</option>
            <option value='other'>other</option>
          </select>
          <input type='submit' />
        </form>
      </ContentWrapper>
    </Modal>
  )
}

const ContentWrapper = styled('article')(({ value }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  background: 'var(--card-bg)',
  borderRadius: 'var(--light-radius)',
  overflow: 'hidden',
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
    background: 'var(--card-bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: ' 2rem ',
  },
}))
