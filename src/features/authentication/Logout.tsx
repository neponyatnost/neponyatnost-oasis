import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './hooks/useLogout'

const Logout = () => {
  const { logout, isLoggingOut } = useLogout()

  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoggingOut}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout
