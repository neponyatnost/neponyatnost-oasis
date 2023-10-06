import { FC } from 'react'
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
import { ExtractedFromIBooking, IBooking } from '../bookings/models/booking'
import Stat from './Stat'

interface StatisticsProps {
  bookings: ExtractedFromIBooking[] | null
  confirmedStays?: IBooking[]
  numDays?: number
  cabinCount?: number
}

const Statistics: FC<StatisticsProps> = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) => {
  const numBookings = bookings?.length

  const totalSales = bookings?.reduce((acc, curr) => acc + curr.totalPrice!, 0)

  const checkins = confirmedStays?.length

  let occupation: number

  if (confirmedStays && numDays && cabinCount) {
    occupation =
      confirmedStays?.reduce((acc, curr) => acc + curr.numNights!, 0) /
      (numDays * cabinCount)
  } else {
    occupation = 0
  }

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales || 0)}
      />
      <Stat
        title='Checked in'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={(occupation * 100).toFixed(2) + '%'}
      />
    </>
  )
}

export default Statistics
