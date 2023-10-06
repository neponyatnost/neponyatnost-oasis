import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../../services/apiBookings'

export function useTodayActivity() {
  const { data: todayActivityStays, isLoading: isTodayActivityLoading } =
    useQuery({
      queryFn: getStaysTodayActivity,
      queryKey: ['today-activity'],
    })

  return { todayActivityStays, isTodayActivityLoading }
}
