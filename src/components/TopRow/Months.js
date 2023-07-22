import React from 'react'

import { styled } from '@mui/material/styles'
import { Tooltip, Chip } from '@mui/material'
import moment from 'moment'

import {
  KeyboardArrowRightOutlinedIcon,
  KeyboardArrowLeftOutlinedIcon,
  KeyboardArrowUpOutlinedIcon,
  KeyboardArrowDownOutlinedIcon,
  RestoreOutlinedIcon,
} from '../../assets/icons'
import { SingleMonth } from '../'
import { monthsName } from '../../assets/constants'
import { useDataContext } from '../../context/DataContext.js'
const Months = () => {
  const {
    thisMonth,
    setThisYear,
    setThisMonth,
    thisYear,
    toggleExpandMonth,
    monthExpanded,
    name,
  } = useDataContext()

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

  let monthNow = +moment().format('M')
  let yearNow = +moment().format('YYYY')

  const backToday = () => {
    setThisMonth(monthNow)
    setThisYear(yearNow)
  }

  let _ForNotToday = monthNow !== thisMonth || yearNow !== thisYear

  let _ForPastOrFuture =
    thisYear < yearNow || (thisYear === yearNow && thisMonth < monthNow)

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
        {_ForNotToday && (
          <Tooltip title='jump today' arrow>
            <Btn variant='outlined' text onClick={backToday}>
              Today
            </Btn>
          </Tooltip>
        )}
        <Tooltip placement='left' title='previous month' arrow>
          <Btn
            variant='outlined'
            left
            onClick={() => {
              setThisMonth(makeItSafe(thisMonth - 1))
            }}>
            <KeyboardArrowLeftOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
        <Tooltip placement='right' title='next month' arrow>
          <Btn
            right
            variant='outlined'
            onClick={() => {
              setThisMonth(makeItSafe(thisMonth + 1))
            }}>
            <KeyboardArrowRightOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
        {_ForNotToday && (
          <Cheap
            sx={{ textTransform: 'lowercase' }}
            size='small'
            color='warning'
            icon={<RestoreOutlinedIcon />}
            label={`You are viewing a${_ForPastOrFuture ? ' past ' : ' future '}
            month.`}
          />
        )}
      </div>
    </Wrapper>
  )
}

export default Months

const Cheap = styled(Chip)(() => ({
  position: 'absolute',
  bottom: '0',
  left: '100%',
  transform: 'translate(-100%,85%)',
  background: 'var(--warning)',
  color: 'var(--text-900)',
  fontWeight: '600',
  fontSize: '.7rem',
}))

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
        fontWeight: '400',
        color: 'var(--text-300)',
      },
    },
    ':hover': {
      background: 'var(--text-50)',
    },
  },
  '.month-expand': {
    flexWrap: 'wrap',
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
    display: 'flex',
  },
}))
