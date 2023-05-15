import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '../table/Table'
import NumberRangeColumnFilter from '../filters/numberRangeColumnFilter/NumberRangeColumnFilter'
import SelectColumnFilter from '../filters/selectColumnFilter/SelectColumnFilter'
import ProductService from '../../services/ProductService'
import imageSrc from '../../assets/images/velo-1.jpg'

const ListProducts = ({ setModalS }) => {
  const { product, category, brand } = useSelector((state) => state)
  const dispatch = useDispatch()

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
      Header: 'Название товара',
      accessor: 'name',
      filter: 'fuzzyText',
    },
    {
      Header: 'Изображение',
      accessor: 'img',
      Filter: () => null,
      Cell: ({ value }) => (
        <div className='table__column'>
          <img
            src={imageSrc}
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
      Header: 'бренд',
      accessor: 'brand',
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
      accessor: 'info',
      Filter: () => null,
    },
    {
      Header: 'Количество',
      accessor: 'count',
      Filter: NumberRangeColumnFilter,
      filter: 'between',
    },
  ])

  useEffect(() => {
    if (product && product.length > 0) {
      const fetchInfo = async (id) => {
        const productInfo = await ProductService.getProductId(id)
        return productInfo
      }
      const fetchData = async () => {
        const promises = product.map(async (product) => {
          const responseInfo = await fetchInfo(product.id)
          const dataRes = {}
          for (const key in responseInfo) {
            brand.forEach((item) => {
              const value = responseInfo[key]
              if (key === 'BrandId') {
                if (item.id === value) {
                  dataRes['brand'] = item.name
                }
              }
            })
            category.forEach((item) => {
              const value = responseInfo[key]
              if (key === 'CategoryId') {
                if (item.id === value) {
                  dataRes['category'] = item.name
                }
              }
            })
            if (key === 'info') {
              responseInfo[key].forEach((item) => {
                const title = item.title
                const description = item.description

                dataRes['info'] = [`${title}: ${description}`]
              })
            }
          }

          return {
            name: product.name,
            id: product.id,
            price: product.price,
            img: product.img,
            count: product.count,
            isActive: product.isActive,
            info: dataRes.info,
            category: dataRes.category,
            brand: dataRes.brand,
          }
        })
        const filteredProduct = await Promise.all(promises)
        setData(filteredProduct)
      }

      fetchData()
    }
  }, [product])

  return (
    <Table
      columns={columns}
      data={data}
      setModalS={setModalS}
      pages={'product'}
    />
  )
}

export default ListProducts
