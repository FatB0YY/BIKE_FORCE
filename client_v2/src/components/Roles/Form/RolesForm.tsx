import React from 'react'
import { useCreateRoleMutation } from '../../../service/RolesAPI'
import { SubmitHandler, useForm } from 'react-hook-form'
import SpinnerButton from '../../SpinnerButton'

interface MyForm {
  value: string
  description: string
}

const RolesForm = () => {
  // rtk query
  const [createRole, { isLoading: isLoadingCreateRole }] = useCreateRoleMutation()
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingForm },
    clearErrors,
    reset,
  } = useForm<MyForm>()

  const onValidSubmit: SubmitHandler<MyForm> = async ({ value, description }) => {
    await createRole({ value: value.toLocaleUpperCase(), description })
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })

    clearErrors()
    reset()
  }

  const isValidValue = (value: string) => {
    const valueRegex = /^(?=.{1,200}$).+$/
    return valueRegex.test(value)
  }

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div>
        <h2 className='text-center text-2xl mb-3 text-gray-900'>Create Role</h2>
        <div className='mb-[15px]'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Value
          </label>
          <input
            {...register('value', { required: 'Invalid value', validate: isValidValue })}
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Role'
          />
          {errors.value && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.value.message}
            </p>
          )}
        </div>
        <div className='mb-[15px]'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Description
          </label>
          <input
            {...register('description', { required: 'Invalid value' })}
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Description'
          />
          {errors.value && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.description?.message}
            </p>
          )}
        </div>
      </div>
      <hr className='h-px my-8 bg-gray-200 border-0'></hr>
      <button
        disabled={isLoadingForm || isLoadingCreateRole}
        type='submit'
        className='focus:outline-none disabled:bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-700 bg-indigo-600 rounded text-white px-8 py-2 text-sm'
      >
        {isLoadingForm || isLoadingCreateRole ? (
          <SpinnerButton
            colorBg='bg-indigo-600'
            colorSpinner='bg-gray-50'
          />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}

export default RolesForm
