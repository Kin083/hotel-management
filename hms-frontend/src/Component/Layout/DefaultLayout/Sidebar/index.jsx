import classNames from "classnames/bind";
import styles from "./Sidebar.module.css";

const cx = classNames.bind(styles);

function Sidebar() {
    return ( 
        <aside className={cx('wrapper')}>
            <h2>Side Bar</h2>
        </aside>
     );
}

export default Sidebar;