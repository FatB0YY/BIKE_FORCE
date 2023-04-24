import { Link, NavLink } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import product from '../../assets/images/product.svg'
import category from '../../assets/images/category.svg'
import brands from '../../assets/images/brands.svg'

import './menu.scss'

// prettier-ignore
const Menu = () => {
  return (
<div className="sideBar">
    <div className="sideBar__logo">
        <img src={logo} alt="" />
    </div>
    <nav className='menu'>   
      <ul className="menu__list">
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffffff' : 'inherit'} )} to="/" className="menu__link">товары</NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffffff' : 'inherit'} )} to="/brands" className="menu__link">бренды</NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink style={({isActive}) => ({color : isActive ? '#ffffff' : 'inherit'} )} to="/categories" className="menu__link">категории</NavLink>
        </li>
      </ul>
    </nav>
   {/*  <div className='sideBar__exit'>
        <FontAwesomeIcon
          icon={solid('arrow-right-from-bracket')}
          style={{ color: '#ffc200' }}
        />
    </div> */}
</div>
  
  )
}

export default Menu
