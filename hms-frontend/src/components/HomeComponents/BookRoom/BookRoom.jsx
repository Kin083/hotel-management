import React from 'react'
import './BookRoom.css'
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { BsXLg } from "react-icons/bs";

const BookRoom = ({ setShowBookRoom }) => {

  const type_list = [
    {
      type: "single",
      room: [101, 102, 103, 104],
      price: 100
    },
    {
        type: "double",
        room: [201, 202, 203],
        price: 200
    },
    {
        type: "super double",
        room: [301, 302],
        price: 300
    },
  ]

  const room_list = [
    {
      type: "single",
      num: "101",
      price: 100
    },
    {
      type: "single",
      num: "102",
      price: 100
    },
    {
      type: "double",
      num: "201",
      price: 200
    },
    {
      type: "double",
      num: "202",
      price: 200
    },
    {
      type: "single",
      num: "103",
      price: 100
    },
    {
      type: "single",
      num: "301",
      price: 100
    },
  ]

  const [timein, changeTimein] = useState(new Date());
  const [timeout, changeTimeout] = useState(new Date());
  const [roomNum, setRoomNum] = useState(0);

  return (
    <div className="bookroom-container">
      <div className='bookroom'>
      <BsXLg onClick={()=>setShowBookRoom(false)} size={30} className="bookroom-exit" />
      <h3>Đặt phòng</h3> book room
  
        <div className='time-interval'>
          Giờ đặt
        <DateTimePicker format="dd-MM-y h:mm:ss a" onChange={changeTimein} value={timein} />
        đến
        <DateTimePicker format="dd-MM-y h:mm:ss a" onChange={changeTimeout} value={timeout} />
        {Math.round((timeout-timein)/3600000)} tiếng
        </div>
        <input type="text" placeholder='Ten khach hang' required />
        <table>
          <tr id="type-header">
            <th>Hang phong</th>
            <th>Phong</th>
            <th>Time in</th>
            <th>Tra phong</th>
            <th>Gia</th>
            <th>Time</th>
            <th>Thanh tien</th>
          </tr>
          {type_list.map(item => {
            return (
              <tr>
               <td>{item.type}</td>
               <td>{item.room}</td>
               <td>{}</td>
               <td>{}</td>
               <td>${item.price}</td>
               <td>{}</td>
               <td></td>
              </tr>
            )
          })}
        </table>
        <div className="submit-container">
            <button onClick={()=>setShowBookRoom(false)}>Huy bo</button>
            <button className="accept-button">Xac nhan</button>
        </div>
      </div>
    </div>
  )
}

export default BookRoom
