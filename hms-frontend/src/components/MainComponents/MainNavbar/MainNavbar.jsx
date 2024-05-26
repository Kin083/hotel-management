import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./MainNavbar.module.css";

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
import NightShelterIcon from "@mui/icons-material/NightShelter";
import AssessmentIcon from "@mui/icons-material/Assessment";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";

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
    href: "/main",
    text: "Room",
    icon: <NightShelterIcon />,
  },
  {
    id: "report-button",
    text: "Report",
    icon: <AssessmentIcon />,
  },
];

function Navbar() {
  const [reportAnchorEl, setReportAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleReportClick = (event) => {
    setReportAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setReportAnchorEl(null);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <ThemeProvider theme={theme}>
          <Stack direction="row" sx={{ height: "100%" }}>
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
                    bgcolor: "#3B8665",
                  },
                }}
                onClick={
                  button.id === "report-button" ? handleReportClick : null
                }
              >
                {button.text}
              </Button>
            ))}

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
              <MenuItem onClick={() => navigate("/revenue")} disableRipple>
                <ReceiptLongIcon />
                Revenue
              </MenuItem>
            </StyledMenu>
          </Stack>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Navbar;
