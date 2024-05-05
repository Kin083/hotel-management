import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className="navbar">
        <Link to="/"><img src="" alt="" className="logo" />Transylvania</Link>
        <div className="navbar-right">
            <ul className="navbar-menu">
                <Link to="/" className="nav">Home</Link>
                <a href="/#about" className="nav">About</a>
                <a href="/#footer" className="nav">Contact</a>
            </ul>
            <Link to="/login"><button>Sign In</button></Link>
        </div>
        
    </div>
  )
}

export default Navbar
