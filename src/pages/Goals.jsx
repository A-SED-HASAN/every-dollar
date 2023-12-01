import React, { useEffect, useState } from 'react'
import { Liquid } from '@ant-design/plots'
import { AddBtn, GoalModal, LoadingCenter } from '../components'
import { styled } from '@mui/material/styles'
import { formatMoney, heart, star } from '../functions'
import { useGlobalContext } from '../context/GlobalContext'
import { Button, Divider, FormControl } from '@mui/material'
import { Inp, Label } from '../components/Modal/GoalModal'
import { useForm, Controller } from 'react-hook-form'
import { deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { RemoveOutlinedIcon } from '../assets/icons'
import { IconBtn } from '../global'
import { useAuthContext } from '../context/AuthContext'
import { useDataContext } from '../context/DataContext'

const GoalLiquid = ({ percent, shape, color }) => {
  const config = {
    percent: percent,

    shape:
      shape === 'heart'
        ? heart
        : shape === 'star'
        ? star()
        : shape
        ? shape
        : 'circle',

    outline: {
      border: 5,
      distance: 3,
      style: {
        stroke: color,
        strokeOpacity: 0.5,
      },
    },
    wave: {
      length: 128,
    },
    pattern:
      percent === 1
        ? {
            type: 'dot',
            cfg: {
              size: 30,
            },
          }
        : false,
    theme: {
      styleSheet: {
        brandColor: color,
      },
    },
  }
  return <Liquid {...config} />
}

export default function Goals() {
  const { handleOpenGoal, getGoal, goalList, goalListLoading } =
    useGlobalContext()

  useEffect(() => {
    getGoal()
    // eslint-disable-next-line
  }, [])

  if (goalListLoading) {
    return <LoadingCenter />
  }
  return (
    <Wrapper>
      <GoalModal />
      <ChartsWrapper>
        {goalList.length > 0 ? (
          goalList.map((item) => {
            return <SingleGoal key={item.id} {...item} />
          })
        ) : (
          <h1>You haven't any goal yet !</h1>
        )}
      </ChartsWrapper>
      <AddBtn onClick={handleOpenGoal}>add goal</AddBtn>
    </Wrapper>
  )
}

const SingleGoal = ({ goalName, goalAmount, color, shape, date, pay, id }) => {
  const { getGoal } = useGlobalContext()
  const { authUser } = useAuthContext()
  const { playMoney } = useDataContext()
  const [showPay, setShowPay] = useState(false)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      payAmount: 0,
    },
  })
  const percent = pay / goalAmount > 1 ? 1 : pay / goalAmount

  const onSubmit = async (data) => {
    setLoading(true)
    playMoney()
    const payAmount = +data.payAmount
    const specificItem = doc(db, `${authUser?.uid}:GOAL`, id)
    let val = 0
    if (payAmount + pay > goalAmount) {
      val = goalAmount
    } else {
      val = pay + payAmount
    }
    await updateDoc(specificItem, {
      pay: val,
    })
    getGoal()
    setShowPay(false)
    setLoading(false)
  }
  const deleteHandler = async () => {
    setLoading(true)
    const specificItem = doc(db, `${authUser?.uid}:GOAL`, id)
    await deleteDoc(specificItem)
    getGoal()
    setLoading(false)
  }
  return (
    <SingleChart className={loading ? 'loading' : null}>
      <IconButton className='delete' onClick={deleteHandler}>
        <RemoveOutlinedIcon />
      </IconButton>
      <GoalLiquid percent={percent} shape={shape} color={color} />
      <Divider />
      <div className='info'>
        <div className='row'>
          <p> title</p>
          <p> {goalName}</p>
        </div>
        <div className='row '>
          <p>
            until now :
            <span style={{ color: 'green' }}> {formatMoney(pay)}</span>
          </p>
          <p> {formatMoney(goalAmount)}</p>
        </div>

        <Divider />
        <div className='row '>
          <p style={{ textDecoration: percent < 1 ? '' : 'line-through' }}>
            {date} to go
          </p>
          {!showPay && (
            <Btn
              style={{ visibility: percent < 1 ? 'visible' : 'hidden' }}
              variant='outlined'
              onClick={() => setShowPay(true)}>
              Wanna pay ?
            </Btn>
          )}
        </div>

        {showPay && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              rules={{ required: true }}
              name='payAmount'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant='standard' {...field}>
                  <Label>payAmount</Label>
                  <Inp
                    sx={{ maxWidth: '300px' }}
                    disableUnderline
                    type='number'
                  />
                </FormControl>
              )}
            />
            <Btn
              variant='outlined'
              type='submit'
              onClick={() => setShowPay(true)}>
              pay
            </Btn>
          </form>
        )}
      </div>
    </SingleChart>
  )
}

const Wrapper = styled('div')(() => ({
  position: 'relative',
  padding: '1.5rem',
  '@media (width<= 1200px)': {
    padding: '.5rem',
  },
}))

const ChartsWrapper = styled('div')(() => ({
  display: 'grid',
  padding: '2rem 0',
  gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))',
  gap: '3rem',
  textAlign: 'center',
}))

const IconButton = styled(IconBtn)(() => ({
  color: 'var(--error)',
  visibility: 'hidden',
}))

const SingleChart = styled('div')(() => ({
  borderRadius: 'var(--light-radius)',
  background: 'var(--card-bg)',
  '.info': {
    textAlign: 'start',
    '.row': {
      padding: '1.5rem 1rem',
      fontSize: '1rem',
      fontWight: '500',
      color: 'var(--text-600)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    form: {
      padding: '0 1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '3rem',
    },
  },
  ':hover': {
    '.delete': {
      visibility: 'visible',
    },
  },
}))

const Btn = styled(Button)(() => ({
  color: 'var(--bg-s-800)',
  textTransform: 'capitalize',
}))
