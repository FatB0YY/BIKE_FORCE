import React from 'react'
import { appActions } from '../redux/slices/AppSlice'
import { useActionCreators, useAppSelector } from '../hooks/redux'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from '../components/Modal'
import BrandsForm from '../components/Brands/Form/BrandsForm'
import BrandsList from '../components/Brands/BrandsList'

const BrandsPage = () => {
  // dispatch
  const actionsApp = useActionCreators(appActions)
  // state redux
  const isModal = useAppSelector((state) => state.app.isModal)

  const handleCreateItem = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    actionsApp.setIsModal(true)
  }

  return (
    <main className='flex-1'>
      <div className='flex items-center justify-between py-7 px-10'>
        <div>
          <h1 className='text-2xl font-semibold leading-relaxed text-gray-800'>Brands</h1>
          <p className='text-sm font-medium text-gray-500'>Create your brand and upload here</p>
        </div>

        <button
          onClick={(event) => handleCreateItem(event)}
          className='inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1'
        >
          <AiOutlinePlus className='w-6 h-6 fill-current' />
          <span className='text-sm font-semibold tracking-wide'>Create item</span>
        </button>
      </div>

      <hr className='h-px bg-gray-200 border-0'></hr>

      <table className='w-full '>
        <thead>
          <tr className='text-sm font-medium text-gray-700 border-b border-gray-200 '>
            <td className='pl-10'>Brand name</td>
            <td className='py-4 px-4 text-center'>isActive</td>
          </tr>
        </thead>
        <tbody>
          <BrandsList />
        </tbody>
      </table>

      {isModal ? (
        <Modal>
          <BrandsForm />
        </Modal>
      ) : null}
    </main>
  )
}

export default BrandsPage
