import React from 'react'
import UsersList from '../components/Users/UsersList'
import Modal from '../components/Modal'
import { useAppSelector } from '../hooks/redux'
import UsersForm from '../components/Users/Form/UsersForm'

const UsersPage = () => {
  // state redux
  const isModal = useAppSelector((state) => state.app.isModal)

  return (
    <main className='flex-1'>
      <div className='flex items-center justify-between py-7 px-10'>
        <div>
          <h1 className='text-2xl font-semibold leading-relaxed text-gray-800'>Users</h1>
        </div>
      </div>

      <hr className='h-px bg-gray-200 border-0'></hr>

      <table className='w-full '>
        <thead>
          <tr className='text-sm font-medium text-gray-700 border-b border-gray-200 '>
            <td className='pl-10'>User id</td>
            <td className='py-4 px-4 text-center'>email</td>
            <td className='py-4 px-4 text-center'>isActive</td>
            <td className='py-4 px-4 text-center'>isBan</td>
            <td className='py-4 px-4 text-center'>banReason</td>
          </tr>
        </thead>
        <tbody>
          <UsersList />
        </tbody>
      </table>

      {isModal ? (
        <Modal>
          <UsersForm />
        </Modal>
      ) : null}
    </main>
  )
}

export default UsersPage
