import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
        <Link to="/"><img src="" alt="" className="logo" />Transylvania</Link>
        <div className="navbar-right">
            <ul className="navbar-menu">
                <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active nav":"nav"}>Home</Link>
                <a href="/#about" onClick={()=>setMenu("menu")} className={menu==="about"?"active nav":"nav"}>About</a>
                <a href="/#footer" onClick={()=>setMenu("contact")} className={menu==="contact"?"active nav":"nav"}>Contact</a>
            </ul>
            <Link to="/login"><button>Sign In</button></Link>
        </div>
        
    </div>
  )
}

export default Navbar
