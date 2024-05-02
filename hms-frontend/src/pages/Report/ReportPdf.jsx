import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { dataRevenue } from "./ReportContent";
const TableToPDF = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        exportPDF();
    }, []);

    const exportPDF = () => {
        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';
        const marginLeft = 40;

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = 'Báo cáo Doanh thu';
        const headers = [['Ngày', 'Doanh thu(USD)']];
        const body = dataRevenue.map((row) => [row[0], row[1]]);

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
            <div className='pdf-container'>
                {pdfUrl && <iframe src={pdfUrl} style={{ width: '100% ', height: '100%' }} />}
            </div>
        </div>
    );

}

export default TableToPDF;
