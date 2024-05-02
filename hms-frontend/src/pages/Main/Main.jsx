import "./Main.css";
import MainNavbar from "../../components/MainComponents/MainNavbar/MainNavbar";
import MainHeader from "../../components/MainComponents/MainHeader/MainHeader";
import Room from "../../components/MainComponents/Room/Room";

const Main = () => {
  return (
    <div>
      <MainHeader />
      <MainNavbar />
      <div className="container">
        <Room />
      </div>
    </div>
  );
};

export default Main;
