import { useState } from 'react'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './hooks/useUpdateUser'
import { useUser } from './hooks/useUser'

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  const { userData } = useUser()

  const currentFullName = userData?.user_metadata?.fullName
  const currentEmail = userData?.email

  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState<string | File | null>(null)
  const { updateUser, isUpdatingUser } = useUpdateUser()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (avatar) {
      setAvatar(avatar)
    }

    if (!fullName) return

    updateUser({ fullName, avatar })
  }

  function handleCancel() {
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input defaultValue={currentEmail} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setAvatar(e.target.files[0])
            } else {
              setAvatar(null)
            }
          }}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          variant='secondary'
          disabled={isUpdatingUser}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
