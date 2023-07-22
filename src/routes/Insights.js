import React from 'react'
import { Column, getCanvasPattern } from '@ant-design/plots'

const DemoColumn = () => {
  const data = [
    {
      name: 'Total Spent',
      month: 'Jan.',
      value: 18.9,
    },
    {
      name: 'Total Spent',
      month: 'Feb.',
      value: 28.8,
    },
    {
      name: 'Total Spent',
      month: 'Mar.',
      value: 39.3,
    },
    {
      name: 'Total Spent',
      month: 'Apr.',
      value: 81.4,
    },
    {
      name: 'Total Spent',
      month: 'May',
      value: 47,
    },
    {
      name: 'Total Spent',
      month: 'Jun.',
      value: 20.3,
    },
    {
      name: 'Total Spent',
      month: 'Jul.',
      value: 24,
    },
    {
      name: 'Total Spent',
      month: 'Aug.',
      value: 35.6,
    },
    {
      name: 'Total Income',
      month: 'Jan.',
      value: 12.4,
    },
    {
      name: 'Total Income',
      month: 'Feb.',
      value: 23.2,
    },
    {
      name: 'Total Income',
      month: 'Mar.',
      value: 34.5,
    },
    {
      name: 'Total Income',
      month: 'Apr.',
      value: 99.7,
    },
    {
      name: 'Total Income',
      month: 'May',
      value: 52.6,
    },
    {
      name: 'Total Income',
      month: 'Jun.',
      value: 35.5,
    },
    {
      name: 'Total Income',
      month: 'Jul.',
      value: 37.4,
    },
    {
      name: 'Total Income',
      month: 'Aug.',
      value: 42.4,
    },
  ]

  const pattern = (datum, color) =>
    getCanvasPattern({
      type: datum.name === 'Total Spent' ? 'dot' : 'line',
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

    //space between columns
    columnWidthRatio: 0.5,

    //space between bars
    marginRatio: 1,

    label: {
      position: 'middle',
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
    },
    
    // scrollbar: {
    //   type: 'horizontal',
    // },

    // columnStyle: {
    //   fill: 'red',
    //   fillOpacity: 0.5,
    //   stroke: 'black',
    //   lineWidth: 1,
    //   lineDash: [4, 5],
    //   strokeOpacity: 0.7,
    //   shadowColor: 'black',
    //   shadowBlur: 10,
    //   shadowOffsetX: 5,
    //   shadowOffsetY: 5,
    //   cursor: 'pointer',
    // },
    legend: {
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
  }
  return <Column {...config} />
}

const Insights = () => {
  return <DemoColumn />
}

export default Insights
