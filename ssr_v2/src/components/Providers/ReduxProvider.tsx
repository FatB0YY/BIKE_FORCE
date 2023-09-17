'use client'

import { Provider } from 'react-redux'
import { setupStore } from '@/redux/store'
const store = setupStore()

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
