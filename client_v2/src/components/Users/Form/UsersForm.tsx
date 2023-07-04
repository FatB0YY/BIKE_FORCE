import React from 'react'
import { useBanMutation } from '../../../service/UsersAPI'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import SpinnerButton from '../../SpinnerButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCurrentUserBan } from '../../../redux/slices/UsersSlice'

interface MyForm {
  banReason: string
}

const UsersForm = () => {
  // dispatch
  const dispatch = useAppDispatch()
  // redux
  const { currentUserBan: userId } = useAppSelector((state) => state.user)
  // rtk query
  const [banUser, { isLoading: isLoadingBanUser }] = useBanMutation()
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingForm },
    clearErrors,
    reset,
  } = useForm<MyForm>()

  const onValidSubmit: SubmitHandler<MyForm> = async ({ banReason }) => {
    if (userId) {
      await banUser({ userId, banReason })
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }

    clearErrors()
    reset()
    dispatch(setCurrentUserBan(null))
  }

  const onInValidSubmit: SubmitErrorHandler<MyForm> = (data) => {
    console.log('data', data)
    clearErrors()
    reset()
    dispatch(setCurrentUserBan(null))
  }

  const isValidBanReason = (banReason: string) => {
    const banReasonRegex = /^(?=.{1,250}$).*/
    return banReasonRegex.test(banReason)
  }

  return (
    <form onSubmit={handleSubmit(onValidSubmit, onInValidSubmit)}>
      <div>
        <h2 className='text-center text-2xl mb-3 text-gray-900'>Ban User</h2>
        <div className='mb-[15px]'>
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Ban reason
          </label>
          <textarea
            {...register('banReason', { required: 'Invalid value', validate: isValidBanReason })}
            id='message'
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
            placeholder='Write your thoughts here...'
          ></textarea>
          {errors.banReason && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.banReason.message}
            </p>
          )}
        </div>
      </div>
      <hr className='h-px my-8 bg-gray-200 border-0'></hr>
      <button
        disabled={isLoadingForm || isLoadingBanUser}
        type='submit'
        className='focus:outline-none focus:ring-2 disabled:bg-indigo-900 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-700 bg-indigo-600 rounded text-white px-8 py-2 text-sm'
      >
        {isLoadingForm || isLoadingBanUser ? (
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

export default UsersForm
