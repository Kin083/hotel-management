import React from "react";
import { Chart } from "react-google-charts";
import classNames from "classnames/bind";
import styles from "./Report.module.css";

const cx = classNames.bind(styles);
import { dataRoom } from "./ReportContent";

const months= [1,2,3,4,5,6,7,8,9,10,11,12];
const optionRevenue = {
    
    title: "Doanh thu trong tháng",
    hAxis: { title: "Tháng", titleTextStyle: { color: "#333" }, minValue: 0, ticks: months },
    vAxis: { minValue: 0, maxValue: 5000 },
    titleTextStyle: { fontSize: 16, bold: true, textAlign: "center", color: "#007bff" }
};
const optionRoomBooking = {
    title: "Tiền đặt phòng",
    hAxis: { title: "Ngày", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    titleTextStyle: { fontSize: 16, bold: true, textAlign: "center", color: "#007bff" }
}

export function RevenueReportChart({ selectedDateRange, dataRevenue, year }) {

    console.log(dataRevenue);

    return (
        <div className={cx("chart-container")}>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={dataRevenue}
                options={optionRevenue}
            />
        </div>
    );
}

export function RoomBookingReportChart() {
    return (
        <div className={cx("chart-container")}>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={dataRoom}
                options={optionRoomBooking}
            />
        </div>
    );
}