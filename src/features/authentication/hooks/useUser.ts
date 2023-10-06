import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../../services/apiAuth'

export function useUser() {
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  return {
    userData,
    isUserDataLoading,
    isAuthenticated: userData?.role === 'authenticated',
  }
}
