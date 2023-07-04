import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { selectCurrentUser } from '../redux/slices/AuthSlice'
import { useGetRoleByNameQuery, useLazyGetCurrentUserRolesQuery } from '../service/RolesAPI'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectCurrentUser)
  const { isLoading: isLoadingGetRoleByNameQuery, data: role = null } = useGetRoleByNameQuery('ADMIN')
  const [trigger, { isLoading: isLoadingGetCurrentUserRolesQuery, data: roles }] = useLazyGetCurrentUserRolesQuery()

  useEffect(() => {
    // Проверяем, есть ли пользователь в хранилище
    if (!user) {
      navigate('/signin', { state: { from: location }, replace: true })
    } else {
      // Получаем роли пользователя
      trigger(user.id)
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }
  }, [user, trigger])

  useEffect(() => {
    if (role) {
      if (roles) {
        const isAdmin = roles?.includes(role)
        // Проверяем, является ли пользователь админом
        if (!isLoadingGetRoleByNameQuery && role !== null && !isAdmin) {
          navigate('/forbidden', { state: { from: location }, replace: true })
        }
      }
    }
  }, [isLoadingGetRoleByNameQuery, role])

  if (isLoadingGetCurrentUserRolesQuery || isLoadingGetRoleByNameQuery) {
    // Показываем загрузочный индикатор, пока выполняется запрос ролей
    return <div>Loading...</div>
  }

  return children
}

export default RequireAuth
