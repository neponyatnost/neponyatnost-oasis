import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { signup as signupApi } from '../../../services/apiAuth'

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        'Registration was successful! Please confirm your email using the link in the email.'
      )
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return { signup, isSigningUp }
}
