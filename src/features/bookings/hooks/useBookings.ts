import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getAllBookings } from '../../../services/apiBookings'
import { PAGE_SIZE } from '../../../utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // FILTER BOOKINGS
  const filterValue = searchParams.get('status')

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', label: filterValue, method: 'eq' } || undefined

  // SORT BOOKINGS
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc'

  const [field, direction] = sortByRow.split('-')

  const sortBy = { field, direction } || undefined

  // PAGINATION BOOKINGS
  let page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const {
    data: bookings,
    isLoading: isBookingsLoading,
    error: bookingsError,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  })

  // PREFETCHING DATA
  if (bookings?.data.count) {
    const pageCount = Math.ceil(bookings.data.count / PAGE_SIZE)

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page + 1],
        queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
      })
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page - 1],
        queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
      })
    }
  }

  return { bookings, isBookingsLoading, bookingsError }
}
