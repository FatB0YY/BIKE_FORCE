'use client'

import { useActionCreators } from '@/hooks/redux'
import { userActions } from '@/redux/reducers/UserSlice'
import { IProduct } from '@/types'
import { FC } from 'react'

type AddToCartButtonProps = {
  className?: string
  icon?: React.ReactElement
  text?: string
  product: IProduct
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ className, icon, text, product }) => {
  const actionsUser = useActionCreators(userActions)

  return (
    <button
      onClick={() => actionsUser.addToCart({ product: product, id: product.id })}
      className={className}
    >
      Add to cart
      {icon}
    </button>
  )
}

export default AddToCartButton
