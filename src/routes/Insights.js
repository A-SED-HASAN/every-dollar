import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { useDataContext } from '../context/DataContext'
import { monthNameFinder } from '../functions'
import { LoadingCenter, JustYear, InsBar, InsLine } from '../components'
import {
  ErrorOutlineOutlinedIcon,
  ArrowBackOutlinedIcon,
} from '../assets/icons'
import { useGlobalContext } from '../context/GlobalContext'

const Insights = () => {
  const { allDate, loading, thisYear } = useDataContext()
  const { isBarChart } = useGlobalContext()
  const [data, setData] = useState([])

  useEffect(() => {
    const existDate = allDate.map((item) => {
      const splitDate = item.date.split('-')
      const { income, spent } = item
      const month = monthNameFinder(splitDate[1])
      const year = splitDate[0]

      if ((income === 0 && spent === 0) || +year !== thisYear) {
        return {}
      }
      return [
        {
          name: 'income',
          month: month,
          value: income,
        },
        {
          name: 'spent',
          month: month,
          value: spent,
        },
      ]
    })
    setData(existDate.flat())
  }, [allDate, thisYear])
  if (loading) {
    return <LoadingCenter />
  }
  const _isDataEmpty = data.filter((value) => Object.keys(value).length !== 0)

  return (
    <Wrapper>
      <JustYear />
      {_isDataEmpty.length > 0 ? (
        <ChartWrapper>
          {isBarChart ? <InsBar data={data} /> : <InsLine data={data} />}
        </ChartWrapper>
      ) : (
        <ErrorWrapper>
          <div>
            <h1>
              add at least one month to ¨ {thisYear} ¨ budget's to track !
            </h1>
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: '9rem', color: 'var(--error)' }}
            />
            <Link to='budget'>
              <Btn variant='outlined' startIcon={<ArrowBackOutlinedIcon />}>
                back to budget for planning
              </Btn>
            </Link>
          </div>
        </ErrorWrapper>
      )}
    </Wrapper>
  )
}

export default Insights
const Btn = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  color: 'var(--bg-s-700)',
  border: '1px solid var(--bg-s-700)',
  padding: '1rem 2rem',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    color: 'var(--bg-s-800)',
    border: '1px solid var(--bg-s-800)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const Wrapper = styled('div')(() => ({
  padding: '1.5rem',
  maxHeight: '100vh',

  // width: open ? 'calc(100vw - 240px)' : 'calc(100vw - 65px)',
}))
const ChartWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'calc(100vh - 150px)',
}))

const ErrorWrapper = styled('div')(() => ({
  width: '100%',
  height: 'calc(100vh - 150px)',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  div: { display: 'grid', placeItems: 'center', gap: '1rem' },
}))
