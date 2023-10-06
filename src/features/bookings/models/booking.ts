import { ICabin } from '../../cabins/models/cabin'
import { IGuest } from '../../guests/models/guest'

export interface IBooking {
  id?: number
  created_at?: string
  startDate?: string
  endDate?: string
  numNights?: number
  numGuests?: number
  cabinPrice?: number
  extrasPrice?: number
  totalPrice?: number
  status: 'checked-in' | 'checked-out' | 'unconfirmed'
  hasBreakfast?: boolean
  isPaid?: boolean
  observations?: string
  cabinId?: number
  guestId?: number
  guests?: IGuest
  cabins?: ICabin
  breakfast?: {
    hasBreakfast?: boolean
    extrasPrice?: number
    totalPrice?: number
  }
}

export interface GetBookingsAfterDateResponse {
  data: ExtractedFromIBooking[] | null
  error: Error | null
}

export interface GetStaysAfterDateResponse {
  data: IBooking[] | null
  error: Error | null
}

export interface GetStaysTodayActivityResponse {
  data: IBooking[] | null
  error: Error | null
}

export interface UpdateBookingResponse {
  data: IBooking | null
  error: Error | null
}

export interface DeleteBookingResponse {
  data: IBooking | null
  error: Error | null
}

export interface DataResponse<T> {
  data: T[] | null
  count: number | null
  error: Error | null
}

export interface GetAllBookingsResponse {
  data: DataResponse<IBooking>
}

export interface GetBookingByIdResponse {
  data: IBooking | null
  error: Error | null
}

export type ExtractedFromIBooking = Pick<
  IBooking,
  'created_at' | 'totalPrice' | 'extrasPrice' | 'numNights'
>
