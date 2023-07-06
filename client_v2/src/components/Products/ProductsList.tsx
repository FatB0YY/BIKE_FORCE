import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../../service/ProductsAPI'
import ProductsListItem from './ProductsListItem'
import Spinner from '../Spinner'
import { useActionCreators, useAppSelector } from '../../hooks/redux'
import { productsActions } from '../../redux/slices/ProductsSlice'

const ProductsList = () => {
  // dispatch
  const actionsProducts = useActionCreators(productsActions)
  // state redux
  const limit = useAppSelector((state) => state.product.limit)
  const page = useAppSelector((state) => state.product.page)
  // rtk query
  const { data: products, isLoading: isLoadingGetAllProduct } = useGetAllProductsQuery({ page, limit })

  useEffect(() => {
    if (products) {
      actionsProducts.setTotalCount(products.count)
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
