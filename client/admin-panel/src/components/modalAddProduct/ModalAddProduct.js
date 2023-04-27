import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productAdd, modalToggle, brandsAdd, categoriesAdd } from '../../actions/index'
import './modalAddProduct.scss'

// prettier-ignore
const ModalAddProduct = () => {

  const {boolCategory, boolBrand} = useSelector(state => state.boolPage)
  const { modalStatus } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [properties, setProperties] = useState([]);
  const [nameModal, setNameModal] = useState('добавить товар')

  const modal = useRef(null)
  const exit = useRef(null)
  const iconPath = useRef(null);
  const iconSvg = useRef(null);
  
  const handleSubmit = (e) => {
  
    e.preventDefault()
    const newProduct = {
      name,
      image: '',
      description,
      category,
      price,
    }

    setName('')
    setImage('')
    setDescription('')
    setCategory('')
    setPrice('')
  }

  const handleSubmitBrandOrCaterory = (e) => {
    e.preventDefault()
    const newProduct = {
      name,
  }
 /*    if(boolCategory) {
      request('http://localhost:4000/api/category/','POST',JSON.stringify(newProduct),  {
          'Content-type': 'application/json; charset=UTF-8', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpZCI6MSwiYmFuUmVhc29uIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNCYW4iOmZhbHNlLCJpYXQiOjE2ODIzMzE0ODIsImV4cCI6MTY4MjMzMjM4Mn0.QCdX2coc0jipedZnR_0uZDla-rtiAPT3TuvUSp-60t4'
        })
        request('http://localhost:4000/api/category/','GET', null, {
          'Content-type': 'application/json; charset=UTF-8', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpZCI6MSwiYmFuUmVhc29uIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNCYW4iOmZhbHNlLCJpYXQiOjE2ODIzMzE0ODIsImV4cCI6MTY4MjMzMjM4Mn0.QCdX2coc0jipedZnR_0uZDla-rtiAPT3TuvUSp-60t4'
        }).then(data => dispatch(categoriesAdd(data))).catch(e => console.log(e))

    } else if(boolBrand) {
      request('http://localhost:4000/api/brand/','POST',JSON.stringify(newProduct),  {
        'Content-type': 'application/json; charset=UTF-8', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpZCI6MSwiYmFuUmVhc29uIjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNCYW4iOmZhbHNlLCJpYXQiOjE2ODIzMzE0ODIsImV4cCI6MTY4MjMzMjM4Mn0.QCdX2coc0jipedZnR_0uZDla-rtiAPT3TuvUSp-60t4'
      })
    } */
    
    setName('')
}

  const hidden = () => {
    dispatch(modalToggle())
  }
  
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

  function handleAddProperty(e) {
    e.preventDefault();
    const newId = properties.length + 1;
    setProperties([...properties, { id: newId }]);
  }

  function handleRemoveProperty(id) {
    setProperties(properties.filter((property) => property.id !== id));
  }

  useEffect(() => {
    if(boolCategory) {
      setNameModal('Категория')
    } else if(boolBrand) {
      setNameModal('Бренд')
    } 
  },[boolCategory, boolBrand])
    
  const view = () => {
    if(boolBrand || boolCategory) {
      return (
        <div 
        className={modalStatus ? 'modal' : 'modal hiiden'} 
        ref={modal}
        onClick={(e) => {
          if(e.target === modal.current || e.target.parentNode === exit.current || e.target.parentNode === iconPath.current) {
            hidden()
          }
        }}>  
          <div className='modal__content'
            onClick={e => e.stopPropagation()}>
            <div className='modal__header'>
              <h2>{nameModal}</h2>
              <div 
          className='modal__exit'  ref={exit}>
            <FontAwesomeIcon
              icon={solid('xmark')}
              className='modal__exit-icon'
              style={{ color: '#ffc200' }}
              ref={iconPath}
            />
          </div>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmitBrandOrCaterory}>
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
                  <button type='submit' className='modal__body-group-btn'>Добавить {nameModal}</button>
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
          if(e.target === modal.current || e.target.parentNode === exit.current || e.target.parentNode === iconPath.current) {
            hidden()
          }
        }}>  
          <div className='modal__content'>
            <div className='modal__header'>
              <h2>Товар</h2>
              <div className='modal__exit' ref={exit}>
                <FontAwesomeIcon
                  icon={solid('xmark')}
                  className='modal__exit-icon'
                  style={{ color: '#000000' }}
                  ref={iconPath}
                />
            </div>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmit}>
              <div className="modal__body-group-select">
                  <select>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                    <option value="grape">Grape</option>
                  </select>
                  </div> 
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
                <div className='modal__body-group-img'>
                  <input
                    type='file'
                    id='photo'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className='modal__body-group-btn_prop'>
                  <button onClick={(e) => handleAddProperty(e)}>Добавить свойство</button>
                </div>
                <div className='modal__body-group-props'>
               {properties.map((property) => (
                  <div className="modal__body-group-property" key={property.id} id={property.id}>
                    <input type="text" placeholder="Введите название" />
                    <input type="text" placeholder="Введите описание" />
                    <button onClick={() => handleRemoveProperty(property.id)}>Удалить</button>
                  </div>
                ))}
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
