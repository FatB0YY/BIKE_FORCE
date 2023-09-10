'use client'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useActionCreators, useAppSelector } from '@/hooks/redux'
import { userActions } from '@/redux/reducers/UserSlice'
import { useEffect } from 'react'

const CartInHeader = () => {
  // dispatch
  const actionsUser = useActionCreators(userActions)
  // state redux
  const isOpenSidebar = useAppSelector((state) => state.user.isOpenSidebar)
  const itemAmountInCart = useAppSelector((state) => state.user.itemAmountInCart)
  const cart = useAppSelector((state) => state.user.cart)

  useEffect(() => {
    if (cart) {
      const amount: number = cart.reduce((accumulator: number, currentItem) => {
        return accumulator + currentItem.amount
      }, 0)
      actionsUser.setItemAmountInCart(amount)
    }
  }, [cart])

  return (
    <div>
      {/* cart */}
      <div
        onClick={() => actionsUser.setIsOpenSidebar(!isOpenSidebar)}
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
  )
}

export default CartInHeader
