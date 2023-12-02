import React from 'react'
import { Line } from '@ant-design/plots'

import { formatMoney } from '../../functions'

export const InsLine = ({ data }) => {
  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',
    smooth: true,
    yAxis: {
      label: {
        formatter: (v) => formatMoney(v),
      },
    },
    color: ({ name }) => {
      if (name === 'income') {
        return '#48ce65'
      }
      return '#e64b40'
    },
    point: {
      shape: 'circle',
    },
    //   ({ name }) => {
    //     return name === 'income' ? 'square' : 'circle'
    //   },
    //   size: 5,
    //   //   shape: 'diamond',
    //   style: {
    //     fill: 'white',
    //     stroke: '#5B8FF9',
    //     lineWidth: 2,
    //   },
    // },
    // state: {
    //   active: {
    //     style: {
    //       shadowBlur: 4,
    //       stroke: '#000',
    //       fill: 'red',
    //     },
    //   },
    // },
    label: {
      position: 'top',
      content: (item) => {
        return formatMoney(item.value)
      },
      style: {
        fontSize: 10,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.name,
        value: formatMoney(datum.value),
      }),
      showMarkers: true,
    },
    legend: {
      position: 'top',
    },
    animation: false,
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }

  return <Line {...config} />
}
