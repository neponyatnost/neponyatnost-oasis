import { FC } from 'react'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import Table from '../../ui/Table'
import { formatCurrency } from '../../utils/helpers'
import CreateCabinFormV1 from './CreateCabinForm'
import { useCreateCabin } from './hooks/useCreateCabin'
import { useDeleteCabin } from './hooks/useDeleteCabin'
import { ICabin } from './models/cabin'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

interface CabinRowProps {
  cabin?: ICabin
}

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    description,
    discount,
    image,
    maxCapacity,
    regularPrice,
  } = cabin!

  const { isDeleting, deleteCabin } = useDeleteCabin()

  const { isCreating, createCabin } = useCreateCabin()

  const handleDuplicateCabin = () => {
    if (cabin)
      createCabin({
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
      })
  }

  if (cabin && cabinId) {
    return (
      <Table.Row>
        <>
          <Img src={cabin.image} alt={cabin.name} />
          <Cabin>{cabin.name}</Cabin>
          <div>Fits up to {cabin.maxCapacity} guests</div>
          <Price>{formatCurrency(cabin.regularPrice)}</Price>
          {cabin.discount ? (
            <Discount>{formatCurrency(cabin.discount)}</Discount>
          ) : (
            <span>&mdash;</span>
          )}
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />
                <Menus.List id={cabinId}>
                  <>
                    <Menus.Button
                      icon={<HiSquare2Stack />}
                      onClick={handleDuplicateCabin}
                    >
                      Duplicate
                    </Menus.Button>
                    <Modal.ModalOpen opens='edit-cabin'>
                      <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                    </Modal.ModalOpen>
                    <Modal.ModalOpen opens='delete-cabin'>
                      <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                    </Modal.ModalOpen>
                  </>
                </Menus.List>

                <Modal.ModalWindow name='edit-cabin'>
                  <CreateCabinFormV1 cabinToEdit={cabin} />
                </Modal.ModalWindow>

                <Modal.ModalWindow name='delete-cabin'>
                  <ConfirmDelete
                    disabled={isDeleting}
                    onConfirm={() => deleteCabin(cabin.id!)}
                    resourceName='cabin'
                  />
                </Modal.ModalWindow>
              </Menus.Menu>
            </Modal>
          </div>
        </>
      </Table.Row>
    )
  } else {
    return null
  }
}

export default CabinRow
