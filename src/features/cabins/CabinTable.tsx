import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import { useCabins } from './hooks/useCabins'
import { ICabin } from './models/cabin'

interface CabinTableProps {}

const CabinTable: FC<CabinTableProps> = () => {
  const [searchParams] = useSearchParams()

  const { cabins, isLoading } = useCabins()

  if (isLoading) return <Spinner />

  if (!cabins?.length) return <Empty resourceName='cabins' />

  // FILTER CABINS
  const searchQuery = searchParams.get('discount') || 'all'

  let filteredCabins: ICabin[] | undefined

  if (searchQuery === 'all') filteredCabins = cabins

  if (searchQuery === 'with-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0)

  if (searchQuery === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0)

  // SORT CABINS
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'

  const [field, direction] = sortBy.split('-')

  const modifier = direction === 'asc' ? 1 : -1

  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (field === 'name') {
      return a[field].localeCompare(b[field]) * modifier
    } else {
      return (a[field] - b[field]) * modifier
    }
  })

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <>
          <Table.Header>
            <>
              <div></div>
              <div>Cabin</div>
              <div>Capacity</div>
              <div>Price</div>
              <div>Discount</div>
              <div></div>
            </>
          </Table.Header>
          <Table.Body
            data={sortedCabins}
            render={(c: ICabin) => <CabinRow cabin={c} key={c.id} />}
          />
        </>
      </Table>
    </Menus>
  )
}

export default CabinTable
