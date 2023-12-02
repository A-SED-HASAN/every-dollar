import React from 'react'
import { Divider } from '@mui/material'
import { Months } from '..'
import { useDataContext } from '../../context/DataContext'

export default function JustYear() {
  const { allDate } = useDataContext()

  const uniqueYears = [
    ...new Set(
      allDate
        .map((item) => {
          const splitDate = item.date.split('-')

          return splitDate[0]
        })
        .sort((a, b) => a - b)
    ),
  ].map((item, index) => {
    return { id: index, year: item }
  })

  return (
    <>
      <Months justYear data={uniqueYears} />
      <Divider sx={{ margin: '1.5rem 0' }} />
    </>
  )
}
