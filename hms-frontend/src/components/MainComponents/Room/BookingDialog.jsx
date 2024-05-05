import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Box,
  ButtonGroup,
  Button,
  Table,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import userApi from "../../../api/userApi";

// function createData(
//   name,
//   capacity,
//   available,
//   quantity,
//   dayRate,
//   nightRate,
//   dailyRate,
//   overtimePay
// ) {
//   return {
//     name,
//     capacity,
//     available,
//     quantity,
//     dayRate,
//     nightRate,
//     dailyRate,
//     overtimePay,
//   };
// }

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ebf5ee",
    color: "#1f2224",
    fontSize: 14,
    border: 0,
    padding: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 10,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f7f8f9",
  },
  // hide last border
  "& td, & th": {
    border: 0,
  },
}));

function BookingDialog({ openBookingDialog, closeBooking, confirmBooking }) {
  const userList = [];
  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getType();
      console.log("ok");
      console.log(userList);
      setRows(userList);
    };

    fetchUsers();
  }, []);
  const [rows, setRows] = React.useState(userList);
  const [startTime, setStartTime] = React.useState(dayjs());
  const [endTime, setEndTime] = React.useState(dayjs().add(1, "hour"));
  //const [price, setPrice] = React.useState("dailyRate");
  const [executeTime, setExecuteTime] = React.useState("hour");

  const handleChangeQuantity = (index, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, quantity: value } : row
      )
    );
  };
  return (
    <React.Fragment>
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
          {"What room do you need?"}
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
                    // setPrice("dayRate");
                    setExecuteTime("hour");
                  }}
                >
                  Day Hour
                </Button>
                <Button
                  onClick={() => {
                    // setPrice("nightRate");
                    setExecuteTime("hour");
                  }}
                >
                  Night Hour
                </Button>
                <Button
                  onClick={() => {
                    // setPrice("dailyRate");
                    setExecuteTime("day");
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
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Capacity</StyledTableCell>
                  <StyledTableCell align="center">Available</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Overtime Pay</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ paddingBottom: 0 }}>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.capacity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.available}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        type="number"
                        variant="standard"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(index, e.target.value)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* {price === "dailyRate"
                        ? row.dailyRate
                        : price === "dayRate"
                        ? row.dayRate
                        : row.nightRate} */}
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.overtimePay}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmBooking}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

BookingDialog.propTypes = {
  openBookingDialog: PropTypes.bool.isRequired,
  closeBooking: PropTypes.func.isRequired,
  confirmBooking: PropTypes.func.isRequired,
};

export default BookingDialog;
