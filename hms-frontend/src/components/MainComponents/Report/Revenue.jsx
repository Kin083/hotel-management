import { RevenueReportContent } from "./ReportContent";
import { RevenueReportSideBar } from "./ReportSideBar";
import MainHeader from "../MainNavbar/MainNavbar";
import MainNavbar from "../MainHeader/MainHeader";

import classNames from "classnames/bind";
import styles from "./Report.module.css";

const cx = classNames.bind(styles);

import { useState } from "react";
function Revenue() {
    const [typeSelected, setTypeSelected] = useState("report-chart");
    const handleTypeSelected = (type) => {
        setTypeSelected(type);
    }
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    return (
        <>
            <MainNavbar />
            <MainHeader />

            <div className={cx("container")}>

                <div className={cx("inner")}>
                    <RevenueReportSideBar
                        onDisplayTypeSelected={handleTypeSelected}
                        onDateRangeSelected={setSelectedDateRange}
                    />
                    <RevenueReportContent selectedDisplayType={typeSelected}
                        selectedDateRange={selectedDateRange}
                    />

                </div>
            </div>
        </>
    );
}

export default Revenue;
