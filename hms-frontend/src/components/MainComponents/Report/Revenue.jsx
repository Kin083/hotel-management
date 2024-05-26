import { RevenueReportContent } from "./ReportContent";
import { RevenueReportSideBar } from "./ReportSideBar";
import MainHeader from "../MainNavbar/MainNavbar";
import MainNavbar from "../MainHeader/MainHeader";
import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Report.module.css";
import userApi from "../../../api/userApi";

const cx = classNames.bind(styles);

import { useState } from "react";
function Revenue() {
    const [typeSelected, setTypeSelected] = useState("report-chart");
    const [dataRevenue, setDataRevenue] = useState();

    const handleTypeSelected = (type) => {
        setTypeSelected(type);
    }

    const [selectedYear, setSelectedYear] = useState("2024");

    useEffect(() => {
        const fetchRevenue = async () => {
          const revenues = await userApi.getRevenue(selectedYear);
          console.log(revenues);
          console.log("aaa");
      
          const arr = revenues.map((data, index) => [index+1, data, "#3366CC"]);
          console.log(arr);
          
           const arrTmp = [["Month", "Revenue(USD)", { role: "style" }], ...arr];
           console.log(arrTmp);
           setDataRevenue(arrTmp);
        };
        fetchRevenue();
      }, [selectedYear]);

    return (
        <>
            <MainNavbar />
            <MainHeader />

            <div className={cx("container")}>

                <div className={cx("inner")}>
                    <RevenueReportSideBar
                        onDisplayTypeSelected={handleTypeSelected}
                        year={selectedYear}
                        onYearSelected={setSelectedYear}
                    />
                    <RevenueReportContent selectedDisplayType={typeSelected}
                        dataRevenue={dataRevenue}
                        year={selectedYear}
                    />

                </div>
            </div>
        </>
    );
}

export default Revenue;