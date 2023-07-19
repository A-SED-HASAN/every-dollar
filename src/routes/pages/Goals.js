import React from 'react'
import { Gauge, G2 } from '@ant-design/plots'
import { Liquid } from '@ant-design/plots'
//for goals we can both of theme

const DemoGauge = () => {
  //make pointer triangle
  //   const { registerShape, Util } = G2
  //   registerShape('point', 'triangle-gauge-indicator', {
  //     draw(cfg, container) {
  //       // 使用 customInfo 传递参数
  //       const { indicator, defaultColor } = cfg.customInfo
  //       const { pointer } = indicator
  //       const group = container.addGroup() // 获取极坐标系下画布中心点

  //       const center = this.parsePoint({
  //         x: 0,
  //         y: 0,
  //       }) // 绘制指针

  //       if (pointer) {
  //         const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate)
  //         const radius = this.coordinate.getRadius()
  //         const midAngle = (startAngle + endAngle) / 2
  //         const { x: x1, y: y1 } = Util.polarToCartesian(
  //           center.x,
  //           center.y,
  //           radius * 0.52,
  //           midAngle + Math.PI / 30
  //         )
  //         const { x: x2, y: y2 } = Util.polarToCartesian(
  //           center.x,
  //           center.y,
  //           radius * 0.52,
  //           midAngle - Math.PI / 30
  //         )
  //         const { x, y } = Util.polarToCartesian(
  //           center.x,
  //           center.y,
  //           radius * 0.6,
  //           midAngle
  //         )
  //         const path = [['M', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']] // pointer

  //         group.addShape('path', {
  //           name: 'pointer',
  //           attrs: {
  //             path,
  //             fill: defaultColor,
  //             ...pointer.style,
  //           },
  //         })
  //       }

  //       return group
  //     },
  //   })

  const config = {
    percent: 1,
    //make half circle
    // startAngle: Math.PI,
    // endAngle: 2 * Math.PI,

    //make tiny square
    type: 'meter',
    range: {
      //   color: '#30BF78',

      //divide main
      //   ticks: [0, 1 / 3, 2 / 3, 1],
      //   color: ['#F4664A', '#FAAD14', '#30BF78'],

      //multi gradient
      //   ticks: [0, 1],
      //   color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],

      //make gradients
      //   color: 'l(0) 0:#B8E1FF 1:#3D76DD ',

      //set width of main border
      width: 12,
    },

    indicator: {
      //make triangle with g2 and above func
      //   shape: 'triangle-gauge-indicator',

      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return Number(v) * 100
        },
      },

      //count of pins between numbers
      subTickLine: {
        count: 3,
      },
    },
    statistic: {
      content: {
        formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
        style: {
          color: 'rgba(0,0,0,0.65)',
          fontSize: 48,
        },
      },
    },
  }
  return <Gauge {...config} />
}
const DemoLiquid = () => {
  const config = {
    percent: 0.6,

    //default circle
    // shape: 'rect',
    // shape: 'triangle',
    shape: 'pin',
    // shape: 'diamond',

    //make star
    // shape: (x, y, width, height) => {
    //   const path = []
    //   const w = Math.min(width, height)

    //   for (let i = 0; i < 5; i++) {
    //     path.push([
    //       i === 0 ? 'M' : 'L',
    //       (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
    //       (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
    //     ])
    //     path.push([
    //       'L',
    //       (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
    //       (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
    //     ])
    //   }

    //   path.push(['Z'])
    //   return path
    // },

    //make heart
    // shape: function (x, y, width, height) {
    //   const r = width / 4
    //   const dx = x - width / 2
    //   const dy = y - height / 2
    //   return [
    //     ['M', dx, dy + r * 2],
    //     ['A', r, r, 0, 0, 1, x, dy + r],
    //     ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
    //     ['L', x, dy + height],
    //     ['L', dx, dy + r * 2],
    //     ['Z'],
    //   ]
    // },

    outline: {
      border: 4,
      distance: 5,
      style: {
        stroke: '#FFC100',
        strokeOpacity: 0.6,
      },
    },
    wave: {
      length: 128,
    },
    pattern: {
      type: 'line',
    },

    //main color
    theme: {
      styleSheet: {
        brandColor: '#FAAD14',
      },
    },
  }
  return <Liquid {...config} />
}
const Goals = () => {
  return (
    <>
      <DemoGauge />
      {/* <DemoLiquid /> */}
    </>
  )
}

export default Goals
