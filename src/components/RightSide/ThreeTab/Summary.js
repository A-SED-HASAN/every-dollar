import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Chart, Row } from '../..'
import { styled } from '@mui/material/styles'

const Summary = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    console.log(newValue)
  }
  const values = [
    { id: '1', label: 'planned' },
    { id: '2', label: 'spent' },
    { id: '3', label: 'remaining' },
  ]
  const data = [
    {
      type: 'doubt',
      value: 25,
    },
    {
      type: 'charity',
      value: 25,
    },
    {
      type: 'food',
      value: 25,
    },
    {
      type: 'work',
      value: 25,
    },
    {
      type: 'sos',
      value: 10,
    },
    {
      type: 'friends',
      value: 5,
    },
    {
      type: 'mammad',
      value: 10,
    },
  ]
  return (
    <Wrapper>
      {value >= 0 && <Chart data={data} pieTitle={values[value].label} />}

      <Tabs centered value={value} onChange={handleChange}>
        {/* <TabBtn label='planned' />
        <TabBtn label='spent' />
        <TabBtn label='remaining' /> */}
        {values.map((item) => (
          <TabBtn key={item.id} label={item.label} />
        ))}
      </Tabs>
      {value >= 0 && (
        <article>
          <Row title='giving' />
          <Row title='giving' />
          <Row title='giving' />
          <Row title='giving' />
        </article>
      )}
    </Wrapper>
  )
}

export default Summary

const TabBtn = styled(Tab)(() => ({
  color: 'var(--text-800)',
  fontWeight: '500',
  margin: ' 0 .15rem',
  padding: '0',
  borderBottom: '2px',

  '&.Mui-selected': {
    fontWeight: '700',
    color: 'var(--text-800)',
  },
}))

const Wrapper = styled('div')(() => ({
  article: {
    background: 'blue',
    width: '67%',
    margin: 'auto',
  },
}))
