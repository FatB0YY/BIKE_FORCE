import React, { FC } from 'react'
import { ICategory } from '../../types/Category'
import { useDeleteCategoryMutation } from '../../service/CategoriesAPI'
import { AiFillDelete } from 'react-icons/ai'
import SpinnerButton from '../SpinnerButton'

interface IPropsCategoriesListItem {
  category: ICategory
}

const CategoriesListItem: FC<IPropsCategoriesListItem> = ({ category }) => {
  // rtk query
  const [deleteCategory, { isLoading: isLoadingDeleteCategory }] = useDeleteCategoryMutation()

  const handleDeleteItem = async ({ event, id }: any) => {
    event.preventDefault()
    event.stopPropagation()

    await deleteCategory(id)
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })
  }

  return (
    <>
      <tr
        key={category.id}
        className={category.isActive ? 'hover:bg-gray-100 transition-transform' : 'bg-red-100 transition-transform'}
      >
        <td className='flex gap-x-4 items-center py-4 pl-10'>
          <span>{category.name}</span>
        </td>
        <td className='font-medium text-center'>{category.isActive ? '+' : '-'}</td>
        <td className='font-medium text-center'>
          <div className='flex w-20 items-center text-gray-500'>
            {category.isActive ? (
              <button
                onClick={(event) => handleDeleteItem({ event, id: category.id })}
                className='p-2 hover:rounded-md hover:bg-gray-200'
              >
                {isLoadingDeleteCategory ? (
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

export default CategoriesListItem
