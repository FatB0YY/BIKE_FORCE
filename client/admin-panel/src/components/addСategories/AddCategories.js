import { useMemo } from 'react'

import Table from '../table/Table'

const AddCategories = () => {

  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }

  filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

  const columns = useMemo(() => [
    {
      Header: 'Название категория',
      accessor: 'name',
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
      data={[{
        name: 'apple'
      }]}
      styles={tableStyles}/>
    )
}

export default AddCategories;