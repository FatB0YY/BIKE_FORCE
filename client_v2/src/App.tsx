import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLazyCheckAuthQuery } from './service/AuthAPI'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/404'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import RequireAuth from './hoc/RequireAuth'
import Layout from './pages/Layout'
import ProductsItem from './pages/ProductsItem'
import ProductsPage from './pages/ProductsPage'
import RolesPage from './pages/RolesPage'
import UsersPage from './pages/UsersPage'
import CategoriesPage from './pages/CategoriesPage'
import BrandsPage from './pages/BrandsPage'
import Forbidden from './pages/Forbidden'
import UsersDragRole from './pages/UsersDragRole'

export default function App() {
  const hasAccessToken = Boolean(Cookies.get('accessToken')) // Проверяем наличие accessToken в cookie
  const [trigger, { isFetching, isLoading }] = useLazyCheckAuthQuery()

  useEffect(() => {
    if (hasAccessToken) {
      trigger()
        .unwrap()
        .catch((error) => {
          console.error(error)
          // Обработка ошибки
        })
    }
  }, [hasAccessToken])

  if (isFetching || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route
        path='/signin'
        element={<LoginPage />}
      />
      <Route
        path='/signup'
        element={<RegistrationPage />}
      />

      <Route
        path='/forbidden'
        element={<Forbidden />}
      />

      <Route
        path='/'
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route
          path='/'
          index
          element={<AdminPanel />}
        />

        <Route
          path='products'
          element={<ProductsPage />}
        />

        <Route
          path='brands'
          element={<BrandsPage />}
        />

        <Route
          path='categories'
          element={<CategoriesPage />}
        />

        <Route
          path='users'
          element={<UsersPage />}
        />

        <Route
          path='roles'
          element={<RolesPage />}
        />

        <Route
          path='products/:id'
          element={<ProductsItem />}
        />

        <Route
          path='users/:userId'
          element={<UsersDragRole />}
        />
      </Route>

      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  )
}
