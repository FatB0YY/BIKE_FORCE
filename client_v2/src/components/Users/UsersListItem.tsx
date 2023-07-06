import React, { FC } from 'react'
import { IUser } from '../../types/User'
import { FaBan } from 'react-icons/fa'
import { useActionCreators } from '../../hooks/redux'
import { appActions } from '../../redux/slices/AppSlice'
import { usersActions } from '../../redux/slices/UsersSlice'
import BanReasonComponent from './BanReasonComponent'
import { MdAdminPanelSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface IPropsUsersListItem {
  user: IUser
}

const UsersListItem: FC<IPropsUsersListItem> = ({ user }) => {
  // dispatch
  const actionsUsers = useActionCreators(usersActions)
  const actionsApp = useActionCreators(appActions)

  const handleBanItem = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    actionsUsers.setCurrentUserBan(user.id)
    actionsApp.setIsModal(true)
  }

  return (
    <tr
      key={user.id}
      className={
        !user.isActive || user.isBan ? 'bg-red-100 transition-transform' : 'hover:bg-gray-100 transition-transform'
      }
    >
      <td className='flex gap-x-4 items-center py-4 pl-10'>
        <span>{user.id}</span>
      </td>
      <td className='font-medium text-center'>{user.email}</td>
      <td className='font-medium text-center'>{user.isActive ? '+' : '-'}</td>
      <td className='font-medium text-center'>{user.isBan ? '+' : '-'}</td>
      <td className='font-medium text-center'>
        {user.banReason ? <BanReasonComponent message={user.banReason} /> : '-'}
      </td>
      <td className='font-medium text-center flex'>
        <div className='flex w-20 items-center text-gray-500'>
          <Link
            to={`/users/${user.id}`}
            className='p-2 hover:rounded-md hover:bg-gray-200'
          >
            <MdAdminPanelSettings className='w-6 h-6 fill-current' />
          </Link>
        </div>
        <div className='flex w-20 items-center text-gray-500'>
          {!user.isBan ? (
            <button
              onClick={(event) => handleBanItem(event)}
              className='p-2 hover:rounded-md hover:bg-gray-200'
            >
              <FaBan className='w-6 h-6 fill-current' />
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  )
}

export default UsersListItem
