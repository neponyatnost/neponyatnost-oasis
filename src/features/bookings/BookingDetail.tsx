import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useMoveBack } from '../../hooks/useMoveBack'
import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'
import ErrorFallback from '../../ui/ErrorFallback'
import Heading from '../../ui/Heading'
import Modal from '../../ui/Modal'
import Row from '../../ui/Row'
import Spinner from '../../ui/Spinner'
import Tag from '../../ui/Tag'
import { useCheckin } from '../check-in-out/hooks/useCheckin'
import { useCheckout } from '../check-in-out/hooks/useCheckout'
import BookingDataBox from './BookingDataBox'
import { useBooking } from './hooks/useBooking'
import { useDeleteBooking } from './hooks/useDeleteBooking'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { checkout, isCheckingOut } = useCheckout()

  const { isCheckingIn } = useCheckin()

  const { deleteBooking, isDeleting: isBookingDeleting } = useDeleteBooking()

  const moveBack = useMoveBack()

  const navigate = useNavigate()

  const { booking: data, error, isLoading } = useBooking()

  if (data) {
    const { data: booking } = data

    if (error && error instanceof Error)
      return <ErrorFallback error={error.message} />

    if (isLoading) return <Spinner />

    if (!booking) return <Empty resourceName='booking' />

    if (booking) {
      const { status, id: bookingId } = booking

      const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
      }

      return (
        <>
          <Row type='horizontal'>
            <HeadingGroup>
              <Heading as='h1'>Booking #{bookingId}</Heading>
              <Tag type={statusToTagName[status]}>
                {status.replace('-', ' ')}
              </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </Row>

          <BookingDataBox booking={booking} />

          <ButtonGroup>
            <Modal>
              <Modal.ModalOpen opens='delete-booking'>
                <Button variant='danger'>Delete</Button>
              </Modal.ModalOpen>
              <Modal.ModalWindow name='delete-booking'>
                <ConfirmDelete
                  resourceName='booking'
                  disabled={isBookingDeleting}
                  onConfirm={() =>
                    deleteBooking(bookingId || 0, {
                      onSettled: () => navigate(-1),
                    })
                  }
                />
              </Modal.ModalWindow>
            </Modal>
            {status === 'unconfirmed' && (
              <Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                disabled={isCheckingIn}
              >
                Check in
              </Button>
            )}
            {status === 'checked-in' && (
              <Button
                onClick={() => checkout(bookingId || 0)}
                disabled={isCheckingOut}
              >
                Check out
              </Button>
            )}
            <Button variant='secondary' onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}

export default BookingDetail
