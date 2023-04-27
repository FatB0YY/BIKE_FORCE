import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import AuthService from '../../services/AuthService'

import { toggleBoolPage, setAuth, setUser } from '../../actions'

import logo from '../../assets/images/logo.png'

import './menu.scss'

// prettier-ignore
const Menu = () => {

  const dispatch = useDispatch();

  const logout = async () => {
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(setUser({}));
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

  return (
<div className="sideBar">
    <div className="sideBar__logo">
        <img src={logo} alt="" />
    </div>
    <nav className='menu'>   
      <ul className="menu__list">
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffc200' : 'inherit'} )} to="/products" className="menu__link" onClick={() => dispatch(toggleBoolPage({boolCategory: false, boolBrand: false}))}>товары</NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffc200' : 'inherit'} )} to="/brands" className="menu__link" onClick={() => dispatch(toggleBoolPage({boolCategory: false, boolBrand: true}))}>бренды</NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffc200' : 'inherit'} )} to="/categories" className="menu__link" onClick={() => dispatch(toggleBoolPage({boolCategory: true, boolBrand: false}))}>категории</NavLink>
        </li>
      </ul>
    </nav>
    <div className='sideBar__exit'>
    <NavLink to="/" onClick={() => logout()}> 
      <div className="sideBar__exit-text">
        Выйти
      </div>
        <FontAwesomeIcon icon={solid('arrow-right-from-bracket')}/>          
      </NavLink>
    </div>  
</div>
  
  )
}

export default Menu
