import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Table from '../table/Table'

const AddBrands = () => {
  const {brands} = useSelector(state => state);

  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }

  filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

  const columns = useMemo(() => [
    {
      Header: 'Название бренда',
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
      data={brands}
      styles={tableStyles}
      />
    )
}

export default AddBrands;