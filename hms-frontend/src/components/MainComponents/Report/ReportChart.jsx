import React from "react";
import { Chart } from "react-google-charts";
import classNames from "classnames/bind";
import styles from "./Report.module.css";

const cx = classNames.bind(styles);
import { dataRoom } from "./ReportContent";
import { dataRevenue } from "./ReportContent";
import { parse } from 'date-fns';
import { isWithinInterval } from 'date-fns';

const optionRevenue = {
    title: "Doanh thu trong tháng",
    hAxis: { title: "Ngày", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    titleTextStyle: { fontSize: 16, bold: true, textAlign: "center", color: "#007bff" }
};
const optionRoomBooking = {
    title: "Tiền đặt phòng",
    hAxis: { title: "Ngày", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    titleTextStyle: { fontSize: 16, bold: true, textAlign: "center", color: "#007bff" }
}

export function RevenueReportChart({ selectedDateRange }) {

    const filteredData = dataRevenue.filter((row) => {
        const date = row[0];
        const dateObject = parse(date, "dd/MM/yyyy", new Date()); // Chuyển đổi thành đối tượng ngày
        console.log(dateObject);
        console.log(selectedDateRange.startDate)
        // Kiểm tra xem ngày có nằm trong khoảng thời gian đã chọn không
        return isWithinInterval(dateObject, {
            start: selectedDateRange.startDate,
            end: selectedDateRange.endDate,

        });
    });
    console.log(filteredData);
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


