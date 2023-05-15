import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Table from '../table/Table'
import RolesService from '../../services/RolesService'
const ListUsers = () => {
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
      const fetchData = async () => {
        const promises = users.map(async (user) => {
          const infoArr = []
          const roleId = await RolesService.getUserRoles(user.id)
          roleId.forEach((item) => {
            infoArr.push(item.description)
          })
          return {
            email: user.email,
            id: user.id,
            banReason: user.banReason,
            isActive: user.isActive,
            role: infoArr.join('\n'),
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

export default ListUsers
