import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL } from '../../hooks/useHttp'
import { setUser, setLoading } from '../../actions'
import UserService from '../../services/UserService'

import { getAllUsers } from '../../actions'

import ProductPage from '../../pages/productPage'
import BrandPage from '../../pages/brandPage'
import CategoryPage from '../../pages/categoryPage'
import RegistrationForm from '../registrationForm/registrationForm'
import AuthorizationForm from '../authorizationForm/authorizationForm'
import ModalAddProduct from '../modalAddProduct/ModalAddProduct'
import AddUsers from '../listUsers/ListUsers'
import Menu from '../menu/Menu'

import './app.scss'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [modalS, setModalS] = useState(false)

  const chetAut = async () => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(`${API_URL}/user/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
    } catch (e) {
      console.log('ошибка рефреш: ', e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      chetAut()
    }
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const resUsers = await UserService.getUsers()
      resUsers.forEach((user) => dispatch(getAllUsers(user)))
    }
    fetchUsers()
  }, [])

  return (
    <div className='app'>
      {location.pathname !== '/' && location.pathname !== '/registration' ? (
        <Menu />
      ) : null}
      <main className='main'>
        <ModalAddProduct
          active={modalS}
          setModalS={setModalS}
        />
        <Routes>
          <Route
            path='/'
            element={<AuthorizationForm />}
          />
          <Route
            path='/product'
            element={<ProductPage />}
          />
          <Route
            path='/brand'
            element={<BrandPage />}
          />
          <Route
            path='/category'
            element={<CategoryPage />}
          />
          <Route
            path='/registration'
            element={<RegistrationForm />}
          />
          <Route
            path='/users'
            element={<AddUsers />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
