import { useAppDispatch } from '@/hooks/redux'
import { decreaseAmount, increaseAmount, removeFromCart } from '@/redux/reducers/UserSlice'
import { IProductInCart } from '@/types'
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BikeImage from '../img/webImage.jpg'

interface IPropsProductInCartItem {
  productInCart: IProductInCart
}

const CartItem = ({ productInCart }: IPropsProductInCartItem) => {
  const dispatch = useAppDispatch()
  const { amount, count, id, img, isActive, name, price } = productInCart

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        {/* image */}
        <Link
          href={`/product/[id]`}
          as={`/product/${id}`}
        >
          <Image
            className='max-w-[80px]'
            alt={name}
            src={BikeImage}
            width={80}
            height={150}
          />
        </Link>
        <div className='w-full flex flex-col'>
          {/* name & remove icon */}
          <div className='flex justify-between mb-2'>
            {/* name */}
            <Link
              href={`/product/[id]`}
              as={`/product/${id}`}
              className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            >
              {name}
            </Link>
            {/* remove icon */}
            <div
              onClick={() => dispatch(removeFromCart(id))}
              className='text-xl cursor-pointer'
            >
              <FontAwesomeIcon
                className='text-gray-500 hover:text-red-500 transition'
                icon={faXmark}
              />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] text-sm'>
            {/* qty */}
            <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
              {/* minus icon */}
              <div
                onClick={() => dispatch(decreaseAmount(id))}
                className='flex-1 h-dull flex justify-center items-center cursor-pointer h-full'
              >
                <FontAwesomeIcon
                  className='text-gray-500 hover:text-gray-600 transition'
                  icon={faMinus}
                />
              </div>
              {/* amount */}
              <div className='h-full flex justify-center items-center px-2'>{amount}</div>
              {/* plus icon */}
              <div
                onClick={() => dispatch(increaseAmount(id))}
                className='flex-1 h-full flex justify-center items-center cursor-pointer'
              >
                <FontAwesomeIcon
                  className='text-gray-500 hover:text-gray-600 transition'
                  icon={faPlus}
                />
              </div>
            </div>
            {/* item price */}
            <div className='flex-1 flex items-center justify-around'>$ {price}</div>
            {/* final price */}
            <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`$ ${Number.parseFloat(
              String(price * amount),
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
