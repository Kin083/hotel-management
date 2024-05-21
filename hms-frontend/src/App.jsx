import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";

import Revenue from "./components/MainComponents/Report/Revenue";
import RoomBooking from "./components/MainComponents/Report/RoomBooking";
import Verification from "./pages/Login/Verification";
import { useState } from "react";
const App = () => {
  const [session, setSession] = useState();

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login session={session} setSession={setSession}/>} />
          <Route path="/main" element={<Main session={session} />} />
          {/* <Route path="/room" element={<Main />} /> */}
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/roombooking-report" element={<RoomBooking />} />
          <Route path="/verification" element={<Verification />} />

        </Routes>
      </div>
    </>
  );
};

export default App;
