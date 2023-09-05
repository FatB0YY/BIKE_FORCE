'use client'
import { addToCart } from '@/redux/reducers/UserSlice'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '@/hooks/redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IProduct } from '@/types'

type Props = {
  product: IProduct
}

const MyButton2 = ({ product }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <button onClick={() => dispatch(addToCart({ product, id: product.id }))}>
      <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
        <FontAwesomeIcon
          icon={faPlus}
          className='text-3xl'
        />
      </div>
    </button>
  )
}

export default MyButton2
