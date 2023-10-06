import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../features/authentication/hooks/useUser'
import Spinner from './Spinner'

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  const { isUserDataLoading, isAuthenticated } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isUserDataLoading) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, isUserDataLoading])

  if (isUserDataLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )
  }

  if (isAuthenticated) {
    return children
  }

  return null
}

export default ProtectedRoute
