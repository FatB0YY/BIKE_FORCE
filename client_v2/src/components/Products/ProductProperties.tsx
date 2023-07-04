import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addNewProp, removeProperties, setProperties } from '../../redux/slices/ProductsSlice'

const ProductProperties = () => {
  const dispatch = useAppDispatch()
  const { properties } = useAppSelector((state) => state.product)

  const handleChange = (index: number, e: any) => {
    const { name, value } = e.target

    const updatedProperties = [...properties]
    updatedProperties[index] = { ...updatedProperties[index], [name]: value }

    dispatch(setProperties(updatedProperties))
  }

  const handleAddProperty = () => {
    dispatch(addNewProp())
  }

  const handleRemoveProperty = (index: number) => {
    dispatch(removeProperties(index))
  }

  return (
    <div className='space-y-4'>
      {properties.map((property, index) => (
        <div
          key={index}
          className='flex space-x-4'
        >
          <input
            type='text'
            name='title'
            value={property.title}
            onChange={(e) => handleChange(index, e)}
            placeholder='Value'
            className='p-2 border rounded w-[50%]'
          />
          <input
            type='text'
            name='description'
            value={property.description}
            onChange={(e) => handleChange(index, e)}
            placeholder='Description'
            className='p-2 border rounded w-[50%]'
          />
          {index > 0 && (
            <button
              type='button'
              onClick={() => handleRemoveProperty(index)}
              className='px-4 py-2 text-white bg-red-500 rounded'
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={handleAddProperty}
        className='px-4 py-2 text-white bg-green-500 rounded'
      >
        Add Property
      </button>
    </div>
  )
}

export default ProductProperties
