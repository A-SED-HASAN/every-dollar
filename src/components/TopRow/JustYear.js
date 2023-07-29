import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Months } from '..'
import { useDataContext } from '../../context/DataContext'

const JustYear = () => {
  const { allDate } = useDataContext()
  const [yearRender, setYearRender] = useState([])
  const ali = []
  allDate.map((item) => {
    const splitDate = item.date.split('-')

    ali.push(splitDate[0])
  })
  // useEffect(() => {
  // }, [])
  ali.sort((a, b) => {
    return a.year - b.year
  })
  console.log([...new Set(ali)])
  return (
    <Wrapper>
      <Months justYear />
      <Divider sx={{ margin: '1.5rem 0' }} />
    </Wrapper>
  )
}

export default JustYear

const Wrapper = styled('div')(() => ({}))
