import React from 'react'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  arrowDirection,
  formatMoney,
  isNanChecker,
  monthNameFinder,
  posORneg,
} from '../../functions'
import { useDataContext } from '../../context/DataContext'
const Remain = ({ amount }) => {
  const { monthExpanded, specificList, allDate, thisYear, thisMonth } =
    useDataContext()

  const lastYearSpecificList = allDate.find((item) => {
    return item.date === `${thisYear - 1}-${thisMonth}`
  })
  const lastMonthSpecificList = allDate.find((item) => {
    return item.date === `${thisYear}-${thisMonth - 1}`
  })
  const todayInc = isNanChecker(specificList?.income)
  const todaySpe = isNanChecker(specificList?.spent)

  const lastMoIncDiff = isNanChecker(todayInc - lastMonthSpecificList?.income)
  const lastMoSpeDiff = isNanChecker(todaySpe - lastMonthSpecificList?.spent)

  const lastYeIncDiff = isNanChecker(todayInc - lastYearSpecificList?.income)
  const lastYeSpeDiff = isNanChecker(todaySpe - lastYearSpecificList?.spent)

  return (
    <Wrapper>
      <div className='container'>
        <p className='number' style={{ color: amount < 0 && 'var(--error)' }}>
          {formatMoney(amount)}
        </p>
        <p className='text'> {amount >= 0 ? ' left to' : ' over'} budget</p>
        {!monthExpanded && (
          <div className='info-expand'>
            <Divider>income's</Divider>
            <div className='row'>
              <p>sum of income</p>
              <p>{formatMoney(todayInc)}</p>
            </div>

            <div className='row'>
              <p>
                {monthNameFinder(thisMonth)} vs {monthNameFinder(thisMonth - 1)}
              </p>
              <p className={`${posORneg(lastMoIncDiff)}`}>
                {arrowDirection(lastMoIncDiff)} {formatMoney(lastMoIncDiff)}
              </p>
            </div>
            <div className='row'>
              <p>
                {monthNameFinder(thisMonth)}/{thisYear} vs{' '}
                {monthNameFinder(thisMonth)}/{thisYear - 1}
              </p>
              <p className={`${posORneg(lastYeIncDiff)}`}>
                {arrowDirection(lastYeIncDiff)} {formatMoney(lastYeIncDiff)}
              </p>
            </div>

            <Divider sx={{ mt: 2 }}>spent's</Divider>
            <div className='row'>
              <p>sum of spent's</p>
              <p>{formatMoney(todaySpe)}</p>
            </div>

            <div className='row'>
              <p>
                {monthNameFinder(thisMonth)} vs {monthNameFinder(thisMonth - 1)}
              </p>
              <p className={`${posORneg(lastMoSpeDiff, true)}`}>
                {arrowDirection(lastMoSpeDiff)}
                {formatMoney(lastMoSpeDiff)}
              </p>
            </div>
            <div className='row'>
              <p>
                {monthNameFinder(thisMonth)}/{thisYear} vs{' '}
                {monthNameFinder(thisMonth)}/{thisYear - 1}
              </p>
              <p className={`${posORneg(lastYeSpeDiff, true)}`}>
                {arrowDirection(lastYeSpeDiff)}
                {formatMoney(lastYeSpeDiff)}
              </p>
            </div>
          </div>
        )}
      </div>
      <Divider />
    </Wrapper>
  )
}

export default Remain

const Wrapper = styled('div')(() => ({
  '.container': {
    display: 'flex',
    alignItems: 'center',
    gap: '.2rem',
    marginBottom: '1rem',
    position: 'relative',
    cursor: 'pointer',
    width: '230px',
    '.info-expand': {
      cursor: 'default',
      display: 'none',
      borderRadius: 'var(--radius)',
      padding: '1rem',
      background: 'var(--card-bg)',
      boxShadow: 'var(--shadow)',
      position: 'absolute',
      width: '120%',
      top: '150%',
      left: '-5px',
      zIndex: '100',
      '::before': {
        content: "''",
        position: 'absolute',
        top: '-10px',
        left: '28px',
        background: 'var(--card-bg)',
        width: '20px',
        height: '20px',
        transform: 'rotate(45deg)',
      },
      '*': {
        cursor: 'default',
      },
    },
    '*': {
      cursor: 'pointer',
    },
    ':hover': {
      '.info-expand': {
        display: 'block',
      },
    },
  },
  p: {
    color: 'var(--text-500)',
    fontWeight: '500',
  },
  '.row': {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.3rem 0',
  },
  '.number': {
    color: 'var(--text-700)',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
}))
