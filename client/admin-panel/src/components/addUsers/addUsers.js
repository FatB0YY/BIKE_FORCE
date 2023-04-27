import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Table from '../table/Table'

const AddUsers = () => {
  const {users, roles} = useSelector(state => state);

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
    },
  ])
 
  const tableStyles = {
    table: {
      minWidth: '300px',
      margin: '0 0 0 35px'
    },
  }

    return (
      <Table 
      columns={columns}
      data={users}
      styles={tableStyles}
      />
    )
}

export default AddUsers;