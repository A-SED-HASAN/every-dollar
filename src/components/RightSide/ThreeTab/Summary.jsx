import React, { useState } from 'react'
import { Tabs } from '@mui/material'
import { BuPie, Row } from '../..'
import { styled } from '@mui/material/styles'
import { useDataContext } from '../../../context'
import { summaryValues_tabs } from '../../../assets/constants'
import { TabBtn } from '../../../global'

export default function Summary() {
  const { makeDataForChart, pieTitle, pieValue } = useDataContext()
  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  const dataMustRendered = makeDataForChart().filter((item) => {
    return item.type !== 'income'
  })
  const incomeValue = makeDataForChart()[0]?.planned

  return (
    <Wrapper>
      {value >= 0 && (
        <BuPie
          data={dataMustRendered}
          pieTitle={pieTitle || summaryValues_tabs[value].label}
          pieValue={pieValue || incomeValue}
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
          {dataMustRendered.map((item, index) => {
            return <Row key={index} {...item} isPlanned />
          })}
        </article>
      )}
    </Wrapper>
  )
}

const Wrapper = styled('div')(() => ({
  padding: '1.3rem',

  article: {
    width: '92%',
    margin: 'auto',
    overflow: 'auto',
    height: '310px',
  },
}))
