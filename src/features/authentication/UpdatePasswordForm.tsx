import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './hooks/useUpdateUser'
import { UpdateUserProps } from './models/auth'

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState

  const { updateUser, isUpdatingUser } = useUpdateUser()

  function onSubmit({ password }: UpdateUserProps) {
    updateUser({ password }, { onSuccess: () => reset() })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='New password (min 8 chars)'
        error={errors?.password?.message?.toString()}
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdatingUser}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Confirm new password'
        error={errors?.passwordConfirm?.message?.toString()}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdatingUser}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' variant='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update password</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
