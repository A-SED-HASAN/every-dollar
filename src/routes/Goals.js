import React, { useEffect, useState } from 'react'
import { Liquid } from '@ant-design/plots'
import { AddBtn, ResetBtn, GoalModal, Loading } from '../components'
import { styled } from '@mui/material/styles'
import { formatMoney, heart, star } from '../functions'
import { useGlobalContext } from '../context/GlobalContext'
import { Button, Divider, FormControl } from '@mui/material'
import { Inp, Label } from '../components/Modal/GoalModal'
import { useForm, Controller } from 'react-hook-form'
import { getDocs, deleteDoc, doc } from 'firebase/firestore'
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

    //main color
    theme: {
      styleSheet: {
        brandColor: color,
      },
    },
  }
  return <Liquid {...config} />
}

const Goals = () => {
  const { handleOpenGoal, resetGoals, goalCollectionRef } = useGlobalContext()
  const [goalList, setGoalList] = useState([])
  const [goalListLoading, setGoalListLoading] = useState(true)

  const getGoal = async () => {
    setGoalListLoading(true)
    const data = await getDocs(goalCollectionRef)
    setGoalList(
      data.docs.map((doc) => ({
        ...doc.data().newData,
      }))
    )
    setGoalListLoading(false)
  }
  // const deleteAll = async () => {
  //   setGoalListLoading(true)
  //   const data = await getDocs(goalCollectionRef)
  //   data.docs.map(async (doc) => ({}))

  //   // setGoalList(
  //   //   data.docs.map((doc) => ({
  //   //     ...doc.data().newData,
  //   //   }))
  //   // )
  //   setGoalListLoading(false)
  // }

  useEffect(() => {
    getGoal()
  }, [])
  if (goalListLoading) {
    return <Loading />
  }
  return (
    <Wrapper>
      <GoalModal />
      <ChartsWrapper>
        {goalList.length > 0 ? (
          goalList.map((item, index) => {
            const { goalAmount, pay } = item
            return (
              <SingleGoal
                key={index}
                index={index}
                percent={pay / goalAmount >= 1 ? 1 : pay / goalAmount}
                {...item}
              />
            )
          })
        ) : (
          <h1>You haven't any goal yet !</h1>
        )}
      </ChartsWrapper>
      <AddBtn onClick={handleOpenGoal}>add goal</AddBtn>
      <ResetBtn onClick={resetGoals}>reset goals</ResetBtn>
    </Wrapper>
  )
}

export default Goals

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

const SingleGoal = ({
  index,
  percent,
  goalName,
  goalAmount,
  color,
  shape,
  date,
  pay,
}) => {
  const { goalList, setGoalList } = useGlobalContext()
  const [showPay, setShowPay] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      payAmount: 0,
    },
  })

  const onSubmit = (data) => {
    const { pay, goalAmount } = goalList[index]
    const payAmount = +data.payAmount
    if (pay + payAmount < goalAmount) {
      goalList[index].pay += payAmount
    } else {
      goalList[index].pay = goalAmount
    }
    setGoalList([...goalList])
    setShowPay(false)
  }

  return (
    <SingleChart>
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
}))

const Btn = styled(Button)(() => ({
  color: 'var(--bg-s-800)',
  textTransform: 'capitalize',
}))
