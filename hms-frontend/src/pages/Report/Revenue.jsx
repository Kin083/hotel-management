import { RevenueReportContent } from "./ReportContent";
import { RevenueReportSideBar } from "./ReportSideBar";
import './Report.css'
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
            <RevenueReportSideBar
                onDisplayTypeSelected={handleTypeSelected}
                onDateRangeSelected={setSelectedDateRange}
            />
            <RevenueReportContent selectedDisplayType={typeSelected}
                selectedDateRange={selectedDateRange}
            />

        </>
    );
}

export default Revenue;
