import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryService from '../../services/CategoryService'
import { categoriesAdd } from '../../actions'

import Table from '../table/Table'

const AddCategories = () => {

  const [data, setData] = useState([]);

  const {category} = useSelector(state => state);

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

  useEffect(() => {
    if(category && category.length > 0) {
      const filteredCategories = category.map((category) => ({
        name: category.name,
        id: category.id,
        isActive: category.isActive
      }));
      setData(filteredCategories);
    }
  },[category])

 
    return (
      <Table 
      columns={columns}
      data={data}
      styles={tableStyles}
      pages={'category'}/>
    )
}

export default AddCategories;