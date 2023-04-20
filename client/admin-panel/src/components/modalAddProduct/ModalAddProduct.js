import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/useHttp'
import { productAdd, modalToggle } from '../../actions/index'
import './modalAddProduct.scss'

// prettier-ignore
const ModalAddProduct = () => {
  const { request } = useHttp()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const modal = useRef(null)
  const exit = useRef(null)

  const { modalStatus } = useSelector((state) => state)
  
  const handleSubmit = (e) => {
  
    e.preventDefault()
    const newProduct = {
      name,
      image: '',
      description,
      category,
      price,
      id: uuidv4(),
    }

    request(
      'http://localhost:3001/products',
      'POST',
      JSON.stringify(newProduct)
    )
      .then((res) => console.log(res, 'Отправка успешна'))
      .then(dispatch(productAdd(newProduct)))
      .catch((err) => console.log(err))

    setName('')
    setImage('')
    setDescription('')
    setCategory('')
    setPrice('')
  }

  const hidden = () => {
    dispatch(modalToggle())
    console.log(modalStatus)
  }

  return (
    <div 
    className={modalStatus ? 'modal' : 'modal hiiden'} 
    ref={modal}
    onClick={(e) => {
      if(e.target === modal.current || e.target === exit.current) {
        hidden()
      }
    }}>  
      <div 
      className='modal__exit'>
        <FontAwesomeIcon
          icon={solid('xmark')}
          className='modal__exit-icon'
          style={{ color: '#ffc200' }}
          ref={exit}
        />
      </div>
      <div className='modal__content'
      onClick={e => e.stopPropagation()}>
        <div className='modal__header'>
          <h2>Добавление товара</h2>
        </div>
        <div className='modal__body'>
          <form onSubmit={handleSubmit}>
            <div className='modal__body-group'>
              <label htmlFor='name'>Название товара:</label>
              <input
                type='text'
                id='name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='modal__body-group'>
              <label htmlFor='photo'>Фотография товара:</label>
              <input
                type='file'
                id='photo'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className='modal__body-group'>
              <label htmlFor='description'>Описание товара:</label>
              <input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></input>
            </div>
            <div className='modal__body-group'>
              <label htmlFor='category'>Категория товара:</label>
              <input
                type='text'
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className='modal__body-group'>
              <label htmlFor='price'>Цена товара:</label>
              <input
                type='text'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="btn__block">
            <button type='submit' className='modal__body-group-btn'>Добавить товар</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAddProduct
