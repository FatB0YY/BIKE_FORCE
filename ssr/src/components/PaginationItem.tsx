import React from 'react'

interface IPropsPaginationItem {
  item: string | number
}

const PaginationItem = ({ item }: IPropsPaginationItem) => {
  return (
    <a
      href='#'
      className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
    >
      {item}
    </a>
  )
}

export default PaginationItem
