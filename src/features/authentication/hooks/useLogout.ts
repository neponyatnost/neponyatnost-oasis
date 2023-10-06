import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../../services/apiAuth'

export function useLogout() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    mutate: logout,
    isLoading: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login', { replace: true })
      toast.success('You successfully logged out :)')
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })

  return { logout, isLoggingOut, error }
}
