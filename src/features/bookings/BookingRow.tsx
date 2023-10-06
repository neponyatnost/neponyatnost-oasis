import { format, isToday } from 'date-fns'
import styled from 'styled-components'

import Table from '../../ui/Table'
import Tag from '../../ui/Tag'

import { FC } from 'react'
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers'
import { useCheckout } from '../check-in-out/hooks/useCheckout'
import { useDeleteBooking } from './hooks/useDeleteBooking'
import { IBooking } from './models/booking.js'

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`

interface BookingRowProps {
  booking: IBooking
}

const BookingRow: FC<BookingRowProps> = ({ booking }) => {
  const { checkout } = useCheckout()

  const { deleteBooking, isDeleting: isBookingDeleting } = useDeleteBooking()

  const navigate = useNavigate()

  const {
    id: bookingId,
    endDate,
    numNights,
    startDate,
    status,
    totalPrice,
  } = booking

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <Table.Row>
      <>
        <Cabin>{booking.cabins?.name}</Cabin>

        <Stacked>
          <span>{booking.guests?.fullName}</span>
          <span>{booking.guests?.email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate || ''))
              ? 'Today'
              : formatDistanceFromNow(startDate || '')}{' '}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate || ''), 'MMM dd yyyy')} &mdash;{' '}
            {format(new Date(endDate || ''), 'MMM dd yyyy')}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

        <Amount>{formatCurrency(totalPrice || 0)}</Amount>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId || 0} />
            <Menus.List id={bookingId || 0}>
              <>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                >
                  Details
                </Menus.Button>
                {status === 'unconfirmed' && (
                  <Menus.Button
                    icon={<HiArrowDownOnSquare />}
                    onClick={() => navigate(`/checkin/${bookingId}`)}
                  >
                    Check in
                  </Menus.Button>
                )}
                {status === 'checked-in' && (
                  <Menus.Button
                    icon={<HiArrowUpOnSquare />}
                    onClick={() => checkout(bookingId || 0)}
                  >
                    Check out
                  </Menus.Button>
                )}
                <Modal.ModalOpen opens='delete-booking'>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.ModalOpen>
              </>
            </Menus.List>
          </Menus.Menu>
          <Modal.ModalWindow name='delete-booking'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isBookingDeleting}
              onConfirm={() => deleteBooking(bookingId || 0)}
            />
          </Modal.ModalWindow>
        </Modal>
      </>
    </Table.Row>
  )
}

export default BookingRow
