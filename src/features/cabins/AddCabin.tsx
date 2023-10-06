import { FC } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinFormV2 from './CreateCabinForm'

interface AddCabinProps {}

const AddCabin: FC<AddCabinProps> = () => {
  return (
    <Modal>
      <Modal.ModalOpen opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.ModalOpen>
      <Modal.ModalWindow name='cabin-form'>
        <CreateCabinFormV2 />
      </Modal.ModalWindow>
    </Modal>
  )
}

export default AddCabin
