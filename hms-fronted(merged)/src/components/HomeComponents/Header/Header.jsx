import React from 'react'
import './Header.css'
import { assets } from '../../../assets/assets'

const Header = () => {
  return (
    <div className="header">
        <img src={assets.header_img} alt="" />
      <div className="header-contents">
        <h2>Hotel Management System</h2>
        <p>HMS helps you manage your hotel more easily and effectively</p>
        <button>Get started</button>
      </div>
    </div>
  )
}

export default Header
