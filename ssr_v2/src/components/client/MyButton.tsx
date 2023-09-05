'use client'

import { addToCart } from '@/redux/reducers/UserSlice'
import { useDispatch } from 'react-redux'

const MyButton = ({ product }: any) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ product, id: product.id }))
  }

  return (
    <button
      onClick={handleAddToCart}
      className='bg-primary hover:bg-gray-800 transition-all py-4 px-8 text-white'
    >
      Add to cart
    </button>
  )
}

export default MyButton
