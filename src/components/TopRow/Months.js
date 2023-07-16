import React, {  useState } from 'react'

import { styled } from '@mui/material/styles'
import { Tooltip } from '@mui/material'
import moment from 'moment'

import {
  KeyboardArrowRightOutlinedIcon,
  KeyboardArrowLeftOutlinedIcon,
  KeyboardArrowUpOutlinedIcon,
  KeyboardArrowDownOutlinedIcon,
} from '../../assets/icons'
import { SingleMonth } from '../'
import { monthsName } from '../../assets/constants'
import { useDateContext } from '../../context/DateContext.js'
const Months = () => {
  const {
    thisMonth,
    setThisYear,
    setThisMonth,
    thisYear,
    toggleExpandMonth,
    monthExpanded,
  } = useDateContext()
  const [index, setIndex] = useState(thisMonth)

  const makeItSafe = (num) => {
    if (num > 12) {
      setThisYear(thisYear + 1)
      return 1
    }
    if (num <= 0) {
      setThisYear(thisYear - 1)
      return 12
    }
    return num
  }
  const { name } = monthsName.find((item) => {
    // setThisMonth(item.id)
    return item.id === index
  })
  const backToday = () => {
    setThisMonth(+moment().format('M'))
    setThisYear(+moment().format('YYYY'))
  }
  return (
    <Wrapper>
      <div className='container' onClick={toggleExpandMonth}>
        <h1>
          <span className='month'>{name}</span>
          <span className='year'> {thisYear}</span>
        </h1>
        {monthExpanded ? (
          <KeyboardArrowUpOutlinedIcon sx={{ color: 'var(--bg-s-800)' }} />
        ) : (
          <KeyboardArrowDownOutlinedIcon sx={{ color: 'var(--bg-s-800)' }} />
        )}
      </div>
      {monthExpanded && (
        <div className='month-expand'>
          <KeyboardArrowLeftOutlinedIcon />
          {monthsName.map((item) => {
            return <SingleMonth key={item.id} {...item} />
          })}
          <KeyboardArrowRightOutlinedIcon />
        </div>
      )}
      <div className='flex'>
        <Btn variant='outlined' text onClick={backToday}>
          Today
        </Btn>
        <Tooltip title='previous month' arrow>
          <Btn
            variant='outlined'
            left
            onClick={() => {
              setIndex(makeItSafe(index - 1))
            }}>
            <KeyboardArrowLeftOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
        <Tooltip title='next month' arrow>
          <Btn
            right
            variant='outlined'
            onClick={() => {
              setIndex(makeItSafe(index + 1))
            }}>
            <KeyboardArrowRightOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
      </div>
    </Wrapper>
  )
}

export default Months

const Btn = styled('button')(({ left, right, text }) => ({
  border: '2px solid var(--bg-s-800)',
  borderLeft: right && 'none',
  color: 'var(--bg-s-800)',
  padding: text ? '.5rem' : '.3rem',
  marginRight: text && '1rem',
  outline: 'none',
  background: 'transparent',
  borderRadius: text && 'var(--light-radius)',
  borderTopLeftRadius: left && 'var(--radius)',
  borderBottomLeftRadius: left && 'var(--radius)',
  borderTopRightRadius: right && 'var(--radius)',
  borderBottomRightRadius: right && 'var(--radius)',
  cursor: 'pointer',
  fontWeight: text && '800',
  ':hover': {
    background: 'var(--bg-s-50)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const Wrapper = styled('div')(() => ({
  // background: 'red',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.4rem 0',
  '.container': {
    borderRadius: 'var(--radius)',
    display: 'flex',
    alignItems: 'center',
    gap: '.4rem',
    h1: {
      '.month': {
        color: 'var(--text-700)',
      },
      '.year': {
        fontWeight: '300',
        color: 'var(--text-300)',
      },
    },
    ':hover': {
      background: 'var(--text-50)',
    },
  },
  '.month-expand': {
    borderRadius: 'var(--radius)',
    padding: '1rem',
    background: 'var(--card-bg)',
    boxShadow: 'var(--shadow)',
    position: 'absolute',
    width: '101%',
    top: '105%',
    left: '-1%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: '100',
    '::before': {
      content: "''",
      position: 'absolute',
      top: '-11%',
      left: '6%',
      background: 'var(--card-bg)',
      width: '20px',
      height: '20px',
      transform: 'rotate(45deg)',
    },
  },
  '.flex': {
    // background: 'blue',
    display: 'flex',
  },
}))
