import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Tooltip, Chip } from '@mui/material'

import {
  KeyboardArrowRightOutlinedIcon,
  KeyboardArrowLeftOutlinedIcon,
  KeyboardArrowUpOutlinedIcon,
  KeyboardArrowDownOutlinedIcon,
  RestoreOutlinedIcon,
  AccountBalanceWalletOutlinedIcon,
  BarChartOutlinedIcon,
  ShowChartOutlinedIcon,
  AttachMoneyOutlinedIcon,
  MoneyOffOutlinedIcon,
} from '../../assets/icons'
import { SingleMonth } from '../'
import { useDataContext } from '../../context/DataContext.js'
import { paginate } from '../../functions'
import { IconBtn } from '../../global'
import { useGlobalContext } from '../../context/GlobalContext'
export default function Months({ justYear, data, treeMap }) {
  const {
    thisMonth,
    setThisYear,
    setThisMonth,
    thisYear,
    toggleExpandMonth,
    monthExpanded,
    name,
    allDate,
    monthNow,
    yearNow,
    specificList,
  } = useDataContext()

  const {
    drawerToggleHandler,
    drawerOpen,
    isBarChart,
    toggleChartMode,
    isIncomeInc,
    toggleIsIncomeInc,
  } = useGlobalContext()

  const [page, setPage] = useState(0)

  const [dataRender, setDataRender] = useState(data)

  useEffect(() => {
    setDataRender(paginate(data)[page])
    // eslint-disable-next-line
  }, [page, allDate])

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

  const backToday = () => {
    setThisMonth(monthNow)
    setThisYear(yearNow)
  }
  const backThisYear = () => {
    setThisYear(yearNow)
  }
  let _ForNotToday = monthNow !== thisMonth || yearNow !== thisYear
  let _ForNotThisYear = yearNow !== thisYear

  let _ForPastOrFuture =
    thisYear < yearNow || (thisYear === yearNow && thisMonth < monthNow)

  return (
    <Wrapper>
      <div className='container' onClick={toggleExpandMonth}>
        <h1>
          {!justYear && <span className='month'>{name}</span>}
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
          <IconButton
            sx={{ visibility: page > 0 ? 'visible' : 'hidden' }}
            onClick={() => setPage(page - 1)}>
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          {dataRender.map((item) => {
            return <SingleMonth justYear={justYear} key={item.id} {...item} />
          })}
          <IconButton
            sx={{
              visibility:
                page < paginate(data).length - 1 ? 'visible' : 'hidden',
            }}
            onClick={() => setPage(page + 1)}>
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
        </div>
      )}
      <div className='flex'>
        {justYear
          ? _ForNotThisYear && (
              <Tooltip title='jump today' arrow>
                <Btn variant='outlined' text onClick={backThisYear}>
                  This year
                </Btn>
              </Tooltip>
            )
          : _ForNotToday && (
              <Tooltip title='jump today' arrow>
                <Btn variant='outlined' text onClick={backToday}>
                  Today
                </Btn>
              </Tooltip>
            )}
        <Tooltip
          placement='left'
          title={`previous ${justYear ? 'year' : 'month'}`}
          arrow>
          <Btn
            variant='outlined'
            left
            onClick={() => {
              justYear
                ? setThisYear(thisYear - 1)
                : setThisMonth(makeItSafe(thisMonth - 1))
            }}>
            <KeyboardArrowLeftOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
        <Tooltip
          placement='right'
          title={`next ${justYear ? 'year' : 'month'}`}
          arrow>
          <Btn
            right
            variant='outlined'
            onClick={() => {
              justYear
                ? setThisYear(thisYear + 1)
                : setThisMonth(makeItSafe(thisMonth + 1))
            }}>
            <KeyboardArrowRightOutlinedIcon fontSize='small' />
          </Btn>
        </Tooltip>
        {window.innerWidth <= 900 &&
          !justYear &&
          specificList?.array.length > 0 && (
            <Tooltip title={`${drawerOpen ? 'close' : 'open'} summary`} arrow>
              <Btn onClick={drawerToggleHandler} variant='outlined' icon>
                <AccountBalanceWalletOutlinedIcon fontSize='small' />
              </Btn>
            </Tooltip>
          )}
        {justYear && (
          <Tooltip title={`${isBarChart ? 'bar' : 'line'} chart`} arrow>
            <Btn onClick={toggleChartMode} variant='outlined' icon>
              {isBarChart ? (
                <BarChartOutlinedIcon fontSize='small' />
              ) : (
                <ShowChartOutlinedIcon fontSize='small' />
              )}
            </Btn>
          </Tooltip>
        )}
        {treeMap && (
          <Tooltip
            title={`${isIncomeInc ? 'income Include' : "just spent's "}`}
            arrow>
            <Btn onClick={toggleIsIncomeInc} variant='outlined' icon>
              {isIncomeInc ? (
                <AttachMoneyOutlinedIcon fontSize='small' />
              ) : (
                <MoneyOffOutlinedIcon fontSize='small' />
              )}
            </Btn>
          </Tooltip>
        )}
        {justYear
          ? _ForNotThisYear && (
              <Cheap
                sx={{ textTransform: 'lowercase' }}
                size='small'
                color='warning'
                icon={<RestoreOutlinedIcon />}
                label={`You are viewing a${
                  _ForPastOrFuture ? ' past ' : ' future '
                }  year `}
              />
            )
          : _ForNotToday && (
              <Cheap
                sx={{ textTransform: 'lowercase' }}
                size='small'
                color='warning'
                icon={<RestoreOutlinedIcon />}
                label={`You are viewing a${
                  _ForPastOrFuture ? ' past ' : ' future '
                } month `}
              />
            )}
      </div>
    </Wrapper>
  )
}
const IconButton = styled(IconBtn)(() => ({
  color: 'var(--bg-s-800)',
  ':hover': {
    color: 'var(--bg-s-850)',
  },
}))

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

const Btn = styled('button')(({ left, right, text, icon }) => ({
  border: '2px solid var(--bg-s-800)',
  borderLeft: right && 'none',
  color: 'var(--bg-s-800)',
  padding: text ? '.5rem' : '.3rem',
  marginRight: text && '1rem',
  marginLeft: icon && '1rem',
  outline: 'none',
  background: 'transparent',
  borderRadius: text ? 'var(--light-radius)' : icon && 'var(--radius)',
  borderTopLeftRadius: left && 'var(--radius)',
  borderBottomLeftRadius: left && 'var(--radius)',
  borderTopRightRadius: right && 'var(--radius)',
  borderBottomRightRadius: right && 'var(--radius)',
  cursor: 'pointer',
  fontWeight: text && '800',
  display: 'grid',
  placeItems: 'center',
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
    cursor: 'pointer',
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
    '*': {
      cursor: 'pointer',
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
    display: 'flex',
  },
}))
