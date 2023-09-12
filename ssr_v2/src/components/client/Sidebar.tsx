'use client'

import React, { useEffect } from 'react'
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartItem from './CartItem'
import { useActionCreators, useAppSelector } from '@/hooks/redux'
import Link from 'next/link'
import Currency from './Currency'
import { userSlice } from '@/redux/slices'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  // dispatch
  const actionsUser = useActionCreators(userSlice.actions)
  // state redux
  const isOpenSidebar = useAppSelector((state) => state.user.isOpenSidebar)
  const cart = useAppSelector((state) => state.user.cart)
  const totalPrice = useAppSelector((state) => state.user.totalPrice)

  useEffect(() => {
    const total: number = cart.reduce((accumulator: number, currentItem: any) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0)

    actionsUser.setTotalPrice(total)
  }, [cart, totalPrice])

  return (
    <div
      className={`${
        isOpenSidebar ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag</div>
        {/* icon */}
        <div
          onClick={() => actionsUser.setIsOpenSidebar(false)}
          className='cursor-pointer w-8 h-8 flex justify-center items-center'
        >
          <FontAwesomeIcon
            className='text-2xl'
            icon={faArrowRight}
          />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[350px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((productInCart) => (
          <CartItem
            key={productInCart.id}
            productInCart={productInCart}
          />
        ))}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          {/* total */}
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span> {<Currency value={totalPrice} />}
          </div>
          {/* clear cart icon*/}
          <div
            onClick={() => actionsUser.clearCart()}
            className='cursor-pointer py-4 bg-[#E4322C] text-white w-12 h-12 flex justify-center items-center text-xl'
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <Link
          href={'/'}
          className='bg-gray-200 hover:bg-gray-300 transition-all  flex p-4 justify-center items-center text-primary w-full font-medium'
        >
          View Cart
        </Link>
        <Link
          href={'/'}
          className='bg-primary hover:bg-gray-800 transition-all flex p-4 justify-center items-center text-white w-full font-medium'
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
