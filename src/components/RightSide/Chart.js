import React from 'react'
import { Pie, measureTextWidth } from '@ant-design/plots'

const Chart = ({ pieTitle, data }) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    )
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      )
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`
  }

  // const calcAverageValue = (data, type) => {
  //   const items = data.filter((d) => d.type === type)
  //   return items.length
  //     ? items.reduce((a, b) => a + b.value, 0) / items.length
  //     : '-'
  // }
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.77,
    meta: {
      value: {
        formatter: (v) => `${v} $`,
      },
    },

    // legend: {
    //   position: 'bottom',
    //   // offsetY: 100,
    //   title: {
    //     text: 'title',
    //     // spacing: 100,
    //   },
    // },
    legend: {
      position: 'bottom',
      flipPage: false,
      maxRow: 3,
      // pageNavigator: {
      //   marker: {
      //     style: {
      //       fill: 'rgba(0,0,0,0.65)',
      //     },
      //   },
      // },
    },
    // itemName: {
    //   style: (item, index) => {
    //     return {
    //       fill: calcAverageValue(data, item.value) > 10000 ? 'blue' : 'green',
    //     }
    //   },
    // },
    // itemValue: {
    //   formatter: (text, item) => {
    //     return calcAverageValue(data, item.value)
    //   },
    //   style: (item, index) => {
    //     return {
    //       fill: calcAverageValue(data, item.value) > 1000 ? 'black' : 'green',
    //     }
    //   },
    // },
    // label: {
    //   type: 'inner',
    //   offset: '-50%',

    //   style: {
    //     textAlign: 'center',
    //   },
    //   //for rotating value in the colors
    //   autoRotate: true,
    //   // content: '{value} ',
    //   // for percent
    //   // content: '{percentage}',

    //   //to fixed remove zeros
    //   formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    // },

    // on hovering styles
    // state: {
    //   active: {
    //     style: {
    //       lineWidth: 0,
    //       fillOpacity: 0.5,
    //     },
    //   },
    // },
    label: {
      type: 'inner',
      offset: '-50%',
      autoRotate: true,
      style: {
        textAlign: 'center',
        fill: '#fff',
      },
      formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.type : `${pieTitle}`
          return renderStatistic(d, text, {
            fontSize: 28,
          })
        },
      },

      content: {
        offsetY: 4,
        style: {
          fontSize: '2rem',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect()
          const text = datum
            ? `$ ${datum.value}`
            : `$ ${data.reduce((r, d) => r + d.value, 0)}`
          return renderStatistic(width, text, {
            fontSize: 32,
          })
        },
      },
    },

    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  }

  return <Pie {...config} />
}

export default Chart
