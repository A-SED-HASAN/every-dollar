import React, { useState } from 'react'

import {
  Modal,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
export default function TransactionModal() {
  const [open, setOpen] = useState(true)

  const [value, setValue] = useState('income')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
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
        <main>
          <input type='text' name='' id='' />
          <input type='text' name='' id='' />
          <input type='text' name='' id='' />
        </main>
        <DatePicker onChange={(e) => console.log(e)} />
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
