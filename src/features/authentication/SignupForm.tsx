import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignup } from './hooks/useSignup'
import { SignUpProps } from './models/auth'

// Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignUpProps>()

  const { signup, isSigningUp } = useSignup()

  const { errors } = formState

  if (!errors) {
    return null
  }

  const onSubmit = ({ fullName, email, password }: SignUpProps) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message?.toString()}>
        <Input
          {...register('fullName', { required: 'This field is required!' })}
          type='text'
          id='fullName'
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message?.toString()}>
        <Input
          {...register('email', {
            required: 'This field is required!',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email.',
            },
          })}
          type='email'
          id='email'
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message?.toString()}
      >
        <Input
          {...register('password', {
            required: 'This field is required!',
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 characters.',
            },
          })}
          type='password'
          id='password'
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors.passwordConfirm?.message?.toString()}
      >
        <Input
          {...register('passwordConfirm', {
            required: 'This field is required!',
            validate: (value) =>
              value === getValues().password || 'Passwords must match',
          })}
          type='password'
          id='passwordConfirm'
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant='secondary' type='reset'>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
