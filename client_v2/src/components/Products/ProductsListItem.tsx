import React, { FC } from 'react'
import { IProduct } from '../../types/Product'
import config from '../../config'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { IoMdOpen } from 'react-icons/io'
import { useDeleteProductMutation } from '../../service/ProductsAPI'
import SpinnerButton from '../SpinnerButton'

interface IPropsProductListItem {
  product: IProduct
}

const ProductsListItem: FC<IPropsProductListItem> = ({ product }) => {
  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] = useDeleteProductMutation()

  const handleDeleteItem = async ({ event, id }: any) => {
    event.preventDefault()
    event.stopPropagation()

    await deleteProduct(id)
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })
  }

  return (
    <tr
      key={product.id}
      className={product.isActive ? 'hover:bg-gray-100 transition-transform' : 'bg-red-100 transition-transform'}
    >
      <td className='flex gap-x-4 items-center py-4 pl-10'>
        <img
          // src={`${config.API_URL}/${product.img}`}
          src='https://designmyhome.ru/sites/default/files/images/mebel_ikea_01.jpg'
          alt={product.name}
          className='w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200'
        />
        <span>{product.name}</span>
      </td>
      <td className='font-medium text-center'>${product.price}</td>
      <td className='font-medium text-center'>{product.CategoryId}</td>
      <td className='font-medium text-center'>{product.BrandId}</td>
      <td className='font-medium text-center'>{product.isActive ? '+' : '-'}</td>
      <td className='font-medium text-center'>
        <div className='flex w-20 items-center text-gray-500'>
          <Link
            to={`/products/${product.id}`}
            className='p-2 hover:rounded-md hover:bg-gray-200'
          >
            <IoMdOpen className='w-6 h-6 fill-current' />
          </Link>
        </div>
      </td>
      <td className='font-medium text-center'>
        <div className='flex w-20 items-center text-gray-500'>
          {product.isActive ? (
            <button
              onClick={(event) => handleDeleteItem({ event, id: product.id })}
              className='p-2 hover:rounded-md hover:bg-gray-200'
            >
              {isLoadingDeleteProduct ? (
                <SpinnerButton
                  colorBg='#f9fafb'
                  colorSpinner='bg-gray-50'
                />
              ) : (
                <AiFillDelete className='w-6 h-6 fill-current' />
              )}
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  )
}

export default ProductsListItem
