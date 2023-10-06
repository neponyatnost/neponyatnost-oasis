import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createEditCabin } from '../../../services/apiCabins'
import { ICabin } from '../models/cabin'

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: ICabin; id?: number }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('The cabin was successfully edited :)')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  return { isEditing, editCabin }
}
