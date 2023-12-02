import React, { useState } from 'react'
import { TextField, Autocomplete, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useDataContext } from '../../context'
import { RemoveOutlinedIcon } from '../../assets/icons'
export default function ControllableStates() {
  const { list } = useDataContext()
  const options = []
  const [render, setRender] = useState([])

  list?.map((item) => {
    item.array.map((item) => {
      options.push(item.title)
    })
  })

  const [value, setValue] = useState(options[0])

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        {render.map((item, index) => {
          return (
            <Row key={index}>
              <IconBtn>
                <RemoveOutlinedIcon color='error' />
              </IconBtn>
              <p> {item}</p>
            </Row>
          )
        })}
      </div>

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          if (newValue) {
            setRender([...render, newValue])
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="choose budget item's" />
        )}
        options={options}
      />
    </div>
  )
}

const Row = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '.3rem 0',

  p: {
    fontSize: '1.2rem',
    color: 'var(--text-600)',
  },
}))

const IconBtn = styled(IconButton)(() => ({
  padding: '.3rem ',
  '*': {
    cursor: 'pointer',
  },
}))

// const GroupHeader = styled('div')(({ theme }) => ({
//   padding: '4px 10px',
//   color: theme.palette.primary.main,
// }))

// const GroupItems = styled('ul')({
//   padding: 0,
// })
