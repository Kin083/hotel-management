import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import classNames from "classnames/bind";
import styles from "./Report.module.css";

const cx = classNames.bind(styles);
const TableToPDF = ({dataRevenue}) => {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        exportPDF();
    }, [dataRevenue]);

    const exportPDF = () => {
        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';
        const marginLeft = 40;

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = 'Báo cáo Doanh thu';
        const headers = [['Tháng', 'Doanh thu(USD)']];
        const tmpArr = dataRevenue.slice(1);
    
        const body = tmpArr.map((row) => [row[0], row[1]]);

        const content = {
            startY: 50,
            head: headers,
            body,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        const pdfBlob = doc.output('blob');
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfBlobUrl);

    };
    return (
        <div>
            <div className={cx("pdf-container")}>
                {pdfUrl && <iframe src={pdfUrl} style={{ width: '100% ', height: '100%' }} />}
            </div>
        </div>
    );

}

export default TableToPDF;
