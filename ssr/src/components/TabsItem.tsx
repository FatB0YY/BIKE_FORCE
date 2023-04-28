import React from 'react'

const TabsItem = ({ tabs }: any) => {
  return (
    <li className='mr-2'>
      <a
        href='#'
        className='inline-block p-4 text-[#F5E6E0] transition-all border-b-2 border-[#F5E6E0] rounded-t-lg active'
        aria-current='page'
      >
        {tabs}
      </a>
    </li>
  )
}

export default TabsItem

{
  /* <li className='mr-2'>
<a
  href='#'
  className='inline-block p-4 border-b-2 transition-all border-transparent rounded-t-lg hover:text-[#F5E6E0] hover:border-[#F5E6E0]'
>
  Profile
</a>
</li>
<li className='mr-2'>
<a
  href='#'
  className='inline-block p-4 text-[#F5E6E0] transition-all border-b-2 border-[#F5E6E0] rounded-t-lg active'
  aria-current='page'
>
  Dashboard
</a>
</li> */
}
