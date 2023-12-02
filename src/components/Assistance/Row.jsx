import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'
import { formatMoney, formatPercent } from '../../functions'
import { useDataContext } from '../../context'
export default function Row({ type, isPlanned, planned }) {
  const { makeDataForChart, setPieTitle, pieTitle, setPieValue } =
    useDataContext()
  const incomeValue = makeDataForChart()[0].planned

  return (
    <Wrapper planned={isPlanned}>
      <div className={`grid ${pieTitle === type ? 'active' : null}`}>
        <span
          onClick={() => {
            setPieTitle((prev) => {
              if (prev === type) {
                return ''
              } else {
                return type
              }
            })
            setPieValue(planned)
          }}
        >
          {type}
        </span>
        <span className='num' style={{ justifySelf: 'start' }}>
          {formatMoney(planned)}
        </span>
        {isPlanned && (
          <span className='num' style={{ justifySelf: 'end' }}>
            {formatPercent(planned / incomeValue, true)}
          </span>
        )}
      </div>
      <Divider />
    </Wrapper>
  )
}

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
    gridTemplateColumns: planned ? '1fr .1fr .4fr' : '1fr .2fr ',
    padding: ' .4rem 0',
    span: {
      fontWeight: '600',
      cursor: 'pointer',
    },
    '.num': {
      color: 'var(--text-600)',
    },
  },
  '.active': {
    span: {
      fontWeight: '700',
    },
  },
}))
