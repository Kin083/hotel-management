import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import userApi from "../../../api/userApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function BookingDialog({ openBookingDialog, closeBooking, confirmBooking }) {
  const [rows, setRows] = useState([]);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour"));
  const [executeTime, setExecuteTime] = useState("hour");
  const [price, setPrice] = useState("dayRate");

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getAvailRoom();
      const userListWithQuantity = userList.map((user) => ({
        ...user,
        quantity: 0,
        rate: "dayRate",
        startTime: 0,
        endTime: 0,
        anticipated: 0,
        totalMoney: 0,
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
    const selectedRows = rows.filter(
      (row) => row.quantity !== null && row.quantity !== 0
    );
    confirmBooking(selectedRows);
  };

  return (
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
        <IconButton onClick={closeBooking}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Box
          sx={{
            maxWidth: "1000px",
            height: "450px",
            paddingTop: "20px",
          }}
        >
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
                  setExecuteTime("hour"), setPrice("nightRate");
                }}
              >
                Night Hour
              </Button>
              <Button
                onClick={() => {
                  setExecuteTime("day"), setPrice("dailyRate");
                }}
              >
                Days
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
                onChange={(newValue) => setEndTime(newValue)}
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
          <Table sx={{ marginTop: "50px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Overtime Pay</TableCell>
              </TableRow>
            </TableHead>
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
                      inputProps={{ max: row.listRoomNumber.length, min: 0 }}
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
                  <TableCell align="center">{row.ovetimeRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmBooking}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

BookingDialog.propTypes = {
  openBookingDialog: PropTypes.bool.isRequired,
  closeBooking: PropTypes.func.isRequired,
  confirmBooking: PropTypes.func.isRequired,
};

export default BookingDialog;
