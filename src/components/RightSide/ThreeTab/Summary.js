import React, { useState } from 'react'
import { Tabs } from '@mui/material'
import { Chart, Row } from '../..'
import { styled } from '@mui/material/styles'
import { useDateContext } from '../../../context/DateContext'
import { summaryValues_tabs } from '../../../assets/constants'
import { TabBtn } from '../../../global'

const Summary = () => {
  const { makeDataForChart } = useDateContext()
  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      {value >= 0 && (
        <Chart
          data={makeDataForChart()}
          pieTitle={summaryValues_tabs[value].label}
        />
      )}
      <Tabs centered value={value} onChange={handleChange}>
        {summaryValues_tabs.map((item) => {
          const { id, label } = item
          return <TabBtn key={id} label={id === 1 ? 'planned' : label} />
        })}
      </Tabs>
      {value === 0 && (
        <article>
          {makeDataForChart().map((item, index) => {
            return index !== 0 && <Row key={index} {...item} planned />
          })}
        </article>
      )}
    </Wrapper>
  )
}

export default Summary

const Wrapper = styled('div')(() => ({
  padding: '1.3rem',
  article: {
    width: '92%',
    margin: 'auto',
    overflow: 'auto',
    height: '310px',
  },
}))
