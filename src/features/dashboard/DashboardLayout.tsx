import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import { useCabins } from '../cabins/hooks/useCabins'
import TodayActivity from '../check-in-out/TodayActivity'
import DurationChart from './DurationChart'
import SalesChart from './SalesChart'
import Statistics from './Statistics'
import { useRecentBookings } from './hooks/useRecentBookings'
import { useRecentStays } from './hooks/useRecentStays'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

const DashboardLayout = () => {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings()

  const { cabinsCount, isLoading: isCabinsLoading } = useCabins()

  const {
    stays,
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays()

  if (isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />

  if (bookings && stays && confirmedStays) {
    return (
      <StyledDashboardLayout>
        <Statistics
          bookings={bookings.data}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabinsCount}
        />
        <SalesChart bookings={bookings.data} numDays={numDays} />
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </StyledDashboardLayout>
    )
  } else {
    return null
  }
}

export default DashboardLayout
