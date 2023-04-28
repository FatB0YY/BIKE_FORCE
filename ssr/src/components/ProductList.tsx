import React from 'react'
import ProductItem from './ProductItem'
import { IProduct, IProductsPageProps } from '@/types'

const ProductList = ({ products }: IProductsPageProps) => {
  return (
    <section className='py-16'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {products.map((product: IProduct) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList