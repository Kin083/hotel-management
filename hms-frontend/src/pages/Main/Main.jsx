
import classNames from "classnames/bind";
import styles from "./Main.module.css";

const cx = classNames.bind(styles);
import MainNavbar from "../../components/MainComponents/MainNavbar/MainNavbar";
import MainHeader from "../../components/MainComponents/MainHeader/MainHeader";
import Room from "../../components/MainComponents/Room/Room";
import Revenue from "../../components/MainComponents/Report/Revenue";
import RoomBooking from "../../components/MainComponents/Report/RoomBooking";

const Main = () => {
  return (
    <div>
      <MainHeader />
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
