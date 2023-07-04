import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateCategoryMutation } from '../../../service/CategoriesAPI'
import SpinnerButton from '../../SpinnerButton'

interface MyForm {
  name: string
}

const CategoriesForm = () => {
  // rtk query
  const [createCategory, { isLoading: isLoadingCreateCategory }] = useCreateCategoryMutation()
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingForm },
    clearErrors,
    reset,
  } = useForm<MyForm>()

  const onValidSubmit: SubmitHandler<MyForm> = async ({ name }) => {
    await createCategory(name.toLocaleLowerCase())
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })

    clearErrors()
    reset()
  }

  const isValidName = (name: string) => {
    const nameRegex = /^(?=.{1,200}$).+$/
    return nameRegex.test(name)
  }

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div>
        <h2 className='text-center text-2xl mb-3 text-gray-900'>Create Category</h2>
        <div className='mb-[15px]'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Name
          </label>
          <input
            {...register('name', { required: 'Invalid value', validate: isValidName })}
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Category'
          />
          {errors.name && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.name.message}
            </p>
          )}
        </div>
      </div>
      <hr className='h-px my-8 bg-gray-200 border-0'></hr>
      <button
        disabled={isLoadingForm || isLoadingCreateCategory}
        type='submit'
        className='focus:outline-none disabled:bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-700 bg-indigo-600 rounded text-white px-8 py-2 text-sm'
      >
        {isLoadingForm || isLoadingCreateCategory ? (
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

export default CategoriesForm
