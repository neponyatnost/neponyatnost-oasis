import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCurrentUser } from '../../../services/apiAuth'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success('User account was successfully updated :)')
      queryClient.setQueryData(['user'], user)
    },
    onError: (error: Error) => toast.error(error.message),
  })

  return { updateUser, isUpdatingUser }
}
