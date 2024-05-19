
import classNames from "classnames/bind";
import styles from "./Main.module.css";
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
import MainNavbar from "../../components/MainComponents/MainNavbar/MainNavbar";
import MainHeader from "../../components/MainComponents/MainHeader/MainHeader";
import Room from "../../components/MainComponents/Room/Room";
import userApi from "../../api/userApi";
import { useState, useEffect } from "react";
// import Revenue from "../../components/MainComponents/Report/Revenue";
// import RoomBooking from "../../components/MainComponents/Report/RoomBooking";

const Main = ({ session }) => {
  const userName = session ? session.Username : ' ';
  const role = session ? session.Role : ' ';
  const sessionId = session ? session.SessionId : ' ';
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await userApi.getHome({sessionId, userName, role});
        if (response === '/main') {
          console.log('Session verified successfully');
        } else {
          console.log('Session verification failed, redirecting to login');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        navigate('/login');
      }
    };

    if (session) {
      verifySession();
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <div>
      <MainHeader session={session}/>
      <MainNavbar />

      <div className={cx("container")}>
        {/* <Room /> */}
        <div className={cx("inner")}>
          <Room />
        </div>

      </div>
    </div>
  );
};

export default Main;
