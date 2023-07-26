import { styled } from '@mui/material/styles'
import { Tab, IconButton } from '@mui/material'

export const TabBtn = styled(Tab)(() => ({
  color: 'var(--text-800)',
  fontWeight: '500',
  margin: ' 0 .15rem',
  padding: '0',
  borderBottom: '2px',
  width: '30%',
  '&.Mui-selected': {
    fontWeight: '700',
    color: 'var(--text-800)',
  },
}))

export const IconBtn = styled(IconButton)(() => ({
  ':hover': {
    color: 'var(--error)',
  },
  '*': {
    cursor: 'pointer',
  },
}))
