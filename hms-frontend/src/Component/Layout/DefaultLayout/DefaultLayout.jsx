import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.css";

import Header from "./Header";
import Navbar from "./Navbar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Navbar />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
