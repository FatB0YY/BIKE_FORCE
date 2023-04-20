import { useEffect, useState, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '../table/Table'
import NumberRangeColumnFilter from '../filters/numberRangeColumnFilter/NumberRangeColumnFilter'
import SelectColumnFilter from '../filters/selectColumnFilter/SelectColumnFilter'
import { useHttp } from '../../hooks/useHttp'
import { productsFetched, productsFetchingError } from '../../actions'

const ListProducts = ({ setModalS }) => {
  const { products } = useSelector((state) => state)
  const dispatch = useDispatch()

  const { request } = useHttp()

  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }

  filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

  useEffect(() => {
    request('http://localhost:3001/products')
      .then((data) => dispatch(productsFetched(data)))
      .catch(() => dispatch(productsFetchingError()))
  }, [])

  const columns = useMemo(() => [
    {
      Header: 'Название товара',
      accessor: 'name',
      filter: 'fuzzyText',
    },
    {
      Header: 'Изображение',
      accessor: 'image',
      Filter: () => null,
      Cell: ({ value }) => (
        <div className='table__column'>
          <img
            src={value}
            alt='Product'
            className='table__column-img'
          />
        </div>
      ),
    },
    {
      Header: 'Категория',
      accessor: 'category',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Цена',
      accessor: 'price',
      Filter: NumberRangeColumnFilter,
      filter: 'between',
    },
    {
      Header: 'Описание',
      accessor: 'description',
      Filter: () => null,
    },
  ])

  /*   const data = useMemo(() => products || [], [products]) */

  return (
    <Table
      columns={columns}
      data={products}
      setModalS={setModalS}
    />
  )
}

export default ListProducts
