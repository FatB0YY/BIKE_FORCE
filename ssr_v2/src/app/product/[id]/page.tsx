'use server'

import { Metadata } from 'next'
import Currency from '@/components/Currency'
import AddToCartButton from '@/components/AddToCartButton'
import { getOneProduct } from '@/server-actions/actions'

type Props = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const product = await getOneProduct(id)
  return {
    title: `BIKE FORCE | ${product.name} details`,
  }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product = await getOneProduct(id)

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        {/* image & wrapper */}
        <div className='flex flex-col lg:flex-row items-center'>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img
              className='max-w-[200px] lg:max-w-sm'
              src={`${process.env.NEXT_PUBLIC_API_URL_WITHOUT_API!}${product.img}`}
              alt={product.name}
            />
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-2-[450px] mx-auto lg:mx-0'>{product.name}</h1>
            <div className='text-xl text-red-500 font-medium mb-6 '>
              <Currency value={product.price} />
            </div>

            <div className='max-w-lg'>
              {product.info?.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-between'
                  >
                    <span className='mb-8'>{item.title}: </span>
                    <span className='mb-8'>{item.description}</span>
                  </div>
                )
              })}
            </div>

            <AddToCartButton
              product={product}
              className='bg-primary hover:bg-gray-800 transition-all py-4 px-8 text-white'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
