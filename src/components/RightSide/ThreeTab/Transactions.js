import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { TabBtn } from '../../../global'
import { Tabs } from '@mui/material'
import { transactionsValues_tabs } from '../../../assets/constants'

const Transactions = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
    console.log(newValue)
  }
  return (
    <Wrapper>
      <Tabs centered value={value} onChange={handleChange}>
        {transactionsValues_tabs.map((item) => {
          const { id, label } = item
          return <TabBtn key={id} label={label} />
        })}
      </Tabs>
    </Wrapper>
  )
}

export default Transactions

const Wrapper = styled('div')(() => ({
  background: 'red',
}))
