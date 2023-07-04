import React from 'react'
import { useGetAllUsersQuery } from '../../service/UsersAPI'
import UsersListItem from './UsersListItem'
import Spinner from '../Spinner'

const UsersList = () => {
  const { data: users, isLoading: isLoadingGetAllUser } = useGetAllUsersQuery()

  if (isLoadingGetAllUser) {
    return <Spinner />
  }

  return (
    <>
      {users &&
        users.map((user) => (
          <UsersListItem
            key={user.id}
            user={user}
          />
        ))}
    </>
  )
}

export default UsersList
