import React, { useState, useEffect } from 'react'
import { Column, getCanvasPattern } from '@ant-design/plots'
import { useDataContext } from '../context/DataContext'
import { formatMoney, monthNameFinder } from '../functions'
import { LoadingCenter, JustYear } from '../components'
import { styled } from '@mui/material/styles'
import { ErrorOutlineOutlinedIcon } from '../assets/icons'

const ColChart = ({ data }) => {
  // const pattern = (datum, color) =>
  //   getCanvasPattern({
  //     type: datum.name === 'spent' ? 'dot' : 'line',
  //     cfg: {
  //       backgroundColor: color,
  //     },
  //   })

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',
    dodgePadding: 10,
    intervalPadding: 50,
    //space between columns
    columnWidthRatio: 1,

    //space between bars
    marginRatio: 0.1,

    color: ({ name }) => {
      if (name === 'income') {
        return '#48ce65'
      }
      return '#e64b40'
    },

    label: {
      position: 'top',
      content: (item) => {
        return formatMoney(item.value)
      },
      // 'top', 'middle', 'bottom'
      // style: {
      //   fill: '#000',
      //   opacity: 1,
      // },

      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },

    columnStyle: {
      radius: [5, 5, 0, 0],
      cursor: 'pointer',
      lineWidth: 0,
      shadowColor: 'rgba(0,0,0,.2)',
      shadowBlur: 1,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
    },

    // scrollbar: {
    //   type: 'horizontal',
    // },

    legend: {
      position: 'top',
      // marker: (text, index, item) => {
      //   const color = item.style.fill
      //   return {
      //     style: {
      //       fill: pattern(
      //         {
      //           name: text,
      //         },
      //         color
      //       ),
      //       r: 8,
      //     },
      //   }
      // },
    },
    // meta: {
    //   type: {
    //     alias: 'alias',
    //   },
    //   sales: {
    //     alias: 'val',
    //   },
    // },
    // pattern,
    // columnBackground: {
    //   // style: {
    //   //   fill: 'blue',
    //   // },
    // },
    tooltip: {
      formatter: (datum) => ({
        name: datum.name,
        value: formatMoney(datum.value),
      }),
    },
    interactions: [
      {
        type: 'element-highlight-by-color',
      },
      {
        type: 'element-link',
      },
    ],
  }
  return <Column {...config} />
}

const Insights = () => {
  const { allDate, loading, thisYear } = useDataContext()

  const [data, setData] = useState([])

  useEffect(() => {
    const existDate = allDate.map((item) => {
      const splitDate = item.date.split('-')
      const { income, spent } = item
      const month = monthNameFinder(splitDate[1])
      const year = splitDate[0]

      if ((income === 0 && spent === 0) || +year !== thisYear) {
        return {}
      }
      return [
        {
          name: 'income',
          month: month,
          value: income,
        },
        {
          name: 'spent',
          month: month,
          value: spent,
        },
      ]
    })
    setData(existDate.flat())
  }, [allDate, thisYear])
  if (loading) {
    return <LoadingCenter />
  }
  const _isDataEmpty = data.filter((value) => Object.keys(value).length !== 0)

  return (
    <Wrapper>
      {_isDataEmpty.length > 0 ? (
        <ChartWrapper>
          <JustYear />
          <ColChart data={data} />
        </ChartWrapper>
      ) : (
        <ErrorWrapper>
          <div>
            <h1>add at least one month budget to track !</h1>
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: '9rem', color: 'var(--error)' }}
            />
          </div>
        </ErrorWrapper>
      )}
    </Wrapper>
  )
}

export default Insights

const Wrapper = styled('div')(() => ({
  padding: '1.5rem',

  // background: 'red',
}))
const ChartWrapper = styled('div')(() => ({
  // background: 'blue',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  height: '100%',
}))

const ErrorWrapper = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
}))
