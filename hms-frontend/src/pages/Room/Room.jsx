import RoomSideBar from "./RoomSideBar";
import RoomContent from "./RoomContent";

import classNames from "classnames/bind";
import styles from "./Room.module.css";
import { useState } from "react";
const cx = classNames.bind(styles);

function Room() {
  const [typeSelected, setTypeSelected] = useState(null);

  const handleTypeSelected = (type) => {
    setTypeSelected(type);
  };

  const [statusSelected, setStatusSelected] = useState(null);

  const handleStatusSelected = (status) => {
    setStatusSelected(status);
  };
  return (
    <>
      <div className={cx("container")}>
        <RoomSideBar
          onTypeSelected={handleTypeSelected}
          onStatusSelected={handleStatusSelected}
        />
        <RoomContent selectedType={typeSelected} selectedStatus={statusSelected} />
      </div>
    </>
  );
}

export default Room;
