import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useValidation } from '../../hooks/useValidation'

import AuthService from '../../services/AuthService'
import RolesService from '../../services/RolesService'
import { errorTextInput } from '../../hooks/useValidation'
import { setAuthMenu, setUser, toggleForm } from '../../actions'

import './authorizationForm.scss'

const AuthorizationForm = () => {
  const { valid } = useValidation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState({})
  const [errorBool, setErrorBool] = useState(false)

  const refEmail = useRef()
  const refPassword = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (event, state) => {
    state(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setAuthMenu(true))
      dispatch(setUser(response.data.user))
      //const userRoles = await RolesService.getUserRoles(response.data.user.id)
      //if (userRoles.value === 'ADMIN') {
      navigate('/product')
      // } else {
      //   navigate('/&')
      // }
    } catch (e) {
      console.log('Ошибка при авторизации:', e.response)
      setErrorText(valid(refEmail, refPassword, e.response.data))
      setErrorBool(true)
    }
  }
  return (
    <div className='authorization-overlay'>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className='form__wraper'>
          <h2>Вход</h2>
          <div className='form__wraper-input'>
            <input
              type='email'
              ref={refEmail}
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              placeholder='Почта'
            />
            {errorBool ? errorTextInput('email', errorText) : null}
          </div>
          <div className='form__wraper-input'>
            <input
              type='password'
              ref={refPassword}
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
              placeholder='Пароль'
            />
            {errorBool ? errorTextInput('password', errorText) : null}
          </div>
          <div className='form__wraper-btn-sigin'>
            <button onClick={() => login(email, password)}>Войти</button>
          </div>
          <div className='form__wraper-btn-registraton'>
            <div>
              <span>Еще не зарегистрирован?</span>
            </div>
            <div>
              <a href='/registration'>регистрация</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AuthorizationForm
