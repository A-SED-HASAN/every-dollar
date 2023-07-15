import React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

import { KeyboardArrowDownOutlinedIcon } from '../../assets/icons'
import { Divider } from '@mui/material'
const Card = ({ title, month, children }) => {
  return (
    <CardWrapper>
      <Accordion>
        <AccordionSummary>
          <span>
            {title} {month ? `for ${month}` : ''}
          </span>
          <span>planned</span>
          <span>Received</span>
        </AccordionSummary>

        <AccordionDetails>
          <span>
            {children}
            <Divider />
          </span>
          <span>
            {children}
            <Divider />
          </span>
          <span>
            {children}
            <Divider />
          </span>
        </AccordionDetails>
      </Accordion>
    </CardWrapper>
  )

  // <CardWrapper>{children}</CardWrapper>
}

export default Card

const CardWrapper = styled('div')(() => ({
  background: 'var(--card-bg)',
  padding: '.5rem 1.5rem',
  borderRadius: 'var(--radius)',
  width: '100%',
  maxWidth: '720px',
  margin: '1.5rem auto',
}))

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownOutlinedIcon sx={{ color: 'var(--bg-s-400)' }} />
    }
    {...props}
  />
))(() => ({
  background: 'lightgreen',
  // width: '40%',
  padding: '0',
  flexDirection: 'row-reverse',
  display: 'flex',

  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(.5turn)',
  },
  '& .MuiAccordionSummary-content': {
    background: 'lightblue',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  background: 'red',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
}))
