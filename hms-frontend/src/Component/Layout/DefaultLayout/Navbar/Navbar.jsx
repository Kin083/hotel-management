import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.css";
const cx = classNames.bind(styles);
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BedIcon from "@mui/icons-material/Bed";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import DescriptionIcon from "@mui/icons-material/Description";
import Person3Icon from "@mui/icons-material/Person3";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";
import Settings from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#01C38D",
    },
    white: {
      main: "#FFFFFF",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#FFFFFF",
    },
  },
});

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.primary.main,
    boxShadow: `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const BUTTON_LIST = [
  {
    id: "overview-button",
    href: "/",
    text: "OverView",
    icon: <VisibilityIcon />,
  },
  {
    id: "room-button",
    href: "/room",
    text: "Room",
    icon: <NightShelterIcon />,
  },
  {
    id: "transaction-button",
    text: "Transaction",
    icon: <PaidIcon />,
  },
  {
    id: "staff-button",
    text: "Staff",
    icon: <Person3Icon />,
  },
  {
    id: "report-button",
    text: "Report",
    icon: <AssessmentIcon />,
  },
];

function Navbar() {
  const [transactionAnchorEl, setTransactionAnchorEl] = useState(null);
  const [staffAnchorEl, setStaffAnchorEl] = useState(null);
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleTransactionClick = (event) => {
    setTransactionAnchorEl(event.currentTarget);
  };

  const handleStaffClick = (event) => {
    setStaffAnchorEl(event.currentTarget);
  };

  const handleReportClick = (event) => {
    setReportAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTransactionAnchorEl(null);
    setStaffAnchorEl(null);
    setReportAnchorEl(null);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <ThemeProvider theme={theme}>
          <Stack direction="row" sx={{ height: "100%", }}>
            {BUTTON_LIST.map((button) => (
              <Button
                key={button.text}
                href={button.href}
                color="white"
                size="large"
                startIcon={button.icon}
                sx={{
                  width: 200,
                  "&:hover": {
                    bgcolor: "#3B8665", // Đặt màu nền khi hover
                  },
                }}
                onClick={
                  button.id === "transaction-button"
                    ? handleTransactionClick
                    : button.id === "staff-button"
                      ? handleStaffClick
                      : button.id === "report-button"
                        ? handleReportClick
                        : null
                }
              >
                {button.text}
              </Button>
            ))}

            {/* Transaction Menu */}
            <StyledMenu
              id="transaction-menu"
              MenuListProps={{
                "aria-labelledby": "transaction-button",
              }}
              anchorEl={transactionAnchorEl}
              open={Boolean(transactionAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <BedIcon />
                Room Booking
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <DescriptionIcon />
                Receipt
              </MenuItem>
            </StyledMenu>

            {/* Staff Menu */}
            <StyledMenu
              id="staff-menu"
              MenuListProps={{
                "aria-labelledby": "staff-button",
              }}
              anchorEl={staffAnchorEl}
              open={Boolean(staffAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <Person3Icon />
                Staffs
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <CalendarMonthIcon />
                Attendance Tracking
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <AssignmentIndIcon />
                Payroll Spreadsheet
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <Settings />
                Staff General Setting
              </MenuItem>
            </StyledMenu>

            {/* Report Menu  */}
            <StyledMenu
              id="report-menu"
              MenuListProps={{
                "aria-labelledby": "report-button",
              }}
              anchorEl={reportAnchorEl}
              open={Boolean(reportAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/roombookingreport')} disableRipple >
                <EventAvailableIcon />
                Room Booking
              </MenuItem>
              <MenuItem onClick={() => navigate('/revenue')} disableRipple>
                <ReceiptLongIcon />
                Revenue
              </MenuItem>

              <MenuItem onClick={handleClose} disableRipple>
                <FaceRetouchingNaturalIcon />
                Customer
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <TrendingUpIcon />
                Finance
              </MenuItem>
            </StyledMenu>
          </Stack>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Navbar;
