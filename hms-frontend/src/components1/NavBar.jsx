import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/overview">Overview</Link>
                </li>
                <li>
                    <Link to="/report">Report</Link>
                </li>
                <li>
                    <Link to="/room">Room</Link>
                </li>
                <li>
                    <Link to="/staff">Staff</Link>
                </li>
                <li>
                    <Link to="/transaction">Transaction</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
