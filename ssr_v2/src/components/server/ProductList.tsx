import { FC } from 'react'
import ProductItem from './ProductItem'
import { IBrand, ICategory, IProduct } from '@/types'
import NoResult from './NoResult'

interface IProductsPageProps {
  products: IProduct[]
  brands: IBrand[]
  categories: ICategory[]
}

const ProductList: FC<IProductsPageProps> = ({ products, brands, categories }) => {
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

  return (
    <section className='py-16'>
      <div className='container mx-auto'>
        {products.length === 0 && <NoResult />}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {products.map((product: IProduct) => (
            <ProductItem
              key={product.id}
              product={product}
              brand={brands.find((brand) => brand.id === product.BrandId) || fictitiousBrand}
              category={categories.find((category) => category.id === product.CategoryId) || fictitiousCategory}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList
