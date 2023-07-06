import React from 'react'
import RolesList from '../components/Roles/RolesList'
import { useActionCreators, useAppSelector } from '../hooks/redux'
import { appActions } from '../redux/slices/AppSlice'
import { AiOutlinePlus } from 'react-icons/ai'
import RolesForm from '../components/Roles/Form/RolesForm'
import Modal from '../components/Modal'

const RolesPage = () => {
  // dispatch
  const actionsApp = useActionCreators(appActions)
  // redux state
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
          <h1 className='text-2xl font-semibold leading-relaxed text-gray-800'>Roles</h1>
          <p className='text-sm font-medium text-gray-500'>Create your role and upload here</p>
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
            <td className='pl-10'>Role</td>
            <td className='py-4 px-4 text-center'>Description</td>
          </tr>
        </thead>
        <tbody>
          <RolesList />
        </tbody>
      </table>

      {isModal ? (
        <Modal>
          <RolesForm />
        </Modal>
      ) : null}
    </main>
  )
}

export default RolesPage
