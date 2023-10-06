import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'
import {
  DeleteBookingResponse,
  ExtractedFromIBooking,
  GetAllBookingsResponse,
  GetBookingByIdResponse,
  GetBookingsAfterDateResponse,
  GetStaysAfterDateResponse,
  GetStaysTodayActivityResponse,
  IBooking,
  UpdateBookingResponse,
} from '../features/bookings/models/booking'
import { PAGE_SIZE } from '../utils/constants'
import { getToday } from '../utils/helpers'
import supabase from './supabase'

interface BookingOperations {
  filter?: {
    field: string
    label: string
    method?: string
  } | null
  sortBy?: {
    field: string
    direction: string
  } | null
  page: number
}

// IF WE WANT TO CHANGE METHODS OF FILTERING
// function queryMethod({ filter }: Pick<BookingOperations, 'filter'>) {
//   let query = supabase
//     .from('bookings')
//     .select('*, cabins(name), guests(fullName, email)')

//   if (filter !== null && filter && filter?.method === 'eq') {
//     query = query.eq(filter.field, filter.label)
//   }
//   if (filter !== null && filter && filter?.method === 'gte') {
//     query = query.gte(filter.field, filter.label)
//   }
//   if (filter !== null && filter && filter?.method === 'lte') {
//     query = query.lte(filter.field, filter.label)
//   }
//   return query
// }

export async function getAllBookings({
  filter,
  sortBy,
  page,
}: BookingOperations): Promise<GetAllBookingsResponse> {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', {
      count: 'exact',
    })

  if (page) {
    const from = (page - 1) * PAGE_SIZE // 0 10 20
    const to = from + (PAGE_SIZE - 1) // 9 19 29

    query = query.range(from, to)
  } else {
    query = supabase
      .from('bookings')
      .select('*, cabins(name), guests(fullName, email)', {
        count: 'exact',
      })
  }

  if (filter) {
    query = query.eq(filter.field, filter.label)
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    })
  }

  const response: PostgrestResponse<IBooking> = await query

  if (response.error) {
    const error: Error = {
      name: 'SupabaseError',
      message: response.error.message || 'Supabase error occurred',
    }
    console.error(error)
    throw error
  }

  return {
    data: {
      data: response.data,
      count: response.count,
      error: null,
    },
  }
}

export async function getBookingById(
  id: number
): Promise<GetBookingByIdResponse> {
  const { data, error }: PostgrestSingleResponse<IBooking | null> =
    await supabase
      .from('bookings')
      .select('*, cabins(*), guests(*)')
      .eq('id', id)
      .single()

  if (error && error instanceof Error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: string
): Promise<GetBookingsAfterDateResponse> {
  const { data, error }: PostgrestResponse<ExtractedFromIBooking> =
    await supabase
      .from('bookings')
      .select('created_at, totalPrice, extrasPrice')
      .gte('created_at', date)
      .lte('created_at', getToday({ end: true }))

  if (error && error instanceof Error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(
  date: string
): Promise<GetStaysAfterDateResponse> {
  const { data, error }: PostgrestResponse<IBooking> = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return { data, error: null }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<GetStaysTodayActivityResponse> {
  const { data, error }: PostgrestResponse<IBooking> = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error && error instanceof Error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function updateBooking(
  id?: number,
  obj?: IBooking
): Promise<UpdateBookingResponse> {
  const { data, error }: PostgrestSingleResponse<IBooking | null> =
    await supabase.from('bookings').update(obj).eq('id', id).select().single()

  if (error && error instanceof Error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function deleteBooking(
  id: number
): Promise<DeleteBookingResponse> {
  // REMEMBER RLS POLICIES
  const { data, error }: PostgrestSingleResponse<IBooking | null> =
    await supabase.from('bookings').delete().eq('id', id)

  if (error && error instanceof Error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error: null }
}
