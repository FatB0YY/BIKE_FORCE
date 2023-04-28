import React from 'react'
import TabsItem from './TabsItem'

const Tabs = ({ items }: any) => {
  if (!items) {
    return <div className='display-none'></div>
  }

  return (
    <div className='container mx-auto mt-10'>
      <div className='text-sm font-medium text-center text-gray-500 border-b'>
        <ul className='flex flex-wrap -mb-px'>
          {items.map((item: any) => (
            <TabsItem item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tabs
