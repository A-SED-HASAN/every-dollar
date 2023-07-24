import React, { useState } from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'

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
import {
  CloseOutlinedIcon,
  TitleOutlinedIcon,
  MoneyOutlinedIcon,
  InvertColorsOutlinedIcon,
} from '../../assets/icons'
import { ResetBtn } from '../Assistance/Btns'
import { useGlobalContext } from '../../context/GlobalContext'

import { colorsForSlt, shapes } from '../../assets/constants'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment/moment'
export default function GoalModal() {
  const [date, setDate] = useState(null)
  const { handleCloseGoal, openGoal, setGoalList, goalList } =
    useGlobalContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goalName: '',
      goalAmount: '',
      color: '',
      shape: '',
      date: '',
    },
  })
  const onSubmit = (data) => {
    data.date = date
    setGoalList([...goalList, data])
    handleCloseGoal()
  }

  return (
    <Modal open={openGoal} onClose={handleCloseGoal}>
      <ContentWrapper>
        <header>
          <h1>add goal</h1>
          <IconBtn onClick={handleCloseGoal}>
            <CloseOutlinedIcon />
          </IconBtn>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            rules={{ required: true }}
            name='goalName'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard' {...field}>
                <Label color={errors.goalName ? 'error' : ''}>goal Name</Label>
                <Inp
                  color={errors.goalName ? 'error' : ''}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position='end'>
                      <TitleOutlinedIcon />
                    </InputAdornment>
                  }
                />
                {errors.goalName && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    it's required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            rules={{
              required: true,
              // pattern: /d+/,
            }}
            name='goalAmount'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard' {...field}>
                <Label color={errors.goalAmount ? 'error' : ''}>
                  goal Amount
                </Label>
                <Inp
                  color={errors.goalAmount ? 'error' : ''}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position='end'>
                      <MoneyOutlinedIcon />
                    </InputAdornment>
                  }
                />
                {errors.goalAmount && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    it's required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name='color'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard'>
                <Label>color</Label>
                <Slt disableUnderline {...field}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {colorsForSlt.map((item) => {
                    const { id, colorHex, colorName } = item
                    return (
                      <MenuItem key={id} value={colorHex} sx={{ gap: '1rem' }}>
                        <InvertColorsOutlinedIcon
                          sx={{ color: `${colorHex}` }}
                        />
                        {colorName}
                      </MenuItem>
                    )
                  })}
                </Slt>
              </FormControl>
            )}
          />

          <Controller
            name='shape'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard'>
                <Label>shape</Label>
                <Slt disableUnderline {...field}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {shapes.map((item) => {
                    const { id, shape, icon } = item
                    return (
                      <MenuItem key={id} value={shape} sx={{ gap: '1rem' }}>
                        {icon}
                        {shape}
                      </MenuItem>
                    )
                  })}
                </Slt>
              </FormControl>
            )}
          />

          <div className='flex'>
            goal due date :
            <FormControl variant='standard'>
              <DatePicker
                onChange={(e) => setDate(moment(e).format('D-M-YYYY'))}
                slotProps={{
                  textField: {
                    variant: 'standard',
                  },
                }}
              />
            </FormControl>
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

const Label = styled(InputLabel)(() => ({
  color: 'var(--text-300)',
  '&	.Mui-focused': {
    color: 'var(--bg-s-800)',
  },
}))
const Inp = styled(Input)(({ color }) => ({
  borderBottom: '1px solid var(--text-300)',
  '&.Mui-focused': {
    borderBottomColor: color === 'error' ? 'var(--error)' : 'var(--bg-s-800)',
  },
}))

const Slt = styled(Select)(({ color }) => ({
  borderBottom: '1px solid var(--text-300)',
  '&.Mui-focused': {
    borderBottomColor: color === 'error' ? 'var(--error)' : 'var(--bg-s-800)',
  },
}))
