import { FC } from 'react'
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  return (
    <Row>
      <Heading as='h1'>Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  )
}

export default Settings
