import React from 'react'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// setIsOpen(!)
const Header = () => {
  return (
    <header>
      <div>Header</div>
      <div
        onClick={() => {}}
        className='cursor-pointer flex relative '
      >
        <FontAwesomeIcon
          className='text-2xl'
          icon={faBagShopping}
        />
      </div>
    </header>
  )
}

export default Header
