import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AuthService from '../../services/AuthService'
import { setAutMenu, setUser } from '../../actions'
import { useValidation } from '../../hooks/useValidation'
import { errorTextInput } from '../../hooks/useValidation'
import RolesService from '../../services/RolesService'

const RegistrationForm = () => {
  const { roles } = useSelector((state) => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { valid } = useValidation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState({})
  const [errorBool, setErrorBool] = useState(false)

  const refEmail = useRef()
  const refPassword = useRef()

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const registration = async (email, password) => {
    try {
      const roleUser = await RolesService.getOneRol('USER')
      const response = await AuthService.registration(
        email.toLowerCase(),
        password,
        [roleUser]
      )
      localStorage.setItem('token', response.data.accessToken)
      navigate('/')
    } catch (e) {
      console.log('Ошибка при авторизации:', e.response.data)
      setErrorText(valid(refEmail, refPassword, e.response.data))
      setErrorBool(true)
    }
  }
  return (
    <div className='authorization-overlay'>
      <form
        action=''
        onSubmit={handleSubmit}
        className='form'
      >
        <div className='form__wraper'>
          <h2>Регистрация</h2>
          <div className='form__wraper-input'>
            <input
              type='email'
              ref={refEmail}
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder='Почта'
            />
            {errorBool ? errorTextInput('email', errorText) : null}
          </div>
          <div className='form__wraper-input'>
            <input
              type='password'
              ref={refPassword}
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              placeholder='Пароль'
            />
            {errorBool ? errorTextInput('password', errorText) : null}
          </div>
          <div className='form__wraper-btn-sigin'>
            <button
              type='submit'
              onClick={() => registration(email, password)}
            >
              Зарегистрироваться
            </button>
          </div>
          <div className='form__wraper-btn-registraton'>
            <div>
              <span>Eсть аккаунт?</span>
            </div>
            <div>
              <a href='/'>войдите</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
