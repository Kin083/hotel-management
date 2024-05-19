import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MainHeader.module.css";
import userApi from "../../../api/userApi";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const MainHeader = ({session}) => {
  const navigate = useNavigate();
  const userName = session ? session.Username : ' ';
  const role = session ? session.Role : ' ';
  const sessionId = session ? session.SessionId : ' ';
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async(e) => {
    e.preventDefault();
        try {
            const response = await userApi.getLogout({sessionId ,userName, role });
            alert("Đăng xuất thành công");
            navigate(response);
        } catch (error) {
            alert("Đăng xuất không thành công");
            console.error("Đăng xuất không thành công", error);
        }
  }
  useEffect(() => {
    window.addEventListener('unload', handleLogout);
    return () => {
      window.removeEventListener('unload', handleLogout);
    };
  }, []);
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <a href="/" className={cx("logo")}>
          {/* <img src="hms-frontend\src\assets\transylvania_logo.png" alt="Transylvania" title="Transylvania" /> */}
          logo
        </a>

        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            {userName}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 }}>BM</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            // PaperProps
            slotProps={{
              elevation: 1,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="medium" />
              </ListItemIcon>
              Account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="medium" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
    </header>
  );
};

export default MainHeader;
