import React from 'react'
import { styled } from '@mui/material/styles'
import { useDataContext ,useGlobalContext} from '../context'
import { EmptyChart, LoadingCenter, Tree, Top } from '../components'
export default function TreeMap() {
  const { loading, specificList, name } = useDataContext()
  const { isIncomeInc } = useGlobalContext()
  const children = []
  // eslint-disable-next-line
  specificList?.array.map((item) => {
    const array = []
    let sum = 0
    if (isIncomeInc || item.title !== 'income') {
      // eslint-disable-next-line
      item.array.map((item) => {
        sum += +item.planned
        array.push({ name: item.title, value: item.planned })
      })
    }
    if (sum) {
      children.push({
        name: item.title,
        brand: item.title,
        value: sum,
        children: array,
      })
    }
  })

  const data = {
    name: 'root',
    children: children,
  }
  if (loading) {
    return <LoadingCenter />
  }
  return (
    <Wrapper>
      <Top treeMap />
      <ChartWrapper>
        {children.length === 0 ? (
          <EmptyChart
            errorText={`add at least one item to ¨ ${name} ¨ budget's !`}
          />
        ) : (
          <Tree data={data} />
        )}
      </ChartWrapper>
    </Wrapper>
  )
}

const Wrapper = styled('section')(() => ({
  padding: '1.5rem',
  maxHeight: '100%',
  '@media (width<= 1200px)': {
    padding: '.5rem',
  },
}))
const ChartWrapper = styled('div')(() => ({
  width: '100%',
  height: '85vh',
}))
