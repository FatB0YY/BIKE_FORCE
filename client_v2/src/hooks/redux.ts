import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [])
}
