import React, { useState } from 'react'
import './Menubar.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets';

const Menubar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="menubar">
      <ul className="menubar-menu">
        <a href="/main" onClick={() => setMenu("home")} className={menu === "home" ? "active nav" : "nav"}>Phòng</a>
        <a href="/main/#about" onClick={() => setMenu("menu")} className={menu === "about" ? "active nav" : "nav"}>Đặt phòng</a>
        <a href="/main/#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active nav" : "nav"}>Báo cáo</a>
      </ul>
    </div>
  )
}

export default Menubar
