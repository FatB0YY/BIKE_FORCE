import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Table from '../table/Table'
import RolesService from '../../services/RolesService'
const AddUsers = () => {
  const [data, setData] = useState([])
  const { users, userRoleForValid, userRoleId } = useSelector((state) => state)

  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }

  filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

  const columns = useMemo(() => [
    {
      Header: 'id',
      accessor: 'id',
      filter: 'fuzzyText',
      Filter: () => null,
    },
    {
      Header: 'почта',
      accessor: 'email',
      Filter: () => null,
    },
    {
      Header: 'роль',
      accessor: 'role',
      filter: 'fuzzyText',
    },
  ])

  useEffect(() => {
    if (users && users.length > 0) {
      const fetchId = async (id) => {
        const roleId = await RolesService.getUserRoles(id)
        console.log(roleId)
        return roleId.description
      }

      const fetchData = async () => {
        const promises = users.map(async (user) => {
          const roleId = await fetchId(user.id)
          return {
            email: user.email,
            id: user.id,
            banReason: user.banReason,
            isActive: user.isActive,
            role: roleId,
          }
        })
        const filteredProduct = await Promise.all(promises)
        setData(filteredProduct)
      }

      fetchData()
    }
  }, [users])

  return (
    <Table
      columns={columns}
      data={data}
      pages={'users'}
    />
  )
}

export default AddUsers
