import React from 'react'

import {
  Modal,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  FormHelperText,
  IconButton,
  Divider,
  Select,
  MenuItem,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  CloseOutlinedIcon,
  TitleOutlinedIcon,
  MoneyOutlinedIcon,
} from '../../assets/icons'
import { ResetBtn } from '../Assistance/Btns'
import { useDateContext } from '../../context/DateContext'
import moment from 'moment/moment'
import { colors, shapes } from '../../assets/constants'
export default function GoalModal() {
  const {
    goalInputData,

    setDate,
    handleCloseGoal,
    openGoal,
    addGoalHandler,
  } = useDateContext()

  return (
    <Modal open={openGoal} onClose={handleCloseGoal}>
      <ContentWrapper>
        <header>
          <h1>add goal</h1>
          <IconBtn onClick={handleCloseGoal}>
            <CloseOutlinedIcon />
          </IconBtn>
        </header>
        <form onSubmit={addGoalHandler}>
          <GoalInput
            label='goal name'
            name='goal-name'
            value={goalInputData.name}
            icon={<TitleOutlinedIcon />}
          />
          <GoalInput
            label='goal target amount'
            name='goal-amount'
            value={goalInputData.amount}
            icon={<MoneyOutlinedIcon />}
          />
          <GoalInput select label='color' array={colors} />
          <GoalInput select label='shape' array={shapes} />

          <div className='flex'>
            goal due date :
            <DatePicker
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              onChange={(e) => setDate(moment(e).format('M-YYYY'))}
              // value={moment(goalMonth)}
            />
          </div>
          <Divider>
            <ResetBtn type='submit'>save</ResetBtn>
          </Divider>
        </form>
      </ContentWrapper>
    </Modal>
  )
}

const ContentWrapper = styled('article')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '500px',
  background: 'var(--card-bg)',
  borderRadius: 'var(--light-radius)',
  overflow: 'hidden',
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem ',

    h1: {
      fontSize: '2rem',
      fontWeight: '500',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '1rem 2rem',
    '.flex': {
      paddingRight: ' .4rem ',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: '500',
      color: 'var(--text-300)',
    },
  },
}))

const IconBtn = styled(IconButton)(() => ({
  ':hover': {
    color: 'var(--error)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const GoalInput = ({ label, icon, name, value, select, array }) => {
  const { changeHandler } = useDateContext()

  return (
    <FormControl fullWidth variant='standard'>
      <InputLabel
        sx={{
          color: 'var(--text-300)',
          '&	.Mui-focused': {
            color: 'var(--bg-s-800)',
          },
        }}>
        {label}
      </InputLabel>
      {select ? (
        <Select
          disableUnderline
          sx={{
            borderBottom: '1px solid var(--text-300)',
            '&.Mui-focused': {
              borderBottomColor: 'var(--bg-s-800)',
            },
          }}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {array.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
      ) : (
        <Input
          onChange={(e) => changeHandler(e)}
          value={value}
          name={name}
          disableUnderline
          sx={{
            borderBottom: '1px solid var(--text-300)',
            '&.Mui-focused': {
              borderBottomColor: 'var(--bg-s-800)',
            },
          }}
          endAdornment={<InputAdornment position='end'>{icon}</InputAdornment>}
        />
      )}

      <FormHelperText>for possible error</FormHelperText>
    </FormControl>
  )
}
