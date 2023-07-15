import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Chart, Row } from '../..'
import { styled } from '@mui/material/styles'

const Summary = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Wrapper>
      {value === 0 && <Chart />}

      <nav>
        <Tabs centered value={value} onChange={handleChange}>
          <TabBtn
            label='planned'
            sx={{ borderBottom: 2, borderColor: 'divider' }}
          />
          <TabBtn
            label='spent'
            sx={{ borderBottom: 2, borderColor: 'divider' }}
          />
          <TabBtn
            label='remaining'
            sx={{
              borderBottom: 2,
              borderColor: 'divider',
            }}
          />
        </Tabs>

        {value === 0 && <Row title='giving' />}
      </nav>
    </Wrapper>
  )
}

export default Summary

const TabBtn = styled(Tab)(() => ({
  color: 'var(--text-800)',
  fontWeight: '500',
  margin: ' 0 .15rem',
  padding: '0',
  '&.Mui-selected': {
    fontWeight: '700',
    color: 'var(--text-800)',
  },
}))

const Wrapper = styled('div')(() => ({
  margin: 'auto',
  nav: { background: 'red', width: '50%' },
}))
