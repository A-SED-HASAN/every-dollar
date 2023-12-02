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
  Divider,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import {
  CloseOutlinedIcon,
  TitleOutlinedIcon,
  MoneyOutlinedIcon,
  InvertColorsOutlinedIcon,
} from '../../assets/icons'
import { ResetBtn } from '../Styled/Button'
import { useGlobalContext } from '../../context/GlobalContext'
import { colorsForSlt, shapes } from '../../assets/constants'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment/moment'
import { addDoc } from 'firebase/firestore'

import { IconBtn } from '../../global'

export default function GoalModal() {
  const [date, setDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const { handleCloseGoal, openGoal, goalCollectionRef, getGoal } =
    useGlobalContext()

  const {
    control,
    handleSubmit,
    formState: {
      errors: { goalName, goalAmount, color, shape },
    },
  } = useForm({
    defaultValues: {
      goalName: '',
      goalAmount: '',
      color: '',
      shape: '',
      date: '',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const newData = { ...data, date: date, pay: 0 }
    await addDoc(goalCollectionRef, newData)
    handleCloseGoal()
    getGoal()
    setLoading(false)
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
                <Label color={goalName ? 'error' : ''}>goal Name</Label>
                <Inp
                  color={goalName ? 'error' : ''}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position='end'>
                      <TitleOutlinedIcon />
                    </InputAdornment>
                  }
                />
                {goalName && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    goal Name is required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            rules={{ required: true }}
            name='goalAmount'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard' {...field}>
                <Label color={goalAmount ? 'error' : ''}>goal Amount</Label>
                <Inp
                  type='number'
                  color={goalAmount ? 'error' : ''}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position='end'>
                      <MoneyOutlinedIcon />
                    </InputAdornment>
                  }
                />
                {goalAmount && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    goal Amount is required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            rules={{ required: true }}
            name='color'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard'>
                <Label color={color ? 'error' : ''}>color</Label>
                <Slt disableUnderline {...field} color={color ? 'error' : ''}>
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
                {color && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    color is required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            rules={{ required: true }}
            name='shape'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth variant='standard'>
                <Label color={shape ? 'error' : ''}>shape</Label>
                <Slt color={shape ? 'error' : ''} disableUnderline {...field}>
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
                {shape && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    shape is required !
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <div className='flex'>
            goal due date :
            <FormControl variant='standard'>
              <DatePicker
                disablePast
                onChange={(e) => {
                  setDate(moment(e).fromNow(true))
                }}
                slotProps={{
                  textField: {
                    variant: 'standard',
                  },
                }}
              />
            </FormControl>
          </div>
          <Divider>
            <ResetBtn type='submit'>
              {loading ? <CircularProgress /> : 'save'}
            </ResetBtn>
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

export const Label = styled(InputLabel)(() => ({
  color: 'var(--text-300)',
  '&	.Mui-focused': {
    color: 'var(--bg-s-800)',
  },
}))
export const Inp = styled(Input)(({ color }) => ({
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
