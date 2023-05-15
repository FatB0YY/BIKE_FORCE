import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import AuthService from '../../services/AuthService'

import { toggleBoolPage, setUser, setAuthMenu } from '../../actions'

import logo from '../../assets/images/logo.png'

import './menu.scss'

const Menu = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      dispatch(setAuthMenu(false))
      dispatch(setUser({}))
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  return (
    <div className='sideBar'>
      <div className='sideBar__logo'>
        <img
          src={logo}
          alt=''
        />
      </div>
      <nav className='menu'>
        <ul className='menu__list'>
          <li className='menu__list-item'>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#ffc200' : 'inherit',
              })}
              to='/product'
              className='menu__link'
              onClick={() =>
                dispatch(
                  toggleBoolPage({
                    boolCategory: false,
                    boolBrand: false,
                    boolUsers: false,
                  })
                )
              }
            >
              товары
            </NavLink>
          </li>
          <li className='menu__list-item'>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#ffc200' : 'inherit',
              })}
              to='/brand'
              className='menu__link'
              onClick={() =>
                dispatch(
                  toggleBoolPage({
                    boolCategory: false,
                    boolBrand: true,
                    boolUsers: false,
                  })
                )
              }
            >
              бренды
            </NavLink>
          </li>
          <li className='menu__list-item'>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#ffc200' : 'inherit',
              })}
              to='/category'
              className='menu__link'
              onClick={() =>
                dispatch(
                  toggleBoolPage({
                    boolCategory: true,
                    boolBrand: false,
                    boolUsers: false,
                  })
                )
              }
            >
              категории
            </NavLink>
          </li>
          <li className='menu__list-item'>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#ffc200' : 'inherit',
              })}
              to='/users'
              className='menu__link'
              onClick={() =>
                dispatch(
                  toggleBoolPage({
                    boolCategory: false,
                    boolBrand: false,
                    boolUsers: true,
                  })
                )
              }
            >
              пользователи
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='sideBar__exit'>
        <NavLink
          to='/'
          onClick={() => logout()}
        >
          <div
            className='sideBar__exit-text'
            onClick={() =>
              dispatch(
                toggleBoolPage({
                  boolCategory: false,
                  boolBrand: false,
                  boolUsers: false,
                })
              )
            }
          >
            Выйти
          </div>
          <FontAwesomeIcon icon={solid('arrow-right-from-bracket')} />
        </NavLink>
      </div>
    </div>
  )
}

export default Menu
