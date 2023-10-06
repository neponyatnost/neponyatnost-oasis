import { FC } from 'react'

interface EmptyProps {
  resourceName: string
}

const Empty: FC<EmptyProps> = ({ resourceName }) => {
  return <p>No {resourceName} could be found.</p>
}

export default Empty
