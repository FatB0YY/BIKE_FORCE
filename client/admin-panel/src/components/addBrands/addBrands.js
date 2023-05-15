import { useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Table from '../table/Table'

const AddBrands = () => {
  const { brand } = useSelector((state) => state)

  const [data, setData] = useState([])

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
      margin: '0 0 0 35px',
    },
  }

  useEffect(() => {
    if (brand && brand.length > 0) {
      const filteredBrands = brand.map((brand) => ({
        name: brand.name,
        id: brand.id,
        isActive: brand.isActive,
      }))
      setData(filteredBrands)
    }
  }, [brand])

  return (
    <Table
      columns={columns}
      data={data}
      styles={tableStyles}
      pages={'brand'}
    />
  )
}

export default AddBrands
