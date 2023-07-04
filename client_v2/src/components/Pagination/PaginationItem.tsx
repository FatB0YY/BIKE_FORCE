import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { setPage } from '../../redux/slices/ProductsSlice'

interface IPropsPaginationItem {
  active: boolean
  page: number
}

const PaginationItem = ({ page, active }: IPropsPaginationItem) => {
  const dispatch = useAppDispatch()

  const clickPageHandler = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    dispatch(setPage(page))
  }

  if (active) {
    return (
      <a
        onClick={(event) => clickPageHandler(event)}
        href='#'
        aria-current='page'
        className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-gray-50 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        {page}
      </a>
    )
  } else {
    return (
      <a
        onClick={(event) => clickPageHandler(event)}
        href='#'
        className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
      >
        {page}
      </a>
    )
  }
}

export default PaginationItem
