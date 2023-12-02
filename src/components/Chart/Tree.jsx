import React from 'react'
import { Treemap } from '@ant-design/plots'
import { formatMoney, lengthChecker } from '../../functions'
import { styled } from '@mui/material/styles'
import { colors } from '../../assets/constants'

export const Tree = ({ data }) => {
  const config = {
    data,
    colorField: 'brand',
    color: colors,
    pattern: {
      type: 'dot',
      cfg: {
        size: 1,
        padding: 8,
        rotation: 0,
        fill: '#FFF',
        isStagger: true,
      },
    },
    legend: {
      flipPage: false,
      maxRow: 4,
    },
    tooltip: {
      follow: true,
      enterable: true,
      offset: 5,
      customContent: (_, items) => {
        if (!items || items.length <= 0) return
        const { data: itemData } = items[0]
        const parent = itemData.path[1]
        const root = itemData.path[itemData.path.length - 1]
        const { brand, name, value } = itemData
        return (
          <Wrapper>
            <div className='tooltip-item'>
              <span>brand </span>
              <span>{lengthChecker(brand)}</span>
            </div>
            <div className='tooltip-item'>
              <span>name</span>
              <span>{lengthChecker(name)}</span>
            </div>

            <div className='tooltip-item'>
              <span>value</span>
              <span>{formatMoney(value)}</span>
            </div>

            <div className='tooltip-item'>
              <span>of group</span>
              <span>{((value / parent.value) * 100).toFixed(2)}%</span>
            </div>

            <div className='tooltip-item'>
              <span>of all</span>
              <span>{((value / root.value) * 100).toFixed(2)}%</span>
            </div>
          </Wrapper>
        )
      },
    },

    interactions: [{ type: 'element-active' }, { type: 'legend-highlight' }],
  }
  return <Treemap {...config} />
}

const Wrapper = styled('div')(() => ({
  padding: '1rem .5rem',
  width: '10rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.7rem',
  '.tooltip-item': {
    display: 'flex',
    color: 'var(--text-700)',
    width: ' 100%',
    justifyContent: ' space-between',
  },
}))
