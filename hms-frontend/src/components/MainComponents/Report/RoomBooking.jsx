import { RoomBookingReportContent } from "./ReportContent";
import { RoomBookingReportSideBar } from "./ReportSideBar";

import { useState } from "react";
import MainHeader from "../MainNavbar/MainNavbar";
import MainNavbar from "../MainHeader/MainHeader";
import classNames from "classnames/bind";
import styles from "./Report.module.css";

const cx = classNames.bind(styles);
function RoomBooking() {
  const [typeSelected, setTypeSelected] = useState("report-chart");
  const handleTypeSelected = (type) => {
    setTypeSelected(type);
  };
  return (
    <>
      <MainNavbar />
      <MainHeader />
      <div className={cx("container")}>
        <div className={cx("inner")}>
          <RoomBookingReportSideBar
            onDisplayTypeSelected={handleTypeSelected}
          />
          <RoomBookingReportContent selectedDisplayType={typeSelected} />
        </div>
      </div>
    </>
  );
}

export default RoomBooking;
