import { FC } from 'react'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logout from '../features/authentication/Logout'
import ButtonIcon from './ButtonIcon'
import DarkModeToggle from './DarkModeToggle'

interface HeaderMenuProps {}

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

const HeaderMenu: FC<HeaderMenuProps> = () => {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
