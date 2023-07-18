import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {
  KeyboardArrowDownOutlinedIcon,
  DeleteOutlineOutlinedIcon,
} from '../../assets/icons'
import { Divider } from '@mui/material'
import Inp from './Inp'
import { buck } from '../../assets/images'
import { formatMoney } from '../../functions'
import { useDateContext } from '../../context/DateContext'

const Card = ({ title, month, array, id }) => {
  const { addItemHandler, name, deleteSingle, makeDataForChart } =
    useDateContext()

  //make this global
  const [remaining, setRemaining] = useState(false)

  return (
    <CardWrapper>
      <Accordion>
        <AccordionSummary>
          <div>
            {month && <img src={buck} alt='buck' />}
            <span className='title'> {title}</span>
            {month ? `for ${name}` : ''}
          </div>
          <p>planned</p>
          <p className='end' onClick={() => setRemaining((prev) => !prev)}>
            {month ? 'received' : remaining ? 'remaining' : 'spent'}
          </p>
        </AccordionSummary>

        <AccordionDetails
          month={month ? 'true' : 'false'}
          remaining={remaining ? 'true' : 'false'}
          length={array.length}>
          {array.map((item, index) => {
            return (
              <span key={index}>
                <div className='single-row'>
                  <IconWrapper>
                    <DeleteOutlineOutlinedIcon
                      className='icon'
                      onClick={() => deleteSingle(title, index)}
                    />
                  </IconWrapper>
                  <Inp value={item.title} name={`${id}-${index}`} />
                  <Inp
                    seconde
                    value={item.value}
                    name={`${id}-${index}-price`}
                  />
                  <span className='remain end'>333%</span>
                </div>
                <Divider />
              </span>
            )
          })}

          <div className='grid'>
            <h4 onClick={() => addItemHandler(title, id)}>
              add {month ? 'income ' : 'item'}
            </h4>
            {month && array.length > 0 && (
              <span>{formatMoney(makeDataForChart()[0].value)}</span>
            )}
            {month && array.length > 0 && (
              <span className=' end'>{formatMoney(1500)}</span>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </CardWrapper>
  )
}

export default Card

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(() => ({}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownOutlinedIcon sx={{ color: 'var(--bg-s-400)' }} />
    }
    {...props}
  />
))(() => ({
  padding: '.7rem 1rem',
  flexDirection: 'row-reverse',
  display: 'flex',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(.5turn)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr .6fr',
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

const AccordionDetails = styled(MuiAccordionDetails)(
  ({ length, remaining, month }) => ({
    padding: '0 1rem',
    textAlign: 'center',
    '.single-row': {
      position: 'relative',
      '.remain': {
        fontSize: '1.1rem',
        fontWeight: '600',
        color:
          month === 'true'
            ? 'var(--text-600)'
            : remaining === 'true'
            ? ' var(--bg-s-600)'
            : 'var(--bg-p-500)',
      },
      ':hover': {
        '.icon': {
          visibility: 'visible',
        },
      },
    },
    div: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr .6fr',
      gap: '2rem',
      padding: '.5rem 0',
      alignItems: 'center',
      h4: {
        textAlign: 'start',
        color: 'var(--bg-s-600)',
        fontWeight: '600',
        padding: length > 0 ? '1rem 0 ' : '0.5rem 1.5rem',
        cursor: 'pointer',
        ':hover': {
          color: 'var(--bg-s-800)',
        },
      },
    },
    '.grid': {
      display: 'grid',
      gridTemplateColumns: '3fr 1.5fr .6fr',
      fontWeight: '700',
      fontSize: '1.1rem',
      color: 'var(--text-700)',
    },
  })
)

const IconWrapper = styled('span')(() => ({
  position: 'absolute',
  left: '-16px',
  display: 'grid',
  placeItems: 'center',
  '*': {
    cursor: 'pointer',
  },
  '.icon': {
    color: 'var(--text-200)',
    width: '1rem',
    visibility: 'hidden',
    ':hover': {
      color: 'red',
      visibility: 'visible',
    },
  },
}))

const CardWrapper = styled('div')(() => ({
  width: '100%',
  maxWidth: '720px',
  margin: '1.5rem auto',
  '.end': {
    justifySelf: 'end',
  },
}))
