import { FC } from 'react'
import BookingTable from '../features/bookings/BookingTable'
import BookingTableOperations from '../features/bookings/BookingTableOperations'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

interface BookingsProps {}

const Bookings: FC<BookingsProps> = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  )
}

export default Bookings
