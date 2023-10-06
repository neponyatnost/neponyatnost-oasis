import { FC } from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select<SelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`

interface SelectProps {
  type?: string
  options?: { value: string; label: string }[]
  currentValue?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({
  options,
  type,
  currentValue,
  onChange,
  ...restProps
}) => {
  return (
    <StyledSelect
      value={currentValue}
      {...restProps}
      type={type}
      onChange={onChange}
    >
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </StyledSelect>
  )
}

export default Select
