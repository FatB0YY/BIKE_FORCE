import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { productsActions } from '../../../redux/slices/ProductsSlice'
import ProductProperties from '../ProductProperties'
import { IInfo } from '../../../types/Product'
import { useActionCreators, useAppSelector } from '../../../hooks/redux'
import { useCreateProductMutation } from '../../../service/ProductsAPI'
import { useLazyGetAllCategoriesQuery } from '../../../service/CategoriesAPI'
import { useLazyGetAllBrandsQuery } from '../../../service/BrandsAPI'
import SpinnerButton from '../../SpinnerButton'
import BrandsListSelect from './BrandsListSelect'
import CategoriesListSelect from './CategoriesListSelect'

interface MyForm {
  name: string
  img: FileList
  price: string
  CategoryId: number
  BrandId: number
  info: IInfo[]
}

const ProductsForm = () => {
  // dispatch
  const actionsProducts = useActionCreators(productsActions)
  // state redux
  const properties = useAppSelector((state) => state.product.properties)
  // state react
  const [flagCategory, setFlagCategory] = useState(true)
  const [flagBrand, setFlagBrand] = useState(true)
  // query
  const [createProduct, { isLoading: isLoadingCreateProduct }] = useCreateProductMutation()
  const [getAllCategories, { data: categories, isLoading: isLoadingGetAllCategories }] = useLazyGetAllCategoriesQuery()
  const [getAllBrands, { data: brands, isLoading: isLoadingGetAllBrands }] = useLazyGetAllBrandsQuery()
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingForm },
    clearErrors,
    reset,
  } = useForm<MyForm>()

  const onValidSubmit: SubmitHandler<MyForm> = async ({ name, price, BrandId, CategoryId, img }) => {
    // костыль
    let isValid = true
    for (let i = 0; i < properties.length; i++) {
      let obj = properties[i]
      // Проверяем, является ли объект пустым
      if (Object.values(obj as any).every((value) => value === '')) {
        isValid = false
        break
      }
    }

    const formData = new FormData()

    formData.append('img', img[0] as any)
    formData.append('name', name.toLocaleLowerCase())
    formData.append('price', price)
    formData.append('BrandId', String(BrandId))
    formData.append('CategoryId', String(CategoryId))

    if (isValid) {
      formData.append('info', JSON.stringify(properties))
    }

    await createProduct(formData)
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })

    clearErrors()
    reset()
    actionsProducts.defaultProperties()
  }

  const handleGetCategories = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (flagCategory) {
      await getAllCategories()
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }

    setFlagCategory(!flagCategory)
  }

  const handleGetBrands = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    if (flagBrand) {
      await getAllBrands()
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }

    setFlagBrand(!flagBrand)
  }

  const isValidName = (name: string) => {
    const nameRegex = /^(?=.{1,200}$).+$/
    return nameRegex.test(name)
  }

  const isValidPrice = (price: string) => {
    const priceRegex = /^(?!0\d)\d+$/
    return priceRegex.test(price)
  }

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div>
        <h2 className='text-center text-2xl mb-3 text-gray-900'>Create Product</h2>
        <div className='flex items-center justify-between mb-[15px]'>
          <span className='text-sm font-medium text-gray-900'>Category: </span>
          <div className='inline-block relative w-64'>
            <select
              onClick={(event) => handleGetCategories(event)}
              {...register('CategoryId', { required: 'Select one option' })}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value=''></option>
              {isLoadingGetAllCategories ? (
                <option disabled>Loading...</option>
              ) : (
                <CategoriesListSelect categories={categories} />
              )}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        {/* error Category */}
        {errors.CategoryId && (
          <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
            <span className='font-medium'>Oops!</span> {errors.CategoryId.message}
          </p>
        )}
        <div className='flex items-center justify-between mb-[15px]'>
          <span className='text-sm font-medium text-gray-900'>Brand: </span>
          <div className='inline-block relative w-64'>
            <select
              onClick={(event) => handleGetBrands(event)}
              {...register('BrandId', { required: 'Select one option' })}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value=''></option>
              {isLoadingGetAllBrands ? <option disabled>Loading...</option> : <BrandsListSelect brands={brands} />}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        {/* error Brand */}
        {errors.BrandId && (
          <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
            <span className='font-medium'>Oops!</span> {errors.BrandId.message}
          </p>
        )}
        <div className='mb-[15px]'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Name
          </label>
          <input
            {...register('name', { required: 'Invalid value', validate: isValidName })}
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Product'
          />
          {errors.name && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.name.message}
            </p>
          )}
        </div>
        <div className='mb-[15px]'>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Price
          </label>
          <input
            {...register('price', { required: 'Invalid value', validate: isValidPrice })}
            type='text'
            id='first_name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='$500'
          />
          {errors.price && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.price.message}
            </p>
          )}
        </div>
        <div className='mb-[15px]'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900'
            htmlFor='file_input'
          >
            Upload file
          </label>
          <input
            {...register('img', { required: 'Invalid value' })}
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none '
            id='file_input'
            type='file'
          />
          {errors.img && (
            <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>Oops!</span> {errors.img.message}
            </p>
          )}
        </div>
        <hr className='h-px my-8 bg-gray-200 border-0'></hr>
        <div>
          <h3 className='mb-[15px] text-sm font-medium text-gray-900'>Product Details</h3>
          <ProductProperties />
        </div>
      </div>
      <hr className='h-px my-8 bg-gray-200 border-0'></hr>
      <button
        type='submit'
        disabled={isLoadingForm || isLoadingCreateProduct}
        className='focus:outline-none disabled:cursor-not-allowed disabled:bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-700 bg-indigo-600 rounded text-white px-8 py-2 text-sm'
      >
        {isLoadingForm || isLoadingCreateProduct ? (
          <SpinnerButton
            colorBg='bg-indigo-600'
            colorSpinner='bg-gray-50'
          />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}

export default ProductsForm
