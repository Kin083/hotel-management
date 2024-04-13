import { Routes, Route, } from 'react-router-dom'

import Header from './components1/Header'
import NavBar from './components1/NavBar'
import Content from './components1/Content'

import OverviewPage from './pages/Overview'
import ReportPage from './pages/Report'
import RoomPage from './pages/Room'
import StaffPage from './pages/Staff'
import TransactionPage from './pages/Transaction'

function App1() {
    return (
        <>
            <Header />
            <NavBar />
            <Content />

            <Routes>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/room" element={<RoomPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
            </Routes>
        </>
    )
}

export default App1