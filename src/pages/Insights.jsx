import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useDataContext } from '../context/DataContext'
import { monthNameFinder } from '../functions'
import {
  LoadingCenter,
  JustYear,
  InsBar,
  InsLine,
  EmptyChart,
} from '../components'

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
        <EmptyChart
          errorText={`add at least one month to ¨ ${thisYear} ¨ budget's to track !`}
        />
      )}
    </Wrapper>
  )
}

export default Insights

const Wrapper = styled('div')(() => ({
  padding: '1.5rem',
  maxHeight: '100vh',
}))
const ChartWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'calc(100vh - 150px)',
}))
