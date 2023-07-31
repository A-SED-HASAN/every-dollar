import React from 'react'
import { DecompositionTreeGraph } from '@ant-design/graphs'
export const RoTree = ({ data }) => {
  const config = {
    data,
    layout: {
      type: 'indented',
      direction: 'LR',
      dropCap: false,
      indent: 500,
      getHeight: () => {
        return 50
      },
      getWidth: () => {
        return 100
      },
    },
    markerCfg: (cfg) => {
      const { children } = cfg
      return {
        show: children?.length,
      }
    },
    behaviors: [ 'drag-node'],
  }

  return <DecompositionTreeGraph {...config} />
}
