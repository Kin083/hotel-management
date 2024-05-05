import { RevenueReportChart } from "./ReportChart"
import { RoomBookingReportChart } from "./ReportChart";
import TableToPDF from "./ReportPdf"

export const dataRevenue = [
    ["Ngày", "Doanh thu(USD)", { role: "style" }],
    ["12/05/2024", 250, "#3366CC"],
    ["15/05/2024", 110, "#3366CC"],
    ["28/05/2024", 120, "#3366CC"],
    ["30/05/2024", 590, "#3366CC"],
];


export const dataRoom = [
    ["Ngày", "Tiền đặt phòng", { role: "style" }],
    ["12", 180, "#3366CC"],
    ["15", 70, "#3366CC"],
    ["28", 120, "#3366CC"],
    ["30", 500, "#3366CC"]
]

export function RevenueReportContent({ selectedDisplayType, selectedDateRange }) {
    return (
        <>
            {selectedDisplayType === 'report-chart' && <RevenueReportChart selectedDateRange={selectedDateRange} />}
            {selectedDisplayType === 'report-pdf' && <TableToPDF />}
        </>
    )
}

export function RoomBookingReportContent({ selectedDisplayType }) {
    return (
        <>
            {selectedDisplayType === 'report-chart' && <RoomBookingReportChart />}
            {selectedDisplayType === 'report-pdf' && <TableToPDF />}
        </>
    )
}