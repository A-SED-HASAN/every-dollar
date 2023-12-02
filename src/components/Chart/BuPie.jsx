import React from 'react'
import { Pie, measureTextWidth } from '@ant-design/plots'
import { colors } from '../../assets/constants'
import { formatMoney, calcPercentValue } from '../../functions'

export const BuPie = ({ pieTitle, pieValue, data }) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    )
    const R = containerWidth / 2

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

  const config = {
    appendPadding: 10,
    data,
    angleField: 'planned',
    colorField: 'type',
    color: colors,
    radius: 1,
    innerRadius: 0.77,
    meta: {
      planned: {
        formatter: (v) => `${v} $`,
      },
    },
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
      position: 'bottom',
      flipPage: false,
      maxRow: 4,

      itemValue: {
        formatter: (_, item) => {
          return calcPercentValue(data, item.name)
        },
        style: (_, index) => {
          return {
            fill: _.unchecked ? '#ddd' : colors[index],
          }
        },
      },
    },

    active: {
      style: {
        lineWidth: 0,
        fillOpacity: 0.7,
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
            ? `${formatMoney(datum.planned)}`
            : `${formatMoney(pieValue)}`
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
    // animation: false,

    animation: false,
    // {
    //   appear: {
    //     animation: 'grow-in-xy', // Effects of the first animation
    //     duration: 500, // Duration of the first animation
    //   },
    // },

    // 'fade-in'
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
