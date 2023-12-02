import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Tab, Tabs, Avatar, Badge } from '@mui/material'
import {
  DonutLargeOutlinedIcon,
  AttachMoneyOutlinedIcon,
  AccountBalanceOutlinedIcon,
} from '../../assets/icons'
import { Accounts, Summary, Transactions } from '../'
import { useGlobalContext } from '../../context'

export default function RightCard() {
  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const { transList } = useGlobalContext()
  return (
    <Wrapper>
      <div className='wrapper'>
        <Tabs
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          centered
          value={value}
          onChange={handleChange}
        >
          <TabBtn
            disableRipple
            icon={<DonutLargeOutlinedIcon className='icon' />}
            label='summary'
          />
          <TabBtn
            disableRipple
            icon={
              <Badge
                sx={{
                  '.MuiBadge-anchorOriginBottomRight': {
                    left: '48%',
                  },
                }}
                invisible={transList.length === 0}
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <SmallNumber
                    sx={{
                      background: value === 1 && 'var(--bg-s-800)',
                    }}
                  >
                    {transList.length}
                  </SmallNumber>
                }
              >
                <AttachMoneyOutlinedIcon className='icon' />
              </Badge>
            }
            label='transactions'
          />
          <TabBtn
            disableRipple
            icon={<AccountBalanceOutlinedIcon className='icon' />}
            label='accounts'
          />
        </Tabs>
      </div>

      <main>
        {value === 0 && <Summary />}
        {value === 1 && <Transactions />}
        {value === 2 && <Accounts />}
      </main>
    </Wrapper>
  )
}

const SmallNumber = styled(Avatar)(() => ({
  width: 23,
  height: 23,
  border: '2px solid var(--card-bg)',
  fontSize: '1rem',
  background: 'var(--text-50)',
}))

const TabBtn = styled(Tab)(() => ({
  width: '30%',
  padding: '2rem',
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
  overflow: 'hidden',

  main: {
    overflow: 'auto',
    maxHeight: 'calc(100% - 102px)',
  },
}))
