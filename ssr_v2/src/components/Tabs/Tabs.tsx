import TabsItem from './TabsItem'
import { ITab } from '@/types'

interface IPropTabs {
  tabs: ITab[]
  value: 'brand' | 'category'
}

//  !! баг при изменении масштаба !!

const Tabs = ({ tabs, value }: IPropTabs) => {
  if (!tabs) {
    return <div className='display-none'></div>
  }

  return (
    <div className='container mx-auto mt-10'>
      <div className='text-sm font-medium text-center text-gray-500 border-b'>
        <ul className='flex flex-wrap -mb-px'>
          {tabs.map((tab: ITab) => (
            <TabsItem
              key={tab.id}
              tab={tab}
              value={value}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tabs
