import React, { FC } from 'react'
import { IRole } from '../../types/Role'

interface IPropsRolesListItem {
  role: IRole
}

const RolesListItem: FC<IPropsRolesListItem> = ({ role }) => {
  return (
    <tr
      key={role.id}
      className='hover:bg-gray-100 transition-transform'
    >
      <td className='flex gap-x-4 items-center py-4 pl-10'>
        <span>{role.value}</span>
      </td>
      <td className='font-medium text-center'>{role.description}</td>
    </tr>
  )
}

export default RolesListItem
