
import OverView from '../pages/OverView/index.jsx'
import Report from '../pages/Report'
import Room from '../pages/Room'
import Staff from '../pages/Staff'
import Transaction from '../pages/Transaction'

// Public Routes - Don't need sign in but user can see it.
const publicRoutes = [

]

// Private Routes - Having to sign in to see it.
const privateRoutes = [
    { path: '/', component: OverView },
    { path: '/report', component: Report },
    { path: '/room', component: Room },
    { path: '/staff', component: Staff },
    { path: '/transaction', component: Transaction }

]

export { publicRoutes, privateRoutes }