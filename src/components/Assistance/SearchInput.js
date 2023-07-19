import * as React from 'react'
import { InputBase, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CancelOutlinedIcon, SearchOutlinedIcon } from '../../assets/icons'
export default function SearchInput() {
  return (
    <Wrapper>
      <IconBtn className='icon'>
        <SearchOutlinedIcon />
      </IconBtn>
      <Input placeholder='search' />
      <IconBtn className='icon'>
        <CancelOutlinedIcon />
      </IconBtn>
    </Wrapper>
  )
}

const Wrapper = styled('form')(() => ({
  marginTop: '1rem',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  background: 'var(--bg-main)',
  borderRadius: 'var(--light-radius)',
  '.icon': {
    color: 'var(--text-400)',
  },
}))

const IconBtn = styled(IconButton)(() => ({
  padding: '3px',
  '*': {
    cursor: 'pointer',
  },
}))
const Input = styled(InputBase)(() => ({
  marginLeft: 1,
  flex: '1',
  color: 'var(--text-400)',
  fontWeight: '600',
  '*': {
    cursor: 'text',
  },
}))
