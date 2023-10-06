import { FC } from 'react'
import styled from 'styled-components'
import { useDarkMode } from '../context/DarkModeContext'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <StyledLogo>
      {isDarkMode ? (
        <Img src='/logo-light.png' alt='Logo' />
      ) : (
        <Img src='/logo-dark.png' alt='Logo' />
      )}
    </StyledLogo>
  )
}

export default Logo
