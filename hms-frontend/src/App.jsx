import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";

import Revenue from "./components/MainComponents/Report/Revenue";
import RoomBooking from "./components/MainComponents/Report/RoomBooking";

const App = () => {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/room" element={<Main />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/roombooking-report" element={<RoomBooking />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
