import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

import { Tab, Tabs } from '@mui/material'

import {
  DonutLargeOutlinedIcon,
  AttachMoneyOutlinedIcon,
  AccountBalanceOutlinedIcon,
} from '../../assets/icons'
// import { formatMoney } from '../../functions'
import { Accounts, Summary, Transactions } from '../'

const RightCard = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        centered
        value={value}
        onChange={handleChange}>
        <TabBtn
          disableRipple
          icon={<DonutLargeOutlinedIcon className='icon' />}
          label='summary'
        />
        <TabBtn
          disableRipple
          icon={<AttachMoneyOutlinedIcon className='icon' />}
          label='transactions'
        />
        <TabBtn
          disableRipple
          icon={<AccountBalanceOutlinedIcon className='icon' />}
          label='accounts'
        />
      </Tabs>

      <main>
        {value === 0 && <Summary />}
        {value === 1 && <Transactions />}
        {value === 2 && <Accounts />}
      </main>
    </Wrapper>
  )
}

export default RightCard

const TabBtn = styled(Tab)(() => ({
  padding: '2rem',
  // background: 'red',
  color: 'var(--text-200)',
  fontWeight: '600',
  textTransform: 'capitalize',
  '.icon': {
    background: 'var(--text-50)',
    color: 'var(--text-600)',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    padding: '.3rem',
  },
  '&.Mui-selected': {
    color: 'var(--bg-s-800)',
    '.icon': {
      background: 'var(--bg-s-800)',
      color: 'var(--card-bg)',
      padding: '.2rem',
    },
  },
  '*': {
    cursor: 'pointer',
  },
}))

const Wrapper = styled('div')(() => ({
  background: 'var(--card-bg)',
  width: '100%',
  height: '100%',
  maxWidth: '439px',
  borderRadius: 'var(--radius)',
  border: '1px solid var(--card-border-color)',
  main: {
    // background: 'red',
  },
}))
