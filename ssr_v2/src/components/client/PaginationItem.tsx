'use client'

import { useActionCreators } from '@/hooks/redux'
import { userActions } from '@/redux/slices/UserSlice'
import React from 'react'

interface IPropsPaginationItem {
  active: boolean
  page: number
}

const PaginationItem = ({ page, active }: IPropsPaginationItem) => {
  // dispatch
  const actionsUser = useActionCreators(userActions)

  const clickPageHandler = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    actionsUser.setPage(page)
  }

  if (active) {
    return (
      <a
        onClick={(event) => clickPageHandler(event)}
        href='#'
        aria-current='page'
        className='relative z-10 inline-flex items-center bg-[#F5E6E0] px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
