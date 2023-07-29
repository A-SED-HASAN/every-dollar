import React from 'react'
import { styled } from '@mui/material/styles'
import { monthNameFinder } from '../../functions'
import { useDataContext } from '../../context/DataContext'

const SingleMonth = ({ month, year }) => {
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

  const _toady = monthNow === +month && yearNow === +year
  const thisDate = thisMonth === +month && thisYear === +year

  return (
    <Wrapper onClick={changeDateHandler}>
      <h5>{monthNameFinder(month)}</h5>
      <p>{year}</p>
      {_toady && <span>today</span>}
      {thisDate && !_toady && <span>this !</span>}
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
