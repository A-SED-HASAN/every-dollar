import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { TabBtn } from '../../../../global'
import { Tabs, Fab, Zoom, Tooltip } from '@mui/material'
import { transactionsValues_tabs } from '../../../../assets/constants'
import TransactionModal from './TransactionModal'
import { AddOutlinedIcon } from '../../../../assets/icons'
import { SearchInput } from '../../../'

const Transactions = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <TransactionModal />
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        centered
        value={value}
        onChange={handleChange}>
        {transactionsValues_tabs.map((item) => {
          const { id, label } = item
          return <Tab disableRipple key={id} label={label} />
        })}
      </Tabs>
      <SearchInput />

      <Tooltip title='add transaction' arrow placement='top'>
        <Zoom
          unmountOnExit
          in={true}
          timeout={{
            enter: 500,
          }}>
          <FaBtn color='primary'>
            <AddOutlinedIcon />
          </FaBtn>
        </Zoom>
      </Tooltip>
    </Wrapper>
  )
}

export default Transactions

const Wrapper = styled('div')(() => ({
  // background: 'red',
  padding: '.5rem 1rem',
  height: '100%',
}))

const Tab = styled(TabBtn)(() => ({
  color: 'var(--text-300)',
  fontWeight: '600',
  fontSize: '.9rem',
  textTransform: 'capitalize',
  margin: '0 .59rem',
  ':hover': {
    color: 'var(--bg-s-700)',
  },
  '&.Mui-selected': {
    fontWeight: '700',
    fontSize: '.95rem',
    color: 'var(--bg-s-800)',
  },
}))

const FaBtn = styled(Fab)(() => ({
  background: 'var(--bg-s-800)',

  ':hover': {
    background: 'var(--bg-s-850)',
  },
  '*': {
    cursor: 'pointer',
  },
}))
