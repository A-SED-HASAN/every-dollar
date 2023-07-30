import React from 'react'
import { Radar } from '@ant-design/plots'

export const BuRadar = ({ data }) => {
  //   const data = [
  //     {
  //       name: 'G2',
  //       star: 10371,
  //     },
  //     {
  //       name: 'G6',
  //       star: 7380,
  //     },
  //     {
  //       name: 'F2',
  //       star: 7414,
  //     },
  //     {
  //       name: 'L7',
  //       star: 2140,
  //     },
  //     {
  //       name: 'X6',
  //       star: 660,
  //     },
  //     {
  //       name: 'AVA',
  //       star: 885,
  //     },
  //     {
  //       name: 'G2Plot',
  //       star: 1626,
  //     },
  //   ]
  const config = {
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: 'type',
    yField: 'value',
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: 'star ',
        min: 0,
        nice: true,
        formatter: (v) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  }
  return <Radar {...config} />
}
