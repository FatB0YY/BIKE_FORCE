import Menu from '../menu/Menu'
import ListProducts from '../listProducts/ListProducts'
import ModalAddProduct from '../modalAddProduct/ModalAddProduct'
import { useState } from 'react'
import './app.scss'

const App = () => {
  const [modalS, setModalS] = useState(false)
  return (
    <>
      <ModalAddProduct
        active={modalS}
        setModalS={setModalS}
      />
      <div className='app'>
        <Menu />

        <main className='main'>
          <ListProducts setModalS={setModalS} />
        </main>
      </div>
    </>
  )
}

export default App
