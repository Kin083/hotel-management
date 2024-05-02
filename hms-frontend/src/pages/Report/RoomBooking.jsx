import { RoomBookingReportContent } from "./ReportContent";
import { RoomBookingReportSideBar } from "./ReportSideBar";
import './Report.css'
import { useState } from "react";
function RoomBooking() {
    const [typeSelected, setTypeSelected] = useState("report-chart");
    const handleTypeSelected = (type) => {
        setTypeSelected(type);
    }
    return (
        <>
            <RoomBookingReportSideBar
                onDisplayTypeSelected={handleTypeSelected}
            />
            <RoomBookingReportContent selectedDisplayType={typeSelected}
            />

        </>
    );
}

export default RoomBooking;
