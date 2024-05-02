
import OverView from '../pages/OverView/OverView.jsx'
import Report from '../pages/Report/Report.jsx'
import Room from '../pages/Room/Room.jsx'
import Staff from '../pages/Staff/Staff.jsx'
import Transaction from '../pages/Transaction/Transaction.jsx'
import Revenue from '../pages/Report/Revenue.jsx'
import RoomBooking from '../pages/Report/RoomBooking.jsx'
// Public Routes - Don't need sign in but user can see it.
const publicRoutes = [

]

// Private Routes - Having to sign in to see it.
const privateRoutes = [
    { path: '/', component: OverView },
    { path: '/report', component: Report },
    { path: '/room', component: Room },
    { path: '/staff', component: Staff },
    { path: '/transaction', component: Transaction },
    { path: '/revenue', component: Revenue },
    { path: '/roombookingreport', component: RoomBooking }

]

export { publicRoutes, privateRoutes }