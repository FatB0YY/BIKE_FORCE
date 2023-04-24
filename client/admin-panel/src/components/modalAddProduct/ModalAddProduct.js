import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/useHttp'
import { productAdd, modalToggle } from '../../actions/index'
import './modalAddProduct.scss'

// prettier-ignore
const ModalAddProduct = ({boolCategory = false, boolBrand = false}) => {
  const { request } = useHttp()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [countPropertys, setCountPropertys] = useState([])
  const [nameModal, setNameModal] = useState('добавить товар')

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

  const renderPropertys = (id) => {
    console.log(id)
    return (
      <div className="modal__body-group-property" key={id}>
        <input type="text" placeholder="Введите название" />
        <input type="text" placeholder="Введите описание" />
        <button onClick={() => handleRemoveProperty(id)}>Удалить</button>
      </div>
    );
  };
  
  const handleClick = () => {
    const newCountPropertys = [...countPropertys, renderPropertys(uuidv4())];
    setCountPropertys(newCountPropertys);
  };
  
  const handleRemoveProperty = (id) => {
    const updatedProperties = countPropertys.filter((property) => property.key !== id);
    setCountPropertys(updatedProperties);
  };
  // const data = {email: 'admin@mail.ru', password: '12345678'}
  // fetch('http://localhost:4000/api/user/login', {method: 'POST', body: JSON.stringify(data), headers: {
  //   'Content-type': 'application/json; charset=UTF-8',
  // },}).then(res => res.json).then(data => console.log(data))

  // const data = {email: 'admin@mail.ru', password: '12345678'}
  // fetch('http://localhost:4000/api/user/users', {method: 'GET', headers: {
  //   'Content-type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpZCI6MSwiYmFuUmVhc29uIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNCYW4iOmZhbHNlLCJpYXQiOjE2ODIyODAyNzUsImV4cCI6MTY4MjI4MTE3NX0.wgdxN_DpL4F6L2uobaV_V8VaOdu8Q-Mu3SAYcrzqRYA'
  // },}).then(res => res.json).then(data => console.log(data))

  // const data = {email: 'admin@mail.ru', password: '12345678'}
  // fetch('http://localhost:4000/api/user/login', {method: 'POST', body: JSON.stringify(data), headers: {
  //   'Content-type': 'application/json; charset=UTF-8',
  // },}).then(res => res.json()).then(data => console.log(data))
  useEffect(() => {
    console.log(countPropertys)
  },[countPropertys])

  const placeholderProp = () => {
    if(boolCategory) {
      setNameModal('Добавить категорию')
    } else if(boolBrand) {
      setNameModal('Добавить бренд')
    } 
  }

  useEffect(() => {
    placeholderProp()
  },[])

  const view = () => {
    if(boolBrand || boolCategory) {
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
              <h2>{nameModal}</h2>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmit}>
                <div className='modal__body-group'>
                  <input
                    type='text'
                    id={nameModal}
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`Введите название`}
                  />
                </div>
                <div className="btn__block">
                  <button type='submit' className='modal__body-group-btn'>{nameModal}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
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
              <h2>Добавить {nameModal}</h2>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmit}>
                <div className='modal__body-group'>
                  <input
                    type='text'
                    id={nameModal}
                    value={nameModal}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`Введите название ${nameModal}`}
                  />
                </div>
                <div className='modal__body-group'>
                  <input
                    type='file'
                    id='photo'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className='modal__body-group'>
                  {/* <input
                    type='text'
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  /> */}
                       {/* <select>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                    <option value="grape">Grape</option>
                </select> */}
                <button className='modal__body-group-btn_descr'onClick={handleClick}>Добавить свойство</button>
                {countPropertys}
                </div>
                <div className='modal__body-group'>
                  <input
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='modal__body-group'>
                  <input
                    type='text'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Введите стоимость товара'
                  />
                </div>
                <div className="btn__block">
                <button type='submit' className='modal__body-group-btn'>{nameModal}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

  const viewRender = view()

  return (
    <div>
      {viewRender}
    </div>
  )
}



export default ModalAddProduct
