import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from './Select'

interface SortByProps {
  options: { value: string; label: string }[]
}

const SortBy: FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentSortByValue = searchParams.get('sortBy') || ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
      options={options}
      type='white'
      onChange={handleChange}
      currentValue={currentSortByValue}
    />
  )
}

export default SortBy
