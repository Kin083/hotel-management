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
  ButtonGroup,
  DialogActions,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  TableContainer,
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

const customTheme = createTheme({
  components: {
    MuiAlert: {
      variants: [
        {
          props: { severity: "sun" },
          style: {
            background: "linear-gradient(to right, #f8b195, #f67280)",
            color: "black",
          },
        },
        {
          props: { severity: "daily" },
          style: {
            background: "linear-gradient(to right, #f67280, #c06c84, #6c5b7b)",
            color: "black",
          },
        },
        {
          props: { severity: "moon" },
          style: {
            background: "linear-gradient(to right, #6c5b7b, #355c7d)",
            color: "white",
          },
        },
      ],
    },
  },
});

const StyledAlert = styled(Alert)(() => ({
  "&.MuiAlert-standardSun": {
    backgroundColor: "#fff9c4",
    color: "black",
  },
  "&.MuiAlert-standardMoon": {
    backgroundColor: "#311b92",
    color: "white",
  },
  "&.MuiAlert-standardDaily": {
    background: "linear-gradient(to right, #f67280, #c06c84, #6c5b7b)",
    color: "black",
  },
}));

const StyledTableHead = styled(TableHead, {
  shouldForwardProp: (prop) => prop !== 'rateType',
})(({ rateType }) => ({
  background:
    rateType === "dayRate"
      ? "linear-gradient(to right, #f8b195, #f67280)"
      : rateType === "nightRate"
      ? "linear-gradient(to right, #6c5b7b, #355c7d)"
      : "linear-gradient(to right, #f67280, #c06c84, #6c5b7b)",
  "& th": {
    color: rateType === "nightRate" ? "white" : "black",
  },
}));

const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) => prop !== 'rateType',
})(({ rateType }) => ({
  border: `2px solid ${
    rateType === "dayRate"
      ? "#f8b195"
      : rateType === "nightRate"
      ? "#355c7d"
      : "#f67280"
  }`,
  borderRadius: "8px",
}));

function BookingDialog({ openBookingDialog, closeBooking, confirmBooking }) {
  const [rows, setRows] = useState([]);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour"));
  const [executeTime, setExecuteTime] = useState("hour");
  const [price, setPrice] = useState("dayRate");
  const [timeAlert, setTimeAlert] = useState(false);

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
  };

  const handleEndTimeChange = (newValue) => {
    if (newValue.isAfter(startTime)) {
      setEndTime(newValue);
    } else {
      setTimeAlert(true);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog
        open={openBookingDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeBooking}
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
            <Alert severity="error" sx={{ marginLeft: "0px", width: "230px" }}>
              Please provide valid time.
            </Alert>
          )}
          <IconButton onClick={closeBooking}>
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
                <StyledAlert
                  icon={<WbSunnyIcon fontSize="inherit" />}
                  severity="sun"
                  sx={{ width: "33.33333%" }}
                >
                  Day hour: 6h00 - 18h00
                </StyledAlert>
                <StyledAlert
                  icon={<Brightness4Icon fontSize="inherit" />}
                  severity="daily"
                  sx={{ width: "33.33333%", marginLeft: "5px" }}
                >
                  A Day: 0h00 - 23h59
                </StyledAlert>
                <StyledAlert
                  icon={<DarkModeIcon fontSize="inherit" />}
                  severity="moon"
                  sx={{ width: "33.33333%", marginLeft: "5px" }}
                >
                  Moon hour: 18h00 - 6h00
                </StyledAlert>
              </div>
              <Box
                sx={{
                  display: "flex",
                  align: "center",
                  maxHeight: "50px",
                  padding: "10px 0",
                }}
              >
                <ButtonGroup variant="outlined" sx={{ height: "56px" }}>
                  <Button
                    onClick={() => {
                      setExecuteTime("hour"), setPrice("dayRate");
                    }}
                  >
                    Day Hour
                  </Button>
                  <Button
                    onClick={() => {
                      setExecuteTime("day"), setPrice("dailyRate");
                    }}
                  >
                    Days
                  </Button>
                  <Button
                    onClick={() => {
                      setExecuteTime("hour"), setPrice("nightRate");
                    }}
                  >
                    Night Hour
                  </Button>
                </ButtonGroup>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DateTimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
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
            <StyledTableContainer>
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
                      <TableCell align="center">{row.capicity}</TableCell>
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
                          defaultValue={0}
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
            </StyledTableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeBooking}>Cancel</Button>
          <Button onClick={handleConfirmBooking}>Confirm</Button>
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