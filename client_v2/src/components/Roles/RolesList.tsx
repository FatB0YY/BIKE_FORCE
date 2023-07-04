import React from 'react'
import { useGetAllRolesQuery } from '../../service/RolesAPI'
import Spinner from '../Spinner'
import RolesListItem from './RolesListItem'

const RolesList = () => {
  // rtk query
  const { data: roles, isLoading: isLoadingGetAllRoles } = useGetAllRolesQuery()

  if (isLoadingGetAllRoles) {
    return <Spinner />
  }

  return (
    <>
      {roles &&
        roles.map((role) => (
          <RolesListItem
            key={role.id}
            role={role}
          />
        ))}
    </>
  )
}

export default RolesList
