import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

import { API_URL } from '../../hooks/useHttp';
import { setAuth, setUser, setLoading } from '../../actions'

import MainPage from '../../pages/mainPage'
import BrandPage from '../../pages/brandPage'
import CategoryPage from '../../pages/categoryPage'

import AuthorizationForm from '../authorizationForm/authorizationForm';
import ModalAddProduct from '../modalAddProduct/ModalAddProduct'
import Menu from '../menu/Menu'

import './app.scss'
import RegistrationForm from '../registrationForm/registrationForm';

const App = () => {

  const {isAuth, toggleForm} = useSelector(state => state);
  const [modalS, setModalS] = useState(false)

  const chetAut = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true});
      console.log('рефреш: ',response);
      localStorage.setItem('token', response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    } catch(e) {
      console.log('ошибка рефреш: ',e.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      chetAut();
    }
  })

  return (
    <Router>
      <div className='app'>
      {isAuth ? <Menu /> : null}
        <main className='main'>
        <ModalAddProduct active={modalS} setModalS={setModalS}/>
        <Routes>
          <Route path='/' element={<AuthorizationForm/>}/>
          <Route path='/products' element={<MainPage/>}/>
          <Route path='/brands' element={<BrandPage/>}/>
          <Route path='/categories' element={<CategoryPage/>}/>
          <Route path='/registration' element={<RegistrationForm/>}/>
        </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
