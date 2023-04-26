import React, { useState } from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartItem from './CartItem'

const Sidebar = () => {
  const cartItems = [
    {
      title: 'rfrfrf',
    },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2x1 md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag (0)</div>
        {/* icon */}
        <div
          onClick={() => setIsOpen(false)}
          className='cursor-pointer w-8 h-8 flex justify-center items-center'
        >
          <FontAwesomeIcon
            className='text-2xl'
            icon={faArrowRight}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
