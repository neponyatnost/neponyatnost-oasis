import { format, isToday } from 'date-fns'
import { FC } from 'react'
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2'
import styled from 'styled-components'

import DataItem from '../../ui/DataItem'

import { Flag } from '../../ui/Flag'
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers'
import { IBooking } from './models/booking'

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`

const Price = styled.div<BookingDataBoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`

interface BookingDataBoxProps {
  isPaid?: boolean
  booking?: IBooking
}

// A purely presentational component
const BookingDataBox: FC<BookingDataBoxProps> = ({ booking, isPaid }) => {
  if (booking) {
    const { cabins, guests } = booking

    if (!cabins || !guests) return null

    return (
      <StyledBookingDataBox>
        <Header>
          <div>
            <HiOutlineHomeModern />
            <p>
              {booking.numNights} nights in Cabin <span>{cabins.name}</span>
            </p>
          </div>

          <p>
            {format(new Date(booking.startDate || ''), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(booking.startDate || ''))
              ? 'Today'
              : formatDistanceFromNow(booking.startDate || '')}
            ) &mdash;{' '}
            {format(new Date(booking.endDate || ''), 'EEE, MMM dd yyyy')}
          </p>
        </Header>

        <Section>
          <Guest>
            {guests.countryFlag && (
              <Flag
                src={guests.countryFlag}
                alt={`Flag of ${guests.nationality}`}
              />
            )}
            <p>
              {guests.fullName}{' '}
              {booking.numGuests! > 1
                ? `+ ${booking.numGuests! - 1} guests`
                : ''}
            </p>
            <span>&bull;</span>
            <p>{guests.email}</p>
            <span>&bull;</span>
            <p>National ID {guests.nationalID}</p>
          </Guest>

          {booking.observations && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label='Observations'
            >
              {booking.observations}
            </DataItem>
          )}

          <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
            {booking.hasBreakfast ? 'Yes' : 'No'}
          </DataItem>

          <Price isPaid={booking.isPaid}>
            <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
              {formatCurrency(booking.totalPrice || 0)}

              {booking.hasBreakfast &&
                ` (${formatCurrency(
                  booking.cabinPrice || 0
                )} cabin + ${formatCurrency(
                  booking.extrasPrice || 0
                )} breakfast)`}
            </DataItem>

            <p>{booking.isPaid ? 'Paid' : 'Will pay at property'}</p>
          </Price>
        </Section>

        <Footer>
          <p>
            Booked{' '}
            {format(new Date(booking.created_at || ''), 'EEE, MMM dd yyyy, p')}
          </p>
        </Footer>
      </StyledBookingDataBox>
    )
  } else {
    return null
  }
}

export default BookingDataBox
