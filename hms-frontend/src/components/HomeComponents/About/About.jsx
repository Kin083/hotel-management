import './About.css'
import { assets } from '../../../assets/assets'

const About = () => {
  return (
    <div class="about-container" id="about">
        <h1>About HMS</h1>
      <div className="subsection">
        <img src={assets.section_img} alt="" />
        <div className="info">
            <h3>Calculate room rates by hour and date accurately</h3>
            <p>The software automatically calculates room rates by the hour and additional products and services when customers check out, helping cashiers save time and limit errors and confusion. Simple interface, easy to use for all departments from reception, housekeeping, cashier...</p>
        </div>
      </div>
      <div className="subsection">
        <div className="info">
            <h3>Mangage rooms effectively</h3>
            <p>Monitor the number of available rooms, rooms in use, rooms booked, and rooms about to be returned. From there, the hotel can schedule reservations, clean and welcome customers appropriately. Avoid confusion that makes customers uncomfortable.</p>
        </div>
        <img src={assets.section_img} alt="" />
      </div>
      <div className="subsection">
        <img src={assets.section_img} alt="" />
        <div className="info">
            <h3>Fast payment, minimizing loss</h3>
            <p>Supports payment via methods such as QR code scanning, cash, bank transfer, card swiping. All employee actions are clearly stored and can be easily looked up when needed.</p>
        </div>
      </div>
      <div className="subsection">
        <div className="info">
            <h3>Outstanding revenue, remote management</h3>
            <p>HMS can be used on all devices such as computers, phones, tablets. Centrally manage multiple branches on one account. Helps you easily monitor hotel business activities remotely, in real time.</p>
        </div>
        <img src={assets.section_img} alt="" />
      </div>
    </div>
  )
}

export default About
