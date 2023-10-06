import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../../services/apiSettings'

export function useSettings() {
  const {
    data: settings,
    error: settingsError,
    isLoading: isSettingsLoading,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  return { settings, settingsError, isSettingsLoading }
}
