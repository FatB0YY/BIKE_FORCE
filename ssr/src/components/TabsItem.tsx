import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setTabBrandId, setTabCategoryId } from '@/redux/reducers/UserSlice'
import { ITab } from '@/types'
import React from 'react'

interface ITabProps {
  tab: ITab
  value: 'brand' | 'category'
}

const TabsItem = ({ tab, value }: ITabProps) => {
  const dispatch = useAppDispatch()
  const { tabBrandId, tabCategoryId } = useAppSelector((state) => state.UserReducer)

  const clickHandlerTab = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    switch (value) {
      case 'category':
        dispatch(setTabCategoryId(tab.id))
        break

      case 'brand':
        dispatch(setTabBrandId(tab.id))
        break
    }
  }

  if (tab.id === tabBrandId && value === 'brand') {
    return (
      <li
        className='mr-2'
        onClick={(event) => clickHandlerTab(event)}
      >
        <a
          href='#'
          className='inline-block p-4 text-[#F5E6E0] transition-all border-b-2 border-[#F5E6E0] rounded-t-lg active'
          aria-current='page'
        >
          {tab.name}
        </a>
      </li>
    )
  }

  if (tab.id === tabCategoryId && value === 'category') {
    return (
      <li
        className='mr-2'
        onClick={(event) => clickHandlerTab(event)}
      >
        <a
          href='#'
          className='inline-block p-4 text-[#F5E6E0] transition-all border-b-2 border-[#F5E6E0] rounded-t-lg active'
          aria-current='page'
        >
          {tab.name}
        </a>
      </li>
    )
  }

  return (
    <li
      className='mr-2'
      onClick={(event) => clickHandlerTab(event)}
    >
      <a
        href='#'
        className='inline-block p-4 border-b-2 transition-all border-transparent rounded-t-lg hover:text-[#F5E6E0] hover:border-[#F5E6E0]'
      >
        {tab.name}
      </a>
    </li>
  )
}

export default TabsItem
