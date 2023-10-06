import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../../services/apiBookings'
export function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  const queryDays = subDays(new Date(), numDays).toISOString()

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDays),
    queryKey: ['stays', `last-${numDays}`],
  })

  const confirmedStays = stays?.data?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )

  return { isLoading, stays, confirmedStays, numDays }
}
