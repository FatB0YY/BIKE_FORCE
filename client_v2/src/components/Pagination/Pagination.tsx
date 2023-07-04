import React from 'react'
import PaginationItem from './PaginationItem'
import { useAppSelector } from '../../hooks/redux'

const Pagination = () => {
  const { totalCount, page, limit } = useAppSelector((state) => state.product)
  const pageCount = Math.ceil(totalCount / limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6'>
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
