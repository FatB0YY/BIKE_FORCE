'use client'

import { FC, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import NoResult from '../NoResult'
import { IBrand, ICategory, IProduct, IProductResponse } from '@/types'
import { useActionCreators, useAppSelector } from '@/hooks/redux'
import { userActions } from '@/redux/reducers/UserSlice'
import { getAllProducts } from '@/server-actions/actions'
import ProductItemSkeleton from '@/components/ListProduct/ProductItemSkeleton' // Импортируйте скелетон

interface IProductsPageProps {
  brands: IBrand[]
  categories: ICategory[]
}

const ProductList: FC<IProductsPageProps> = ({ brands, categories }) => {
  const actionsUser = useActionCreators(userActions)
  const tabBrandId = useAppSelector((state) => state.user.tabBrandId)!
  const tabCategoryId = useAppSelector((state) => state.user.tabCategoryId)!
  const page = useAppSelector((state) => state.user.page)
  const [productsState, setProductState] = useState<IProductResponse>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (productsState) {
      actionsUser.setTotalCount(productsState.count)
    }
  }, [productsState])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)

      const productsData = await getAllProducts({
        limit: 8,
        page: page,
        BrandId: tabBrandId,
        CategoryId: tabCategoryId,
      })

      setProductState(productsData)

      setIsLoading(false)
    }
    getData()
  }, [tabBrandId, tabCategoryId, page])

  const fictitiousBrand = {
    name: 'No brand',
    id: 0,
    isActive: false,
  }

  const fictitiousCategory = {
    name: 'No category',
    id: 0,
    isActive: false,
  }

  const findBrand = (product: IProduct) => brands.find((brand) => brand.id === product.BrandId) || fictitiousBrand
  const findCategory = (product: IProduct) =>
    categories.find((category) => category.id === product.CategoryId) || fictitiousCategory

  const renderProducts = (productList: IProduct[]) => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
        {productList.map((product: IProduct) => (
          <ProductItem
            key={product.id}
            product={product}
            brand={findBrand(product)}
            category={findCategory(product)}
          />
        ))}
      </div>
    )
  }

  const renderSkeleton = () => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
      </div>
    )
  }

  return (
    <section className='py-16'>
      <div className='container mx-auto'>
        {isLoading ? (
          renderSkeleton()
        ) : // Показывать скелетон во время загрузки

        productsState && productsState.rows.length !== 0 ? (
          renderProducts(productsState.rows)
        ) : (
          <NoResult />
        )}
      </div>
    </section>
  )
}

export default ProductList
