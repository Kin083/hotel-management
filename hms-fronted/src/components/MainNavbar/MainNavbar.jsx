import React, { useState } from 'react'
import './MainNavbar.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets';

const MainNavbar = () => {
    const [menu, setMenu] = useState("home");

  return (
    <div className="main-navbar">
        <Link to="/"><img src="" alt="" className="logo" />Transylvania</Link>
        <div className="main-navbar-right">
            Hoang Dang Khai<button>Sign In</button>
        </div>
        
    </div>
  )
}

export default MainNavbar
