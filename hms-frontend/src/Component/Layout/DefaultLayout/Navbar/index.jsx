import classNames from "classnames/bind";
import styles from "./Navbar.module.css"

const cx = classNames.bind(styles);

function Navbar() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                
            </div>
        </div>
     );
}

export default Navbar;