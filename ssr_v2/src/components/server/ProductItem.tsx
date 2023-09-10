'use client'

import React, { FC, MouseEventHandler } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IProductPropsId } from '@/types'
import { useActionCreators } from '@/hooks/redux'
import IconButton from '../client/IconButton'
import { Expand, ShoppingCart } from 'lucide-react'
import rfr from '@/img/webImage.jpg'
import Currency from '../client/Currency'
import { userActions } from '@/redux/reducers/UserSlice'

const ProductItem: FC<IProductPropsId> = ({ product, brand, category }) => {
  // dispatch
  const actionsUser = useActionCreators(userActions)

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    actionsUser.addToCart({ id: product.id, product: product })
  }

  return (
    <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        {/* image */}
        <Image
          src={rfr}
          alt={product.name}
          quality={100}
          fill
          className='aspect-square object-cover justify-center'
        />

        {/* buttons */}
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
              onClick={() => {
                return null
              }}
              icon={
                <Link
                  href={`/product/[id]`}
                  as={`/product/${product.id}`}
                >
                  <Expand
                    size={20}
                    className={'text-gray-600'}
                  />
                </Link>
              }
            />
            <IconButton
              onClick={onAddToCart}
              icon={
                <ShoppingCart
                  size={20}
                  className={'text-gray-600'}
                />
              }
            />
          </div>
        </div>
      </div>
      {/* category title brand*/}
      <div>
        <div className='text-sm capitalize text-gray-500 mb-1'>{category.name}</div>
        <div className='text-sm capitalize text-gray-500 mb-1'>{brand.name}</div>

        <Link
          href={`/product/[id]`}
          as={`/product/${product.id}`}
        >
          <h2 className='font-semibold mb-1'>{product.name}</h2>
        </Link>

        <div className='font-semibold'>
          <Currency value={product.price} />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
