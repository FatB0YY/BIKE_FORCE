import React from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import { IProductPropsId } from '@/types'
import bikeImage from '@/img/webImage.jpg'
import MyButton2 from '../client/MyButton2'

const ProductItem = ({ product, brand, category }: IProductPropsId) => {
  console.log('server2')

  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group translate'>
        <div className='w-full h-full flex justify-center items-center'>
          {/* image */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <Image
              src={bikeImage}
              alt={product.name}
              quality={100}
              width={Number(process.env.SIZE_WIDTH_PRODUCT_LIST)}
              height={Number(process.env.SIZE_HEIGHT_PRODUCT_LIST)}
              className='max-h-[160px] group-hover:scale-110 transition duration-300'
            />
          </div>
        </div>
        {/* buttons */}
        <div className='absolute top-2 -right-11 group-hover:right-2  p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <MyButton2 product={product} />

          <Link
            href={`/product/[id]`}
            as={`/product/${product.id}`}
            className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>
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

        <div className='font-semibold'>$ {product.price}</div>
      </div>
    </div>
  )
}

export default ProductItem
