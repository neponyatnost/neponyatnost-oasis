import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin as deleteCabinApi } from '../../../services/apiCabins'

export function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('The cabin was successfully deleted', {
        style: {
          backgroundColor: 'var(--color-green-100)',
        },
      })
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (error: Error) =>
      toast.error(error.message, {
        style: {
          backgroundColor: 'var(--color-red-100)',
        },
      }),
  })

  return { isDeleting, deleteCabin }
}
