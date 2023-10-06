import styled from 'styled-components'
import BookingDataBox from '../bookings/BookingDataBox'

import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'

import { useEffect, useState } from 'react'
import { useMoveBack } from '../../hooks/useMoveBack'
import Checkbox from '../../ui/Checkbox'
import ErrorFallback from '../../ui/ErrorFallback'
import Spinner from '../../ui/Spinner'
import { formatCurrency } from '../../utils/helpers'
import { useBooking } from '../bookings/hooks/useBooking'
import { useSettings } from '../settings/hooks/useSettings'
import { useCheckin } from './hooks/useCheckin'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)

  const [addBreakfast, setAddBreakfast] = useState(false)

  const moveBack = useMoveBack()

  const { booking, isLoading, error } = useBooking()

  const { checkin, isCheckingIn } = useCheckin()

  const { settings, isSettingsLoading } = useSettings()

  useEffect(() => {
    if (booking) {
      if (booking.data) {
        setConfirmPaid(booking.data.isPaid || false)
      }
    }
  }, [booking])

  const getOptionalBreakfastPrice = (): number => {
    let price = 0
    if (booking) {
      if (booking.data) {
        if (
          booking.data.numNights &&
          booking.data.numGuests &&
          settings &&
          settings.breakfastPrice
        ) {
          price =
            settings.breakfastPrice *
            booking.data.numGuests *
            booking.data.numNights
        }
      }
    }
    return price
  }

  if (isLoading || isSettingsLoading) return <Spinner />

  if (!booking?.data) {
    return null
  }

  if (error && error instanceof Error)
    return <ErrorFallback error={error.message} />

  function handleCheckin() {
    if (!confirmPaid) return

    if (booking) {
      if (booking.data) {
        if (addBreakfast) {
          checkin({
            bookingId: booking.data.id,
            breakfast: {
              hasBreakfast: true,
              extrasPrice: getOptionalBreakfastPrice(),
              totalPrice:
                getOptionalBreakfastPrice() + booking.data.totalPrice!,
            },
          })
        } else {
          checkin({ bookingId: booking.data.id, breakfast: {} })
        }
      }
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{booking.data.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.data} />

      {!booking.data.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmPaid(false)
            }}
            id='breakfast'
          >
            Want to add breakfast for {}
            {formatCurrency(getOptionalBreakfastPrice())}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.data.guests?.fullName} has paid the total
          amount of{' '}
          {!addBreakfast
            ? formatCurrency(booking.data.totalPrice!)
            : `${formatCurrency(
                getOptionalBreakfastPrice() + booking.data.totalPrice!
              )} (${formatCurrency(
                booking.data.totalPrice!
              )} + ${formatCurrency(getOptionalBreakfastPrice())})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{booking.data.id}
        </Button>
        <Button variant='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
