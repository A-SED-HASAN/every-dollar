import React, { useState } from 'react'
import moment from 'moment/moment'

import {
  Modal,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Button,
  InputLabel,
  OutlinedInput,
  TextField,
  Autocomplete,
  FormHelperText,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useGlobalContext } from '../../context/GlobalContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { formatMoney } from '../../functions'
import { useDataContext } from '../../context/DataContext'
import { addDoc } from 'firebase/firestore'

export default function TransactionModal() {
  const { handleCloseTrans, openTrans, transCollectionRef, getTrans } =
    useGlobalContext()
  const { specificList } = useDataContext()

  const [date, setDate] = useState(null)
  const [value, setValue] = useState('income')
  const [budgetItemArray, setBudgetItemArray] = useState([])
  const options = []
  // eslint-disable-next-line
  specificList?.array.map((item) => {
    // eslint-disable-next-line
    item.array.map((item) => {
      options.push({ title: item.title, value: item.planned - item.ROS })
    })
  })

  const {
    control,
    handleSubmit,
    formState: {
      errors: { amount, whereSpend_income },
    },
  } = useForm({
    defaultValues: {
      title: value,
      amount: '',
      whereSpend_income: '',
      budgetItem: '',
      date: '',
    },
  })

  const onSubmit = async (data) => {
    // setLoading(true)

    //هم بگرد روز رو اضافه کن هم تو لیست ترنس ها وارد کن

    const newData = { ...data, date: date, budgetItem: budgetItemArray }
    await addDoc(transCollectionRef, newData)

    getTrans()
    handleCloseTrans()
    // setLoading(false)
  }
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
              rules={{ required: true }}
              name='amount'
              control={control}
              render={({ field }) => (
                <FormControl variant='outlined' {...field}>
                  <InputLabel htmlFor='amount'>amount</InputLabel>
                  <OutlinedInput id='amount' label='amount' />
                  {amount && (
                    <FormHelperText sx={{ color: 'var(--error)' }}>
                      amount is required !
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <FormControl>
                <DatePicker
                  onChange={(e) => setDate(moment(e).format('D-M-YYYY'))}
                  sx={{ maxWidth: '192px' }}
                />
                {!date && (
                  <FormHelperText sx={{ color: 'var(--error)' }}>
                    date is required !
                  </FormHelperText>
                )}
              </FormControl>
              <Controller
                rules={{ required: true }}
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
                    {whereSpend_income && (
                      <FormHelperText sx={{ color: 'var(--error)' }}>
                        where you got / spent is required !
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>

            <FormControl>
              <Autocomplete
                multiple
                onChange={(_, values) => {
                  setBudgetItemArray(values)
                }}
                options={options}
                getOptionLabel={(option) =>
                  `${option.title} - ( ${formatMoney(option.value)} )`
                }
                filterSelectedOptions
                renderOption={(props, option) => (
                  <Row {...props}>
                    <span className='title'> {option.title}</span>
                    <span className='value'>{formatMoney(option.value)}</span>
                  </Row>
                )}
                renderInput={(params) => (
                  <TextField
                    color={budgetItemArray.length === 0 && 'error'}
                    {...params}
                    label="choose budget item's"
                    placeholder='more ???'
                  />
                )}
              />
              {budgetItemArray.length === 0 && (
                <FormHelperText sx={{ color: 'var(--error)' }}>
                  choose budget item('s)
                </FormHelperText>
              )}
            </FormControl>
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

        '@media (width<= 600px)': {
          fontSize: '1.5rem',
        },
      },
    },

    main: {
      overflow: 'auto',
      maxHeight: '80vh',
      display: 'flex',
      gap: '.5rem',
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

const Row = styled('li')(() => ({
  color: 'var(--text-700)',
  '.title': {
    width: '70%',
    color: 'var(--text-800)',
    fontWeight: '500',
  },
  '.value': {
    textAlign: 'end',
    width: '30%',
    fontWeight: '600',
  },
  ':hover': {
    color: 'var(--bg-s-800)',
    '.title': {
      fontWeight: '600',
      color: 'var(--bg-s-800)',
    },
  },
  '*': {
    cursor: 'pointer',
  },
}))
