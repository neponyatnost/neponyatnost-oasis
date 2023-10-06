import { FC } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { PAGE_SIZE } from '../utils/constants'

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const P = styled.p`
  text-align: center;
  font-size: 1.4rem;
  margin-left: 0.8rem;
  display: inline-block;

  & span {
    font-weight: 600;
  }
`

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`

const PaginationButton = styled.button<PaginationProps>`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

interface PaginationProps {
  active?: boolean
  itemsCount?: number
}

const Pagination: FC<PaginationProps> = ({ itemsCount = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const pageCount = Math.ceil(itemsCount / PAGE_SIZE)

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    searchParams.set('page', next.toString())
    setSearchParams(searchParams)
  }
  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1

    searchParams.set('page', prev.toString())
    setSearchParams(searchParams)
  }

  if (pageCount <= 1) return null

  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
      </Buttons>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? itemsCount : currentPage * PAGE_SIZE}
        </span>{' '}
        out of {itemsCount}
      </P>
      <Buttons>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
