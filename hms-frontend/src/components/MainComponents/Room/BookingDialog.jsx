import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  TableHead,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import userApi from "../../../api/userApi";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SUN_THEME = {
  background: "linear-gradient(to right, #f8b195, #f67280)",
  color: "black",
};

const DAILY_THEME = {
  background: "linear-gradient(to right, #f67280, #c06c84, #6c5b7b)",
  color: "black",
};

const NIGHT_THEME = {
  background: "linear-gradient(to right, #6c5b7b, #355c7d)",
  color: "white",
};

const customTheme = createTheme({
  components: {
    MuiAlert: {
      variants: [
        {
          props: { severity: "sun" },
          style: SUN_THEME,
        },
        {
          props: { severity: "daily" },
          style: DAILY_THEME,
        },
        {
          props: { severity: "moon" },
          style: NIGHT_THEME,
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-dayRate": SUN_THEME,
          "&.MuiButton-dailyRate": DAILY_THEME,
          "&.MuiButton-nightRate": NIGHT_THEME,
        },
      },
    },
  },
});

const StyledTableHead = styled(TableHead, {
  shouldForwardProp: (prop) => prop !== "rateType",
})(({ rateType }) => ({
  background:
    rateType === "dayRate"
      ? SUN_THEME.background
      : rateType === "nightRate"
      ? NIGHT_THEME.background
      : DAILY_THEME.background,
  "& th": {
    color: rateType === "nightRate" ? "white" : "black",
  },
}));

function BookingDialog({ openBookingDialog, closeBooking, confirmBooking }) {
  const initialState = {
    rows: [],
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    executeTime: "hour",
    price: "dayRate",
    timeAlert: false,
    pastTimeAlert: false,
  };
  const [rows, setRows] = useState(initialState.rows);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour"));
  const [executeTime, setExecuteTime] = useState("hour");
  const [price, setPrice] = useState("dayRate");
  const [timeAlert, setTimeAlert] = useState(false);
  const [pastTimeAlert, setPastTimeAlert] = useState(false);

  const resetState = () => {
    setRows((prevRows) => prevRows.map((row) => ({ ...row, quantity: 0 })));
    setStartTime(initialState.startTime);
    setEndTime(initialState.endTime);
    setExecuteTime(initialState.executeTime);
    setPrice(initialState.price);
    setTimeAlert(initialState.timeAlert);
    setPastTimeAlert(initialState.pastTimeAlert);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getAvailRoom();
      const userListWithQuantity = userList.map((user) => ({
        ...user,
        quantity: 0,
      }));
      setRows(userListWithQuantity);
    };

    fetchUsers();
  }, []);

  const handleChangeQuantity = (index, value) => {
    const parsedValue = parseInt(value, 10);
    const newRows = [...rows];

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      newRows[index].quantity = parsedValue;
    } else {
      newRows[index].quantity = 0;
    }

    setRows(newRows);
  };

  const handleConfirmBooking = () => {
    if (timeAlert || pastTimeAlert) {
      return;
    }
    const selectedRows = rows
      .filter((row) => row.quantity !== null && row.quantity !== 0)
      .map((row) => {
        const duration = dayjs(endTime).diff(dayjs(startTime), executeTime);
        let typeOfRate;
        if (price === "dayRate") typeOfRate = "Day";
        else if (price === "nightRate") typeOfRate = "Night";
        else typeOfRate = "Daily";

        return {
          ...row,
          startTime: startTime.format("HH:mm/DD/MM/YYYY"),
          endTime: endTime.format("HH:mm/DD/MM/YYYY"),
          typeOfRate: typeOfRate,
          anticipated: duration,
        };
      });
    confirmBooking(selectedRows);
    resetState();
  };

  const handleStartTimeChange = (newValue) => {
    if (newValue.isAfter(dayjs())) {
      setStartTime(newValue);
      if (pastTimeAlert) {
        setPastTimeAlert(false);
      }
    } else {
      setPastTimeAlert(true);
    }
  };

  const handleEndTimeChange = (newValue) => {
    if (newValue.isAfter(startTime)) {
      setEndTime(newValue);
      if (timeAlert) {
        setTimeAlert(false);
      }
    } else {
      setTimeAlert(true);
    }
  };

  const handleCloseBooking = () => {
    resetState();
    closeBooking();
  };

  return (
    <ThemeProvider theme={{ ...customTheme, rateType: price }}>
      <Dialog
        open={openBookingDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseBooking}
        aria-describedby="booking-dialog"
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "1.6rem",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          What room do you need?
          {timeAlert && (
            <Alert severity="error" sx={{ marginLeft: "0px", width: "330px" }}>
              Please provide valid end time.
            </Alert>
          )}
          {pastTimeAlert && (
            <Alert severity="error" sx={{ marginLeft: "0px", width: "330px" }}>
              Start time must be in the future.
            </Alert>
          )}
          <IconButton onClick={handleCloseBooking}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <Box
            sx={{
              maxWidth: "1000px",
              height: "650px",
            }}
          >
            <Box sx={{ height: "140px" }}>
              <div style={{ display: "flex", paddingBottom: "10px" }}>
                <Alert
                  icon={<WbSunnyIcon fontSize="inherit" />}
                  severity="sun"
                  sx={{ width: "33.33333%" }}
                >
                  Day hour: 6h00 - 18h00
                </Alert>
                <Alert
                  icon={<Brightness4Icon fontSize="inherit" />}
                  severity="daily"
                  sx={{ width: "33.33333%", marginLeft: "5px" }}
                >
                  A Day: 0h00 - 23h59
                </Alert>
                <Alert
                  icon={<DarkModeIcon fontSize="inherit" />}
                  severity="moon"
                  sx={{ width: "33.33333%", marginLeft: "5px" }}
                >
                  Moon hour: 18h00 - 6h00
                </Alert>
              </div>
              <Box
                sx={{
                  display: "flex",
                  align: "center",
                  maxHeight: "50px",
                  padding: "10px 0",
                }}
              >
                <Box sx={{ height: "56px" }}>
                  <Button
                    variant="contained"
                    className="MuiButton-dayRate"
                    onClick={() => {
                      setExecuteTime("hour"), setPrice("dayRate");
                    }}
                    sx={{ height: "100%" }}
                  >
                    Day Rate
                  </Button>
                  <Button
                    variant="contained"
                    className="MuiButton-dailyRate"
                    onClick={() => {
                      setExecuteTime("day"), setPrice("dailyRate");
                    }}
                    sx={{ height: "100%", marginLeft: "5px" }}
                  >
                    Daily Rate
                  </Button>
                  <Button
                    variant="contained"
                    className="MuiButton-nightRate"
                    onClick={() => {
                      setExecuteTime("hour"), setPrice("nightRate");
                    }}
                    sx={{ height: "100%", marginLeft: "5px" }}
                  >
                    Night Rate
                  </Button>
                </Box>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DateTimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    sx={{ marginLeft: "15px", marginRight: "10px" }}
                  />
                </LocalizationProvider>
                <div
                  style={{
                    height: "56px",
                    fontSize: "18px",
                    lineHeight: "56px",
                  }}
                >
                  -
                </div>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DateTimePicker
                    label="End Time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    sx={{ marginLeft: "10px", marginRight: "15px" }}
                  />
                </LocalizationProvider>
                <Paper
                  elevation={0}
                  sx={{ height: "56px", fontSize: "18px", lineHeight: "56px" }}
                >{`${dayjs(endTime).diff(
                  dayjs(startTime),
                  executeTime
                )} ${executeTime}`}</Paper>
              </Box>
            </Box>

            <Table>
              <StyledTableHead rateType={price}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Capacity</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Overtime Pay</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody sx={{ paddingBottom: 0 }}>
                {rows.map((row, index) => (
                  <TableRow key={row.type}>
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.capacity}</TableCell>
                    <TableCell align="center">
                      {row.listRoomNumber.length}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        variant="standard"
                        inputProps={{
                          max: row.listRoomNumber.length,
                          min: 0,
                        }}
                        value={row.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(index, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {price === "dayRate"
                        ? row.dayRate
                        : price === "nightRate"
                        ? row.nightRate
                        : row.dailyRate}
                    </TableCell>
                    <TableCell align="center">{row.overtimePay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className={`MuiButton-${price}`}
            variant="contained"
            onClick={handleConfirmBooking}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

BookingDialog.propTypes = {
  openBookingDialog: PropTypes.bool.isRequired,
  closeBooking: PropTypes.func.isRequired,
  confirmBooking: PropTypes.func.isRequired,
};

export default BookingDialog;
