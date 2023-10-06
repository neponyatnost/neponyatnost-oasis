import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteBooking as deleteBookingApi } from '../../../services/apiBookings'

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success(`The booking was successfully deleted`, {
        style: {
          backgroundColor: 'var(--color-green-100)',
        },
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
    onError: (error: Error) =>
      toast.error(error.message, {
        style: {
          backgroundColor: 'var(--color-red-100)',
        },
      }),
  })

  return { isDeleting, deleteBooking }
}
