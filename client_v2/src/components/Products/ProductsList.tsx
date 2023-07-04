import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../../service/ProductsAPI'
import ProductsListItem from './ProductsListItem'
import Spinner from '../Spinner'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setTotalCount } from '../../redux/slices/ProductsSlice'

const ProductsList = () => {
  // dispatch
  const dispatch = useAppDispatch()
  // state redux
  const { limit, page } = useAppSelector((state) => state.product)
  // rtk query
  const { data: products, isLoading: isLoadingGetAllProduct } = useGetAllProductsQuery({ page, limit })

  useEffect(() => {
    if (products) {
      dispatch(setTotalCount(products.count))
    }
  }, [products])

  if (isLoadingGetAllProduct) {
    return <Spinner />
  }

  return (
    <>
      {products?.rows &&
        products.rows.map((product) => (
          <ProductsListItem
            key={product.id}
            product={product}
          />
        ))}
    </>
  )
}

export default ProductsList
