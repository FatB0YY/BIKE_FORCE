import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brand, solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  productAdd,
  modalToggle,
  brandsAdd,
  categoriesAdd,
  getAllUsers,
  setUserRoleForValid,
} from '../../actions/index'
import CategoryService from '../../services/CategoryService'
import BrandsService from '../../services/BrandsService'
import ProductService from '../../services/ProductService'
import UserService from '../../services/UserService'
import './modalAddProduct.scss'
import RolesService from '../../services/RolesService'

const ModalAddProduct = () => {
  const { boolCategory, boolBrand, boolUsers } = useSelector(
    (state) => state.boolPage
  )
  const {
    modalStatus,
    category,
    brand,
    roles,
    validMessage,
    userRoleForValid,
    userRoleId,
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [info, setInfo] = useState([])
  const [propName, setPropName] = useState('')
  const [propDesr, setPropDesr] = useState('')
  const [categories, setCategories] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')
  const [BrandId, setBrandId] = useState(null)
  const [CategoryId, setCategoryId] = useState(null)
  const [properties, setProperties] = useState([])
  const [nameModal, setNameModal] = useState('добавить товар')
  const [userRole, setUserRole] = useState('')

  const modal = useRef(null)
  const exit = useRef(null)
  const iconPath = useRef(null)
  const indexProp = useRef(properties.length + 1)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    const newInfo = info.map((item) => {
      return {
        title: item.name,
        description: item.description,
      }
    })

    formData.append('name', name)
    formData.append('price', price)
    formData.append('BrandId', BrandId)
    formData.append('CategoryId', CategoryId)
    formData.append('info', JSON.stringify(newInfo))
    formData.append('img', image)
    formData.append('count', 100)
    const res = ProductService.postProduct(formData)
    dispatch(productAdd(res))

    setName('')
    setImage('')
    setInfo('')
    setCategories('')
    setPrice('')
  }

  const fetchGet = async () => {
    const resCategories = await CategoryService.getCategory()
    resCategories.forEach((category) => dispatch(categoriesAdd(category)))

    const resBrands = await BrandsService.getBrands()
    resBrands.forEach((brand) => dispatch(brandsAdd(brand)))

    const resProducts = await ProductService.getProducts()
    resProducts.forEach((product) => dispatch(productAdd(product)))
  }
  useEffect(() => {
    fetchGet()
  }, [])

  useEffect(() => {
    if (boolCategory) {
      setNameModal('Категория')
    } else if (boolBrand) {
      setNameModal('Бренд')
    }
  }, [boolCategory, boolBrand])

  useEffect(() => {
    if (propName && propDesr) {
      const newInfo = {
        id: indexProp.current++,
        name: propName,
        description: propDesr,
      }
      setInfo((prevInfo) => [...prevInfo, newInfo])
      setPropName(null)
      setPropDesr(null)
    }
  }, [propName, propDesr])

  const handleSubmitBrandOrCaterory = async (e) => {
    e.preventDefault()
    if (boolCategory) {
      const response = await CategoryService.postCategory(name)
      dispatch(categoriesAdd(response.data))
    } else if (boolBrand) {
      const response = await BrandsService.postBrands(name)
      dispatch(brandsAdd(response.data))
    } else if (boolUsers) {
      const roleUser = await RolesService.getOneRol(userRoleForValid)
      console.log(userRoleId)
      const response = await RolesService.addUserRoles(userRoleId, [roleUser])
    }
    setName('')
  }

  const hidden = () => {
    dispatch(modalToggle())
  }

  function handleAddProperty(e) {
    e.preventDefault()
    const newId = properties.length + 1
    setProperties([...properties, { id: newId }])
  }

  function handleRemoveProperty(id) {
    setProperties(properties.filter((property) => property.id !== id))
    setInfo(info.filter((prop) => prop.id !== id))
  }

  const viewCategory = (page) => {
    if (page && page.length > 0) {
      return page.map((item) => {
        if (item.isActive || item.description) {
          if (userRoleForValid === item.value) {
            return null
          }
          const view = () => {
            if (boolUsers) {
              return (
                <option
                  key={item.id}
                  value={item.name}
                  data-key={item.value}
                >
                  {item.name || item.description}
                </option>
              )
            } else {
              return (
                <option
                  key={item.id}
                  value={item.name}
                  data-key={item.id}
                >
                  {item.name || item.description}
                </option>
              )
            }
          }
          return view()
        }
      })
    } else {
      return null
    }
  }

  const handleSelectChange = (e, page) => {
    if (page === 'brand') {
      setBrandId(
        e.target.options[e.target.selectedIndex].getAttribute('data-key')
      )
    } else if (page === 'category') {
      setCategoryId(
        e.target.options[e.target.selectedIndex].getAttribute('data-key')
      )
    } else if (page === 'roles') {
      dispatch(
        setUserRoleForValid(
          e.target.options[e.target.selectedIndex].getAttribute('data-key')
        )
      )
    }
  }

  const view = () => {
    if (boolBrand || boolCategory) {
      return (
        <div
          className={modalStatus ? 'modal' : 'modal hiiden'}
          ref={modal}
          onClick={(e) => {
            if (
              e.target === modal.current ||
              e.target.parentNode === exit.current ||
              e.target.parentNode === iconPath.current
            ) {
              hidden()
            }
          }}
        >
          <div className='modal__content'>
            <div className='modal__header'>
              <h2>{nameModal}</h2>
              <div
                className='modal__exit'
                ref={exit}
              >
                <FontAwesomeIcon
                  icon={solid('xmark')}
                  className='modal__exit-icon'
                  style={{ color: '#000000' }}
                  ref={iconPath}
                />
              </div>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmitBrandOrCaterory}>
                <div className='modal__body-group'>
                  <input
                    type='text'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`Введите название`}
                  />
                </div>
                <div className='btn__block'>
                  <button
                    type='submit'
                    className='modal__body-group-btn'
                  >
                    Добавить {nameModal === 'brand' ? 'бренд' : 'категорию'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    } else if (boolUsers) {
      return (
        <div
          className={modalStatus ? 'modal' : 'modal hiiden'}
          ref={modal}
          onClick={(e) => {
            if (
              e.target === modal.current ||
              e.target.parentNode === exit.current ||
              e.target.parentNode === iconPath.current
            ) {
              hidden()
            }
          }}
        >
          <div className='modal__content'>
            <div className='modal__header'>
              <h2>Роль</h2>
              <div
                className='modal__exit'
                ref={exit}
              >
                <FontAwesomeIcon
                  icon={solid('xmark')}
                  className='modal__exit-icon'
                  style={{ color: '#000000' }}
                  ref={iconPath}
                />
              </div>
            </div>
            <div className='modal__body'>
              <form onSubmit={handleSubmitBrandOrCaterory}>
                <div className='modal__body-group-select'>
                  <select
                    defaultValue=''
                    onChange={(e) => handleSelectChange(e, 'roles')}
                  >
                    <option
                      value=''
                      disabled
                    >
                      Выберите роль
                    </option>
                    {viewCategory(roles)}
                  </select>
                </div>
                <div className='modal__message'>
                  {validMessage ? validMessage : null}
                </div>
                <div className='btn__block'>
                  <button
                    type='submit'
                    className='modal__body-group-btn'
                  >
                    Добавить роль
                  </button>
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
            if (
              e.target === modal.current ||
              e.target.parentNode === exit.current ||
              e.target.parentNode === iconPath.current
            ) {
              hidden()
            }
          }}
        >
          <div className='modal__content'>
            <div className='modal__header'>
              <h2>Товар</h2>
              <div
                className='modal__exit'
                ref={exit}
              >
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
                <div className='modal__body-group-select'>
                  <select
                    defaultValue=''
                    onChange={(e) => handleSelectChange(e, 'category')}
                  >
                    <option
                      value=''
                      disabled
                    >
                      Выберите категорию
                    </option>
                    {viewCategory(category)}
                  </select>
                </div>
                <div className='modal__body-group-select'>
                  <select
                    defaultValue=''
                    onChange={(e) => handleSelectChange(e, 'brand')}
                  >
                    <option
                      value=''
                      disabled
                    >
                      Выберите бренд
                    </option>
                    {viewCategory(brand)}
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
                  <button onClick={(e) => handleAddProperty(e)}>
                    Добавить свойство
                  </button>
                </div>
                <div className='modal__body-group-props'>
                  {properties.map((property) => (
                    <div
                      className='modal__body-group-property'
                      key={property.id}
                      id={property.id}
                    >
                      <input
                        type='text'
                        placeholder='Введите название'
                        onBlur={(e) => setPropName(e.target.value)}
                      />
                      <input
                        type='text'
                        placeholder='Введите описание'
                        onBlur={(e) => setPropDesr(e.target.value)}
                      />
                      <button onClick={() => handleRemoveProperty(property.id)}>
                        Удалить
                      </button>
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
                <div className='modal__body-group'>
                  <input
                    type='text'
                    id='count'
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder='Введите количество товара'
                  />
                </div>
                <div className='btn__block'>
                  <button
                    type='submit'
                    className='modal__body-group-btn'
                  >
                    {nameModal}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

  const viewRender = view()

  return <div>{viewRender}</div>
}

export default ModalAddProduct
