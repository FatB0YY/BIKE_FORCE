'use server'

import ProductList from '@/components/server/ProductList'
import Pagination from '@/components/client/Pagination'
import Tabs from '@/components/client/Tabs'
import { getAllCategory, getAllBrand } from '@/server-actions/actions'

const Home = async () => {
  // Initiate both requests in parallel
  const brandsData = getAllBrand()
  const categoriesData = getAllCategory()

  // Wait for the promises to resolve
  const [brands, categories] = await Promise.all([brandsData, categoriesData])

  return (
    <>
      <Tabs
        value='brand'
        tabs={brands}
      />
      <Tabs
        value='category'
        tabs={categories}
      />
      <ProductList
        brands={brands}
        categories={categories}
      />
      <Pagination />
    </>
  )
}

export default Home
