import { FC } from 'react'
import styled from 'styled-components'

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

interface ChildProps {
  id?: string
}

interface FormRowVerticalProps {
  label?: string
  error?: string
  children?:
    | React.ReactNode
    | React.ReactElement<ChildProps>
    | React.ReactElement<ChildProps>[]
}

const FormRowVertical: FC<FormRowVerticalProps> = ({
  label,
  error,
  children,
}) => {
  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={(children as React.ReactElement<ChildProps>).props.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRowVertical
