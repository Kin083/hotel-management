import React from 'react'
import './Booking.css'


const Booking = ({ setShowBookType }) => {
  return (
    <div>
      <div className="booking">
        <button onClick={()=>setShowBookType(true)}>Đặt phòng</button>
      </div>
    </div>
  )
}

export default Booking
