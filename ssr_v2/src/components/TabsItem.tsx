'use client'

import { useActionCreators, useAppSelector } from '@/hooks/redux'
import { userActions } from '@/redux/reducers/UserSlice'
import { ITab } from '@/types'

interface ITabProps {
  tab: ITab
  value: 'brand' | 'category'
}

const TabsItem = ({ tab, value }: ITabProps) => {
  // dispatch
  const actionsUser = useActionCreators(userActions)
  // state redux
  const tabBrandId = useAppSelector((state) => state.user.tabBrandId)
  const tabCategoryId = useAppSelector((state) => state.user.tabCategoryId)

  const clickHandlerTab = (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    switch (value) {
      case 'category':
        actionsUser.setTabCategoryId(tab.id)
        break

      case 'brand':
        actionsUser.setTabBrandId(tab.id)
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
