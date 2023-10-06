import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting as updateSettingApi } from '../../../services/apiSettings'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdatingSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('The setting was successfully edited :)')
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
    onError: (error: Error) => toast.error(error.message),
  })

  return { isUpdatingSetting, updateSetting }
}
