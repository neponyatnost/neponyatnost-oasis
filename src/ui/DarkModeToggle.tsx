import { FC } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext'
import ButtonIcon from './ButtonIcon'

interface DarkModeToggleProps {}

const DarkModeToggle: FC<DarkModeToggleProps> = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  )
}

export default DarkModeToggle
