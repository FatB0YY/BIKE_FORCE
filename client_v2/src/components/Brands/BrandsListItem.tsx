import React, { FC } from 'react'
import { useDeleteBrandMutation } from '../../service/BrandsAPI'
import { AiFillDelete } from 'react-icons/ai'
import { IBrand } from '../../types/Brand'
import SpinnerButton from '../SpinnerButton'

interface IPropsBrandsListItem {
  brand: IBrand
}

const BrandsListItem: FC<IPropsBrandsListItem> = ({ brand }) => {
  // rtk query
  const [deleteBrand, { isLoading: isLoadingDeleteBrand }] = useDeleteBrandMutation()

  const handleDeleteItem = async ({ event, id }: any) => {
    event.preventDefault()
    event.stopPropagation()

    await deleteBrand(id)
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })
  }
  return (
    <>
      <tr
        key={brand.id}
        className={brand.isActive ? 'hover:bg-gray-100 transition-transform' : 'bg-red-100 transition-transform'}
      >
        <td className='flex gap-x-4 items-center py-4 pl-10'>
          <span>{brand.name}</span>
        </td>
        <td className='font-medium text-center'>{brand.isActive ? '+' : '-'}</td>
        <td className='font-medium text-center'>
          <div className='flex w-20 items-center text-gray-500'>
            {brand.isActive ? (
              <button
                onClick={(event) => handleDeleteItem({ event, id: brand.id })}
                className='p-2 hover:rounded-md hover:bg-gray-200'
              >
                {isLoadingDeleteBrand ? (
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
    </>
  )
}

export default BrandsListItem
