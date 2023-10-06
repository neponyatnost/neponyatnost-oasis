import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../../../services/apiBookings'

export function useBooking() {
  const { bookingId } = useParams()

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingById(Number(bookingId)),
    retry: false,
  })

  return { isLoading, booking, error }
}
