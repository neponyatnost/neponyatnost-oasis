import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { updateBooking } from '../../../services/apiBookings'

export function useCheckout() {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.data?.id} successfully checked out :)`)
      queryClient.invalidateQueries(['booking'])
      navigate('/')
    },
    onError: () => {
      toast.error('There was an error while checking out :(')
    },
  })

  return { checkout, isCheckingOut, error }
}
