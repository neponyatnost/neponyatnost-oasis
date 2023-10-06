import { FC } from 'react'
import DashboardFilter from '../features/dashboard/DashboardFilter'
import DashboardLayout from '../features/dashboard/DashboardLayout'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  )
}

export default Dashboard
