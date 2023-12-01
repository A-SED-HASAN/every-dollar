import React from 'react'
import { styled } from '@mui/material/styles'
import { useDataContext } from '../context/DataContext.js'
import { LoadingCenter } from '../components/index.js'
import { RoTree, Top } from '../components/index.js'
import { formatMoney } from '../functions/index.js'
export default function RoadMap() {
  const { loading, specificList } = useDataContext()

  if (loading) {
    return <LoadingCenter />
  }
  const mainTitles = specificList.array.map((item) => {
    return item.title
  })
  console.log(mainTitles)
  const data = {
    id: 'A0',
    value: {
      title: mainTitles[0],
      items: [
        {
          text: `pcheck 1`,
          value: formatMoney(111),
        },
        {
          text: formatMoney(111),
        },
        {
          text: formatMoney(444),
        },
      ],
    },
    children: [
      {
        id: 'A1',
        value: {
          title: mainTitles[1],
          items: [
            {
              text: '1152万',
            },
            {
              text: '占比',
              value: '30%',
            },
          ],
        },
        children: [
          {
            id: 'A11',
            value: {
              title: '广东',
              items: [
                {
                  text: '1152万',
                },
                {
                  text: '占比',
                  value: '30%',
                },
              ],
            },
          },
          {
            id: 'A12',
            value: {
              title: '广西',
              items: [
                {
                  text: '1152万',
                },
                {
                  text: '占比',
                  value: '30%',
                },
              ],
            },
          },
          {
            id: 'A13',
            value: {
              title: '海南',
              items: [
                {
                  text: '1152万',
                },
                {
                  text: '占比',
                  value: '30%',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'A2',
        value: {
          title: mainTitles[2],
          items: [
            {
              text: '595万',
            },
            {
              text: '占比',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
      {
        id: 'A3',
        value: {
          title: mainTitles[3],
          items: [
            {
              text: '595万',
            },
            {
              text: '占比',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
      {
        id: 'A4',
        value: {
          title: mainTitles[4],
          items: [
            {
              text: '595万',
            },
            {
              text: '占比',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
      {
        id: 'A5',
        value: {
          title: mainTitles[5],
          items: [
            {
              text: '595万',
            },
            {
              text: '占比',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
    ],
  }
  return (
    <Wrapper>
      <Top />
      <ChartWrapper>
        <RoTree data={data} />
      </ChartWrapper>
    </Wrapper>
  )
}

const Wrapper = styled('section')(() => ({
  padding: '1.5rem',
  background: 'red',
  maxHeight: '100vh',
  '@media (width<= 1200px)': {
    padding: '.5rem',
  },
}))

const ChartWrapper = styled('div')(() => ({
  background: 'red',
  width: '100%',
  height: 'calc(100vh - 110px)',
}))
