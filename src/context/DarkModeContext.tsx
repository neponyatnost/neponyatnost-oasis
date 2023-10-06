import { createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

interface DarkModeProviderProps {
  children: React.ReactNode
}

interface DarkModeContextProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextProps | null>(null)

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('prefers-color-scheme: dark').matches,
    'isDarkMode'
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    } else {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((dark: boolean) => !dark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)

  if (!context)
    throw new Error(
      'Dark Mode Context can not be used outside of Dark Mode Provider'
    )

  return context
}

export { DarkModeProvider, useDarkMode }
