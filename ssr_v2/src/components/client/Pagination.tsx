'use client'

import React from 'react'
import PaginationItem from './PaginationItem'
import { useAppSelector } from '@/hooks/redux'

const Pagination = () => {
  // state redux
  const totalCount = useAppSelector((state) => state.user.totalCount)
  const page = useAppSelector((state) => state.user.page)

  const pageCount = Math.ceil(totalCount / Number(process.env.LIMIT_PRODUCT_ON_LIST)!)

  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-center'>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <div>
              {pages.map((item) => (
                <PaginationItem
                  key={item}
                  active={page === item}
                  page={item}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
