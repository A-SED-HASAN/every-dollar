import React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

import { KeyboardArrowDownOutlinedIcon } from '../../assets/icons'
import { Divider } from '@mui/material'
import Inp from './Inp'
import { buck } from '../../assets/images'
import { formatMoney } from '../../functions'
const Card = ({ title, month, array }) => {
  return (
    <CardWrapper>
      <Accordion>
        <AccordionSummary>
          <div>
            {month && <img src={buck} alt='buck' />}
            <span className='title'> {title}</span>
            {month ? `for ${month}` : ''}
          </div>
          <p>planned</p>
          <p>received</p>
        </AccordionSummary>

        <AccordionDetails>
          {array.map((item, index) => {
            return (
              <span key={index}>
                <div>
                  <Inp value={item.title} />
                  <Inp seconde value={formatMoney(item.value)} />
                  333%
                </div>
                <Divider />
              </span>
            )
          })}

          <h4>add {month ? 'income ' : 'item'}</h4>
        </AccordionDetails>
      </Accordion>
    </CardWrapper>
  )
}

export default Card

const CardWrapper = styled('div')(() => {
  return {
    width: '100%',
    maxWidth: '720px',
    margin: '1.5rem auto',
  }
})

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownOutlinedIcon sx={{ color: 'var(--bg-s-400)' }} />
    }
    {...props}
  />
))(() => ({
  // background: 'lightgreen',

  padding: '.7rem 1rem',
  flexDirection: 'row-reverse',
  display: 'flex',

  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(.5turn)',
  },
  '& .MuiAccordionSummary-content': {
    // background: 'lightblue',
    display: 'grid',
    gridTemplateColumns: '1fr .4fr .15fr',
    color: 'var(--text-500)',
    fontWeight: '600',
    fontSize: '.9rem',
    div: {
      display: 'flex',
      alignItems: 'center',
      gap: '.4rem',
      '.title': {
        color: 'var(--text-600)',
        fontWeight: '700',
        fontSize: '1.1rem',
      },
    },
    p: {
      color: 'var(--text-400)',
    },
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 1rem',

  // background: 'red',
  textAlign: 'center',
  div: {
    display: 'grid',
    gridTemplateColumns: '1fr .4fr .15fr',
    gap: '2rem',
    padding: '.5rem 0',
    alignItems: 'center',
  },
  h4: {
    textAlign: 'start',
    color: 'var(--bg-s-600)',
    fontWeight: '600',
    padding: '1rem 0 ',
    // 0
  },
}))
