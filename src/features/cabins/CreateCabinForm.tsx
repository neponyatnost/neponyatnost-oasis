import { FC } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import { useCreateCabin } from './hooks/useCreateCabin'
import { useEditCabin } from './hooks/useEditCabin'
import { ICabin } from './models/cabin'

interface CreateCabinFormProps {
  cabinToEdit?: ICabin
  onCloseModal?: () => void
}

const CreateCabinForm: FC<CreateCabinFormProps> = ({
  cabinToEdit,
  onCloseModal,
}) => {
  const { id: editId, ...editValues } = cabinToEdit ? cabinToEdit : { id: 0 }

  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICabin>({
      defaultValues: isEditSession ? editValues : {},
    })

  const { errors } = formState

  const { isCreating, createCabin } = useCreateCabin()

  const { isEditing, editCabin } = useEditCabin()

  const handleCreateCabin = (data: ICabin) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
    }
  }

  const handleErrors = (errors: FieldErrors<ICabin>) => {
    console.log(errors)
  }

  const validateDiscount = (value: number) => {
    const discountValue = parseFloat(value.toString()) // Преобразование в число
    const regularPrice = parseFloat(getValues().regularPrice.toString()) // Преобразование в число
    if (isNaN(discountValue) || isNaN(regularPrice)) {
      return 'Invalid values for discount or regular price'
    }
    return (
      discountValue <= regularPrice ||
      'Discount should be less than or equal to the regular price.'
    )
  }

  return (
    <Form onSubmit={handleSubmit(handleCreateCabin, handleErrors)} type='modal'>
      <FormRow
        error={errors.name?.message}
        inputIdAndLabel='name'
        label='Cabin name'
      >
        <Input
          type='text'
          id='name'
          disabled={isCreating || isEditing}
          {...register('name', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={errors.maxCapacity?.message}
        inputIdAndLabel='maxCapacity'
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating || isEditing}
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'Capacity should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        error={errors.regularPrice?.message}
        inputIdAndLabel='regularPrice'
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating || isEditing}
          {...register('regularPrice', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'Regular price should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error={errors.discount?.message}
        inputIdAndLabel='discount'
      >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating || isEditing}
          {...register('discount', {
            required: 'This field is required!',
            validate: (value) => validateDiscount(value),
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors.description?.message}
        inputIdAndLabel='description'
      >
        <Textarea
          id='description'
          defaultValue=''
          disabled={isCreating || isEditing}
          {...register('description', {
            required: 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        error={errors.image?.message}
        inputIdAndLabel='image'
      >
        <FileInput
          id='image'
          accept='image/*'
          disabled={isCreating || isEditing}
          type='file'
          {...register('image', {
            required: isEditSession ? false : 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variant='secondary'
          type='reset'
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
