import React from 'react'
import { IInfo } from '../types/Product'
import { useParams } from 'react-router-dom'
import { useGetOneProductQuery } from '../service/ProductsAPI'

const ProductsItem = () => {
  // react router dom
  const { id } = useParams()
  // rtk query
  const { data: product, isLoading } = useGetOneProductQuery(Number(id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>No product</div>
  }

  return (
    <main className='w-full'>
      <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <div className='container mx-auto'>
          {/* image & wrapper */}
          <div className='flex flex-col lg:flex-row items-center'>
            {/* image */}
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
              <img
                className='max-w-[200px] lg:max-w-sm rounded-lg'
                // src={`${process.env.NEXT_PUBLIC_API_URL_WITHOUT_API}${product.img}`}
                src='https://designmyhome.ru/sites/default/files/images/mebel_ikea_01.jpg'
                alt={product.name}
              />
            </div>
            {/* text */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-2-[450px] mx-auto lg:mx-0'>{product.name}</h1>
              <div className='text-xl text-indigo-600 font-medium mb-6 '>$ {product.price}</div>

              {(product.info as Array<IInfo>).map((item) => {
                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-between max-w-[320px]'
                  >
                    <span className='mb-8'>{item.title}: </span>
                    <span className='mb-8'>{item.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductsItem
