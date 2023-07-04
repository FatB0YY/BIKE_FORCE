import React from 'react'
import { setIsModal } from '../redux/slices/AppSlice'
import { useAppDispatch } from '../hooks/redux'
import { setCurrentUserBan } from '../redux/slices/UsersSlice'

const Modal = ({ children }: any) => {
  const dispatch = useAppDispatch()

  const handleCloseModal = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(setIsModal(false))
    dispatch(setCurrentUserBan(null))
  }

  return (
    <div
      className='z-10 h-[1200px] py-12 bg-[#F5E6E0] transition duration-150 ease-in-out absolute top-0 right-0 bottom-0 left-0'
      id='modal'
    >
      <div
        role='alert'
        className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
      >
        <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-[#F5E6E0]'>
          {children}
          <div className='flex items-center justify-start w-full'>
            <button
              onClick={(event) => handleCloseModal(event)}
              className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
            >
              Cancel
            </button>
          </div>
          <button
            className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
            onClick={(event) => handleCloseModal(event)}
            aria-label='close modal'
            role='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-x'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                stroke='none'
                d='M0 0h24v24H0z'
              />
              <line
                x1='18'
                y1='6'
                x2='6'
                y2='18'
              />
              <line
                x1='6'
                y1='6'
                x2='18'
                y2='18'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
