import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { IconBtn, TabBtn } from '../../../global'
import { Tabs, Fab, Zoom, Tooltip } from '@mui/material'
import { transactionsValues_tabs } from '../../../assets/constants'
import TransactionModal from '../../Modal/TransactionModal'
import {
  AddOutlinedIcon,
  DeleteOutlineOutlinedIcon,
} from '../../../assets/icons'
import { SearchInput } from '../..'
import { useGlobalContext } from '../../../context/GlobalContext'
import { LoadingCenter } from '../..'
import { formatMoney, monthNameFinder } from '../../../functions'
const Transactions = () => {
  const { handleOpenTrans, transList, transListLoading, getTrans } =
    useGlobalContext()

  const [value, setValue] = useState(0)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    getTrans()
  }, [])

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

      <TransListWrapper>
        {transListLoading ? (
          <LoadingCenter />
        ) : (
          transList.map((item) => {
            return <Row key={item.id} {...item} />
          })
        )}
      </TransListWrapper>

      <Tooltip title='add transaction' arrow placement='top'>
        <Zoom
          unmountOnExit
          in={true}
          timeout={{
            enter: 500,
          }}>
          <FaBtn onClick={handleOpenTrans}>
            <AddOutlinedIcon />
          </FaBtn>
        </Zoom>
      </Tooltip>
    </Wrapper>
  )
}

export default Transactions

const Wrapper = styled('div')(() => ({
  marginTop: '1rem',
  // height: 'calc(100vh - 180px)',
}))
const TransListWrapper = styled('div')(() => ({
  // background: 'var(--bg-p-100)',
  // height: '100%',
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
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  background: 'var(--bg-s-800)',
  color: 'var(--card-bg)',
  '@media (width<= 1200px)': {
    bottom: '13px',
    right: '13px',
  },
  ':hover': {
    background: 'var(--bg-s-850)',
  },
  '*': {
    cursor: 'pointer',
  },
}))

const Row = ({ amount, date, title, budgetItem, whereSpend_income }) => {
  const [day, month] = date.split('-')
  return (
    <RowWrapper>
      <div className='date'>
        {/* <span>{monthNameFinder(month)}</span>
        <span>{day}</span> */}
      </div>
      <div className='spend-income'>
        <span>{whereSpend_income}</span>
        <span className='amount'>{formatMoney(amount)}</span>
        <IconButton className='delete'>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </div>
    </RowWrapper>
  )
}

const RowWrapper = styled('div')(() => ({
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  borderBottom: '1px solid rgba(0,0,0,.1)',
  padding: '.5rem 1rem',

  gap: '1rem',
  '.date': {
    fontSize: '.75rem',
    fontWeight: '600',
    color: 'var(--bg-s-900)',
    width: '45px',
    height: '45px',
    border: '2px solid var(--bg-s-800)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    '::before': {
      content: "'⁕'",
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: '30%',
      top: '-9%',
      fontSize: '2rem',
      display: 'none',
      cursor: 'pointer',
    },
  },
  '.spend-income': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '.delete': {
      display: 'none',
    },
  },
  '*': {
    cursor: 'pointer',
  },
  ':hover': {
    background: 'var(--bg-s-50)',
    '.date': {
      span: {
        display: 'none',
      },
      '::before': {
        display: 'block',
      },
    },
    '.spend-income': {
      '.amount': {
        display: 'none',
      },
      '.delete': {
        display: 'flex',
      },
    },
  },
}))

const IconButton = styled(IconBtn)(() => ({
  color: 'var(--bg-s-800)',
  padding: '.3rem',
  ':hover': {
    color: 'var(--bg-s-900)',
  },
}))
