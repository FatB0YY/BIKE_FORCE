import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'

import Menu from '../menu/Menu'
import ModalAddProduct from '../modalAddProduct/ModalAddProduct'
import './app.scss'

import MainPage from '../../pages/mainPage'
import BrandPage from '../../pages/brandPage'
import CategoryPage from '../../pages/categoryPage'

const App = () => {

  const [modalS, setModalS] = useState(false)

  return (
    <Router>
      <div className='app'>
        <Menu /> 
        <main className='main'>
        <ModalAddProduct active={modalS} setModalS={setModalS}/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/brands' element={<BrandPage/>}/>
          <Route path='/categories' element={<CategoryPage/>}/>
        </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
