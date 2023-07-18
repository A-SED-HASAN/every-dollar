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
    appendPadding: 15,
    data,
    angleField: 'value',
    colorField: 'type',
    color: [
      '#00b2f6',
      '#e64b40',
      '#faab19',
      '#48ce65',
      '#b34fa0',
      '#16a597',
      '#f26552',
      '#e3b409',
      '#35bd59',
      '#634fb3',
    ],
    radius: 1,
    innerRadius: 0.77,
    meta: {
      value: {
        formatter: (v) => `${v} $`,
      },
    },

    legend: {
      position: 'bottom',
      flipPage: false,
      maxRow: 3,
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
    //       fill: calcAverageValue(data, item.value) > 10 ? 'black' : 'green',
    //     }
    //   },
    // },

    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.7,
        },
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      autoRotate: true,
      style: {
        textAlign: 'center',
        fill: '#fff',
      },

      // content: '{percentage}',
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
    pieStyle: {
      lineWidth: 0,
      cursor: 'pointer',
    },
    // pattern: {
    //   type: 'square',
    // },
    //disable animation
    // animation: false,

    animation: {
      appear: {
        animation: 'grow-in-xy', // Effects of the first animation
        duration: 500, // Duration of the first animation
      },
    },

    //     'fade-in'
    // 'fade-out'
    // 'grow-in-x'
    // 'grow-in-y'
    // 'grow-in-xy'
    // 'scale-in-x'
    // 'scale-in-y'
    // 'wave-in'
    // 'zoom-in'
    // 'zoom-out'
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

      {
        type: 'legend-highlight',
      },
    ],
  }

  return <Pie {...config} />
}

export default Chart
