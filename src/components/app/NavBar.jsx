import React from 'react'
import { logo_sidebar } from '../../assets'

const NavBar = () => {
  return (
    <div className='software_navbar'>
      <div className="logo">
        <img src={logo_sidebar} alt="" />
      </div>
    </div>
  )
}

export default NavBar