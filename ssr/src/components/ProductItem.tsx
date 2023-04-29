import React from 'react'
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch } from '@/hooks/redux'
import { addToCart } from '@/redux/reducers/UserSlice'
import { IProductPropsId } from '@/types'

const ProductItem = ({ product, brand, category }: IProductPropsId) => {
  const dispatch = useAppDispatch()

  const { id, img, name, price } = product

  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group translate'>
        <div className='w-full h-full flex justify-center items-center'>
          {/* image */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <Image
              src={`${process.env.API_URL_WITHOUT_API}${img}`}
              alt={name}
              quality={100}
              width={Number(process.env.SIZE_WIDTH_PRODUCT_LIST)}
              height={Number(process.env.SIZE_HEIGHT_PRODUCT_LIST)}
              className='max-h-[160px] group-hover:scale-110 transition duration-300'
            />
          </div>
        </div>
        {/* buttons */}
        <div className='absolute top-2 -right-11 group-hover:right-2  p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => dispatch(addToCart({ product, id: product.id }))}>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
              <FontAwesomeIcon
                icon={faPlus}
                className='text-3xl'
              />
            </div>
          </button>

          <Link
            href={`/product/[id]`}
            as={`/product/${id}`}
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
          as={`/product/${id}`}
        >
          <h2 className='font-semibold mb-1'>{name}</h2>
        </Link>

        <div className='font-semibold'>$ {price}</div>
      </div>
    </div>
  )
}

export default ProductItem
