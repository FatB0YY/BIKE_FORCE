import React from 'react'
import { useActionCreators, useAppSelector } from '../hooks/redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { appActions } from '../redux/slices/AppSlice'
import ProductsList from '../components/Products/ProductsList'
import Modal from '../components/Modal'
import ProductsForm from '../components/Products/Form/ProductsForm'
import Pagination from '../components/Pagination/Pagination'

const ProductsPage = () => {
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
          <h1 className='text-2xl font-semibold leading-relaxed text-gray-800'>Products</h1>
          <p className='text-sm font-medium text-gray-500'>Create your product and upload here</p>
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
            <td className='pl-10'>Product name</td>
            <td className='py-4 px-4 text-center'>Price</td>
            <td className='py-4 px-4 text-center'>Category</td>
            <td className='py-4 px-4 text-center'>Brand</td>
            <td className='py-4 px-4 text-center'>isActive</td>
          </tr>
        </thead>
        <tbody>
          <ProductsList />
        </tbody>
      </table>

      <Pagination />

      {isModal ? (
        <Modal>
          <ProductsForm />
        </Modal>
      ) : null}
    </main>
  )
}

export default ProductsPage
