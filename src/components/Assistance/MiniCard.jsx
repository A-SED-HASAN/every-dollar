import React from 'react'
import { styled } from '@mui/material/styles'
import { CheckCircleOutlineOutlinedIcon } from '../../assets/icons'

export default function MiniCard({ children, selected, onClick }) {
  return (
    <Wrapper selected={selected} onClick={onClick}>
      <span>
        <CheckCircleOutlineOutlinedIcon
          sx={{
            color: 'var(--bg-s-800)',
            visibility: selected ? 'visible' : 'hidden',
          }}
        />
      </span>
      <div>{children}</div>
    </Wrapper>
  )
}

const Wrapper = styled('div')(({ selected }) => ({
  borderRadius: 'var(--radius)',
  border: `1px solid ${selected ? 'var(--bg-s-800)' : 'var(--text-900)'}`,
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  cursor: 'pointer',
  span: {
    display: 'grid',
    placeItems: 'center',
  },
  div: {},
  '*': {
    cursor: 'pointer',
  },
}))
