import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import logo from '../../assets/images/logo.png'
import product from '../../assets/images/product.svg'
import category from '../../assets/images/category.svg'
import information from '../../assets/images/информация.svg'
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
          <a href="#" className="menu__link">Товары</a>
          <img src={product} alt="" />
        </li>
        <li className="menu__list-item">
          <a href="#require" className="menu__link">добавить</a>
          <img src={brands} alt="" />
        </li>
        <li className="menu__list-item">
          <a href="#require" className="menu__link">добавить</a>
          <img src={category} alt="" />
        </li>
        <li className="menu__list-item">
          <a href="#" className="menu__link">добавить</a>
          <img src={information} alt="" />
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
