import React from 'react'
import './Main.css'
import MainNavbar from '../../components/MainNavbar/MainNavbar'
import Menubar from '../../components/Menubar/Menubar'
import Booking from '../../components/Booking/Booking'
import { useState } from 'react'
import BookType from '../../components/BookType/BookType'
import BookRoom from '../../components/BookRoom/BookRoom'

const Main = () => {
    const [showBookType, setShowBookType] = useState(false);
    const [showBookRoom, setShowBookRoom] = useState(false);
  return (
    <div>
        {showBookType===true?<BookType setShowBookType={setShowBookType} setShowBookRoom={setShowBookRoom} />:<></> }
        {showBookRoom===true?<BookRoom setShowBookRoom={setShowBookRoom} />:<></> }
      <MainNavbar />
      <Menubar />
      <Booking setShowBookType={setShowBookType} />
    </div>
  )
}

export default Main
