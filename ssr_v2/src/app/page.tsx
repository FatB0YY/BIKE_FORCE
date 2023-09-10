import { IBrand, ICategory, IProduct } from '@/types'
import ProductList from '@/components/server/ProductList'
import UserService from '@/services/UserService'
import Pagination from '@/components/client/Pagination'

async function getProducts(): Promise<IProduct[]> {
  const products = await UserService.getAllProduct({ limit: 8, page: 1 })
  return products.rows
}

async function getBrands(): Promise<IBrand[]> {
  const brands = await UserService.getAllBrand()
  return brands
}

async function getCategories(): Promise<ICategory[]> {
  const categories = await UserService.getAllCategory()
  return categories
}

const Home = async () => {
  const products = await getProducts()
  const brands = await getBrands()
  const categories = await getCategories()

  return (
    <>
      <ProductList
        products={products}
        brands={brands}
        categories={categories}
      />
      <Pagination />
    </>
  )
}

export default Home
