import React, { useEffect } from 'react'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsOpenSidebar, setItemAmountInCart } from '@/redux/reducers/UserSlice'
import Link from 'next/link'
import LogoImage from '../img/logo.svg'
import Image from 'next/image'

const Header = () => {
  const { isOpenSidebar, itemAmountInCart, cart } = useAppSelector((state) => state.UserReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cart) {
      const amount: number = cart.reduce((accumulator: number, currentItem) => {
        return accumulator + currentItem.amount
      }, 0)
      dispatch(setItemAmountInCart(amount))
    }
  }, [cart])

  return (
    <header className='bg-white py-2 shadow-md fixed w-full z-10 transition-all'>
      <div className='container mx-auto flex items-center justify-between h-full'>
        {/* logo */}
        <Link
          href={`/`}
          as={`/`}
        >
          <div>
            <Image
              width={50}
              src={LogoImage}
              alt='BIKE FORCE'
            />
          </div>
        </Link>
        {/* cart */}
        <div
          onClick={() => dispatch(setIsOpenSidebar(!isOpenSidebar))}
          className='cursor-pointer flex relative max-w-[50px]'
        >
          <FontAwesomeIcon
            className='text-2xl'
            icon={faBagShopping}
          />
          <div className='bg-[#E4322C] absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
            {itemAmountInCart}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
