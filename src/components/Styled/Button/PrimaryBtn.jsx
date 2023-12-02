import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
export const PrimaryBtn = styled(Button)(({ variant }) => ({
  background: variant === 'contained' ? 'var(--bg-s-800)' : 'transparent',
  margin: variant === 'outlined' ? '2rem 0' : '1rem 0',
  padding: '.6rem 0',
  fontWeight: '700',
  textTransform: 'capitalize',
  fontSize: '1rem',
  ':hover': {
    background: variant === 'outlined' ? 'var(--bg-s-50)' : 'var(--bg-s-700)',
  },
  '*': {
    cursor: 'pointer',
  },
}))
