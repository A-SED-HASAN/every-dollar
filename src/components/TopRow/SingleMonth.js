import React from 'react'
import { styled } from '@mui/material/styles'
import { monthNameFinder } from '../../functions'
import { useDataContext } from '../../context/DataContext'

const SingleMonth = ({ month, year, justYear }) => {
  const {
    toggleExpandMonth,
    setThisYear,
    setThisMonth,
    monthNow,
    yearNow,
    thisMonth,
    thisYear,
  } = useDataContext()

  const changeDateHandler = () => {
    setThisYear(+year)
    setThisMonth(+month)
    toggleExpandMonth()
  }
  const changeJustYearHandler = () => {
    setThisYear(+year)
    toggleExpandMonth()
  }

  const _today = monthNow === +month && yearNow === +year
  const _thisYear = yearNow === +year

  const _thisDate = thisMonth === +month && thisYear === +year
  const _thisDateJustYear = thisYear === +year

  return (
    <Wrapper
      onClick={() => {
        justYear ? changeJustYearHandler() : changeDateHandler()
      }}>
      <h5 style={{ padding: justYear ? '.3rem .2rem' : '0' }}>
        {!justYear ? monthNameFinder(month) : year}
      </h5>
      {!justYear && <p>{year}</p>}
      {!justYear
        ? _today && <span>today</span>
        : _thisYear && <span>today</span>}
      {!justYear
        ? _thisDate && !_today && <span>this !</span>
        : _thisDateJustYear && !_thisYear && <span>this !</span>}
    </Wrapper>
  )
}

export default SingleMonth

const Wrapper = styled('article')(() => ({
  position: 'relative',
  cursor: 'pointer',
  border: '1px dashed var(--text-800)',
  textAlign: 'center',
  padding: '.5rem 2rem',
  borderRadius: 'var(--light-radius)',
  overflow: 'hidden',
  h5: {
    fontWeight: '600',
    color: 'var(--text-500)',
    fontSize: '1rem',
  },
  p: {
    color: 'var(--text-500)',
    fontSize: '.6rem',
  },
  span: {
    position: 'absolute',
    top: '2%',
    left: '15%',
    fontSize: '.5rem',
    fontWeight: '600',
    color: 'var(--warning)',
    transform: 'rotate(-45deg) translate(-50%, -50%)',
    borderBottom: '1px solid var(--card-bg)',
  },
  ':hover': {
    background: 'var( --bg-main)',
    span: {
      borderBottomColor: ' var(--warning)',
    },
  },
  '*': {
    cursor: 'pointer',
  },
}))
