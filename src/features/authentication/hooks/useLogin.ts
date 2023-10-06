import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../../../services/apiAuth'
import { AuthProps } from '../models/auth'

export function useLogin() {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const {
    mutate: login,
    isLoading: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: ({ email, password }: AuthProps) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      toast.success('You successfully logged in :)')
      navigate('/dashboard', { replace: true })
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })

  return { login, isLoggingIn, loginError }
}
