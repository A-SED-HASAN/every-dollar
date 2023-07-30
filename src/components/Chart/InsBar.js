import React from 'react'
import { Column, getCanvasPattern } from '@ant-design/plots'
import { formatMoney } from '../../functions'

export const InsBar = ({ data }) => {
  const pattern = (datum, color) =>
    getCanvasPattern({
      type: datum.name === 'spent' ? 'dot' : 'line',
      cfg: {
        backgroundColor: color,
      },
    })

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',

    dodgePadding: 5,
    intervalPadding: 50,
    //space between columns
    columnWidthRatio: 1,

    //space between bars
    marginRatio: 1,
    minColumnWidth: 20,
    maxColumnWidth: 30,
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

    label: {
      position: 'top',
      content: (item) => {
        return formatMoney(item.value)
      },

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

    legend: {
      position: 'top',
      marker: (text, index, item) => {
        const color = item.style.fill
        return {
          style: {
            fill: pattern(
              {
                name: text,
              },
              color
            ),
            r: 8,
          },
        }
      },
    },

    pattern,

    tooltip: {
      formatter: (datum) => ({
        name: datum.name,
        value: formatMoney(datum.value),
      }),
    },
    animation: false,
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
