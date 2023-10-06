import { FC } from 'react'
import SignupForm from '../features/authentication/SignupForm'
import Heading from '../ui/Heading'

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  return (
    <>
      <Heading as='h1'>Create a new user</Heading>
      <SignupForm />
    </>
  )
}

export default Users
