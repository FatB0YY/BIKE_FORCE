import { IBrand, ICategory, IProductResponse, IQueryProducts } from '@/types'
import ProductList from '@/components/server/ProductList'
import UserService from '@/services/UserService'
import Pagination from '@/components/client/Pagination'
import Tabs from '@/components/client/Tabs'

async function getProducts(query: IQueryProducts): Promise<IProductResponse> {
  const products = await UserService.getAllProduct(query)
  return products
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
  // Initiate both requests in parallel
  const productsData = getProducts({ limit: 8, page: 1 })
  const brandsData = getBrands()
  const categoriesData = getCategories()

  // Wait for the promises to resolve
  const [products, brands, categories] = await Promise.all([productsData, brandsData, categoriesData])

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
        products={products}
        brands={brands}
        categories={categories}
      />
      <Pagination />
    </>
  )
}

export default Home
