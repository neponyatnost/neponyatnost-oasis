import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position && props.position.x}px;
  top: ${(props) => props.position && props.position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`

interface StyledListProps {
  position: { x: number; y: number } | null
}

interface MenusProps {
  // position: { x: number; y: number } | null
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

interface ToggleProps {
  id: string | number
}
interface ListProps {
  id: number | string
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}
interface ButtonProps {
  children?: string
  icon?: React.ReactNode
  onClick?: () => void
}

interface RectProps {
  bottom?: number
  height?: number
  left?: number
  right?: number
  top?: number
  width?: number
  x?: number
  y?: number
}

interface MenusContextProps {
  open: (opens: string | number) => void
  close: () => void
  openId: string | number
  positionOfButton: { x: number; y: number } | null // Указываем тип для positionOfButton
  setPositionOfButton: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >
}

const MenusContext = createContext<MenusContextProps | undefined>(undefined)
function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string | number>('')
  const [positionOfButton, setPositionOfButton] = useState<{
    x: number
    y: number
  } | null>(null)

  const close = () => setOpenId('')

  const open = (opens: string | number) => setOpenId(opens)

  return (
    <MenusContext.Provider
      value={{ openId, open, close, positionOfButton, setPositionOfButton }}
    >
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Something went wrong :(')
  }

  const { openId, open, close, setPositionOfButton } = context

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const target = event.target as HTMLElement

    const rect: RectProps = target.closest('button')!.getBoundingClientRect()

    setPositionOfButton({
      x: window.innerWidth - rect.width! - rect.x!,
      y: rect.y! + rect.height! + 8,
    })

    if (openId === '' || openId !== id) {
      open(id)
    } else {
      close()
    }
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Something went wrong :(')
  }

  const { openId, positionOfButton, close } = context

  const ref = useOutsideClick(close, false)

  if (openId !== id) return null

  return createPortal(
    <StyledList ref={ref} position={positionOfButton}>
      {children}
    </StyledList>,
    document.body
  )
}

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Something went wrong :(')
  }

  const { close } = context

  const handleClick = () => {
    onClick?.()
    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        {children}
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
