import Loader from '@/components/Loader'
import MainLayout from '@/components/MainLayout'
import Sidebar from '@/components/Sidebar'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { addToCart } from '@/redux/reducers/UserSlice'
import UserService from '@/services/UserService'
import { IProductPropsId, ProductNextPageContext } from '@/types'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'

const ProductDetails = ({ product: serverProduct }: IProductPropsId) => {
  const [product, setProduct] = useState(serverProduct)
  const dispatch = useAppDispatch()
  const router: NextRouter = useRouter()

  useEffect(() => {
    async function load() {
      const response = await UserService.getOneProduct(Number(router.query.id))
      setProduct(response.data)
    }

    if (!serverProduct) {
      load()
    }
  }, [])

  if (!product) {
    return (
      <MainLayout title='Loading...'>
        <Loader />
      </MainLayout>
    )
  }

  return (
    <MainLayout title={product.name}>
      <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <div className='container mx-auto'>
          {/* image & wrapper */}
          <div className='flex flex-col lg:flex-row items-center'>
            {/* image */}
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
              <img
                className='max-w-[200px] lg:max-w-sm'
                src={`${process.env.API_URL_WITHOUT_API}${product.img}`}
                alt={product.name}
              />
            </div>
            {/* text */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-2-[450px] mx-auto lg:mx-0'>{product.name}</h1>
              <div className='text-xl text-red-500 font-medium mb-6 '>$ {product.price}</div>

              {product.info?.map((item) => {
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

              <button
                onClick={() => dispatch(addToCart({ product, id: product.id }))}
                className='bg-primary hover:bg-gray-800 transition-all py-4 px-8 text-white'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
    </MainLayout>
  )
}

export async function getServerSideProps(context: ProductNextPageContext) {
  if (!context.req) {
    return {
      product: null,
    }
  }

  const response = await UserService.getOneProduct(Number(context.query.id))
  const product = response.data

  return { props: { product } }
}

export default ProductDetails
