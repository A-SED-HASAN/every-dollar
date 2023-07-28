import { styled } from '@mui/material/styles'
import { Tab, IconButton, CircularProgress } from '@mui/material'

export const TabBtn = styled(Tab)(() => ({
  width: '30%',
  color: 'var(--text-800)',
  fontWeight: '500',
  margin: ' 0 .15rem',
  padding: '0',
  borderBottom: '2px',

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

export const CircleLoader = styled(CircularProgress)(() => ({
  color: 'var(--bg-s-800)',
}))
