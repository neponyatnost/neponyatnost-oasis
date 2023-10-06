import { FC } from 'react'
import toast from 'react-hot-toast'
import ErrorFallback from '../../ui/ErrorFallback'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './hooks/useSettings'
import { useUpdateSetting } from './hooks/useUpdateSetting'

interface UpdateSettingsFormProps {}

const UpdateSettingsForm: FC<UpdateSettingsFormProps> = () => {
  const { settings, isSettingsLoading, settingsError } = useSettings()

  const { isUpdatingSetting, updateSetting } = useUpdateSetting()

  const handleUpdateSetting = (
    e: React.FocusEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target

    if (parseInt(value) < 0) {
      toast.error('This value can not be less than 0.')
      return
    }

    updateSetting({
      [field]: value,
    })
  }

  if (isSettingsLoading) return <Spinner />

  if (settingsError && settingsError instanceof Error)
    return <ErrorFallback error={settingsError.message} />

  if (settings) {
    return (
      <Form>
        <FormRow label='Minimum nights/booking'>
          <Input
            defaultValue={settings.minBookingLength}
            type='number'
            id='min-nights'
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdateSetting(e, 'minBookingLength')}
          />
        </FormRow>
        <FormRow label='Maximum nights/booking'>
          <Input
            defaultValue={settings.maxBookingLength}
            type='number'
            id='max-nights'
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdateSetting(e, 'maxBookingLength')}
          />
        </FormRow>
        <FormRow label='Maximum guests/booking'>
          <Input
            defaultValue={settings.maxGuestsPerBooking}
            type='number'
            id='max-guests'
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdateSetting(e, 'maxGuestsPerBooking')}
          />
        </FormRow>
        <FormRow label='Breakfast price'>
          <Input
            defaultValue={settings.breakfastPrice}
            type='number'
            id='breakfast-price'
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdateSetting(e, 'breakfastPrice')}
          />
        </FormRow>
      </Form>
    )
  } else {
    return null
  }
}

export default UpdateSettingsForm
