import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'
import { FC } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import { useDarkMode } from '../../context/DarkModeContext'
import Heading from '../../ui/Heading'
import { ExtractedFromIBooking } from '../bookings/models/booking'
import DashboardBox from './DashboardBox'

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

interface SalesChartProps {
  bookings: ExtractedFromIBooking[] | null
  numDays: number
}

interface SalesChartData {
  label?: string
  totalSales?: number
  extrasSales?: number
}

const SalesChart: FC<SalesChartProps> = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode()

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })

  const data: SalesChartData[] = allDays.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        ?.filter((b) => isSameDay(date, new Date(b.created_at || '')))
        .reduce(
          (acc, curr) => acc + (curr.totalPrice ? curr.totalPrice : 0),
          0
        ),
      extrasSales: bookings
        ?.filter((b) => isSameDay(date, new Date(b.created_at || '')))
        .reduce(
          (acc, curr) => acc + (curr.extrasPrice ? curr.extrasPrice : 0),
          0
        ),
    }
  })

  const colors = !isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      }

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDays.at(0) || 0, 'MMM dd yyyy')} &mdash;{' '}
        {format(allDays.at(-1) || 0, 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis unit='$' />
          <CartesianGrid strokeDasharray='5' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            type='monotone'
            strokeWidth={2}
            name='Total sales'
            unit='$'
          />
          <Area
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            type='monotone'
            strokeWidth={2}
            name='Extras sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
