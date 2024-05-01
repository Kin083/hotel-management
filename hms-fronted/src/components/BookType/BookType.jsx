import React from 'react'
import './BookType.css'
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { BsXLg } from "react-icons/bs";

const BookType = ({ setShowBookType, setShowBookRoom }) => {

  const type_list = [
    {
      type: "single",
      contain: "1",
      available: "2",
      price: 100
    },
    {
      type: "double",
      contain: "2",
      available: "3",
      price: 200
    },
    {
      type: "super double",
      contain: "4",
      available: "2",
      price: 300
    },
  ]

  const [timein, changeTimein] = useState(new Date());
  const [timeout, changeTimeout] = useState(new Date());
  const [roomNum, setRoomNum] = useState(0);

  return (
    <div className="booktype-container">
      <div className='booktype'>
      <BsXLg onClick={()=>setShowBookType(false)} size={30} className="booktype-exit" />
      <h3>Chọn phòng</h3>
  
        <div className='time-interval'>
          Giờ đặt
        <DateTimePicker format="dd-MM-y h:mm:ss a" onChange={changeTimein} value={timein} />
        đến
        <DateTimePicker format="dd-MM-y h:mm:ss a" onChange={changeTimeout} value={timeout} />
        {Math.round((timeout-timein)/3600000)} tiếng
        </div>
        {/* <input type="text" placeholder='Ten khach hang' required /> */}
        <table>
          <tr id="type-header">
            <th>Hang phong</th>
            <th>Suc chua</th>
            <th>Con trong</th>
            <th>So phong dat</th>
            <th>Gia</th>
          </tr>
          {type_list.map(item => {
            return (
              <tr>
               <td>{item.type}</td>
               <td>{item.contain}</td>
               <td>{item.available}</td>
               <td><input type="number" onChange={(e)=>setRoomNum(e.target.value)} value={roomNum} /></td>
                <td>${item.price}</td>
              </tr>
            )
          })}
        </table>
        <div className="submit-container">
            <button onClick={()=>setShowBookType(false)}>Huy bo</button>
            <button onClick={()=> {setShowBookType(false); setShowBookRoom(true)}} className="accept-button">Xac nhan</button>
        </div>
      </div>
    </div>
  )
}

export default BookType
