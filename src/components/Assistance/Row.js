import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'
import { formatMoney } from '../../functions'

const Row = ({ type, planned, percent, value }) => {
  return (
    <Wrapper planned={planned}>
      <div className='grid'>
        <span>{type}</span>
        <span className='num'>{formatMoney(value)}</span>
        {planned && (
          <span className='num' style={{ justifySelf: 'end' }}>
            ({value}%)
          </span>
        )}
      </div>
      <Divider />
    </Wrapper>
  )
}

export default Row

const Wrapper = styled('div')(({ planned }) => ({
  padding: '.3rem ',
  ':nth-of-type(10n+1)': {
    color: ' #00b2f6',
  },
  ':nth-of-type(10n+2)': {
    color: ' #e64b40',
  },
  ':nth-of-type(10n+3)': {
    color: ' #faab19',
  },
  ':nth-of-type(10n+4)': {
    color: ' #48ce65',
  },
  ':nth-of-type(10n+5)': {
    color: ' #b34fa0',
  },
  ':nth-of-type(10n+6)': {
    color: ' #16a597',
  },

  ':nth-of-type(10n+7)': {
    color: ' #f26552',
  },
  ':nth-of-type(10n+8)': {
    color: ' #e3b409',
  },
  ':nth-of-type(10n+9)': {
    color: ' #35bd59',
  },
  ':nth-of-type(10n+10)': {
    color: ' #634fb3',
  },

  '.grid': {
    display: 'grid',
    gridTemplateColumns: planned ? '1fr .4fr .3fr' : '1fr .2fr ',
    padding: ' .4rem 0',
    span: {
      fontWeight: '600',
    },
    '.num': {
      color: 'var(--text-600)',
    },
  },
}))
