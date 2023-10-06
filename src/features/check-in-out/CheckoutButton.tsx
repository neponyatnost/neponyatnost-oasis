import { FC } from 'react'
import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'
import { useCheckout } from './hooks/useCheckout'

interface CheckoutButtonProps {
  bookingId: number
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckout()

  return (
    <Button variant='primary' size='small' onClick={() => checkout(bookingId)}>
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </Button>
  )
}

export default CheckoutButton
