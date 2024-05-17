import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Alert,
  Box,
  Button,
  Table,
  IconButton,
  Tooltip,
  DialogActions,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FaceIcon from "@mui/icons-material/Face";

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
  "& td, & th": {
    border: 0,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function DetailBooking({
  openDetailBooking,
  closeDetailBooking,
  saveBooking,
  openCusInfor,
  detailData,
  cusName,
}) {
  const [rows, setRows] = React.useState(detailData);
  const [selectedRooms, setSelectedRooms] = React.useState([]);
  const [notesValue, setNotesValue] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [noRoomsSelectedAlert, setNoRoomsSelectedAlert] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const [totalMoney, setTotalMoney] = React.useState(0);

  const getRate = (
    typeOfRate,
    dayRate,
    nightRate,
    dailyRate,
    startTime,
    endTime
  ) => {
    if (!startTime || !endTime) {
      return "Invalid startTime or endTime";
    }

    if (typeOfRate === "Daily") {
      return "Daily - " + dailyRate;
    } else {
      const startTimeParts = startTime.split(":");
      const endTimeParts = endTime.split(":");

      if (startTimeParts.length < 2 || endTimeParts.length < 2) {
        return "Invalid time format";
      }

      const startHour = parseInt(startTimeParts[0]);
      const startMinute = parseInt(startTimeParts[1]);
      const endHour = parseInt(endTimeParts[0]);
      const endMinute = parseInt(endTimeParts[1]);

      if (
        isNaN(startHour) ||
        isNaN(startMinute) ||
        isNaN(endHour) ||
        isNaN(endMinute)
      ) {
        return "Invalid time format";
      }

      const isDayToNight =
        startHour >= 6 && startHour < 18 && (endHour >= 18 || endHour < 6);

      if (isDayToNight) {
        return "Day - " + dayRate + " & " + "Night - " + nightRate;
      } else if (typeOfRate === "Day" && startHour >= 6 && startHour < 18) {
        return "Day - " + dayRate;
      } else if (typeOfRate === "Night" && (startHour >= 18 || startHour < 6)) {
        return "Night - " + nightRate;
      } else {
        return "Invalid time range";
      }
    }
  };

  const getHour = (typeOfRate) => {
    if (typeOfRate === "Daily") {
      return "day";
    }
    return "hour";
  };

  const getTypeMoney = (rate, quantity, hour, startTime, endTime) => {
    // Parse startTime and endTime to get hour and minutes
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endMinute = parseInt(endTime.split(":")[1]);

    // Check if startTime is in dayRate and endTime is in nightRate
    const isDayToNight =
      startHour >= 6 && startHour < 18 && (endHour >= 18 || endHour < 6);

    if (isDayToNight) {
      // Calculate number of hours in dayRate and nightRate
      const dayEndHour = 18;
      const nightStartHour = 18;

      let dayHours = 0;
      let nightHours = 0;

      if (endHour >= nightStartHour) {
        dayHours = dayEndHour - startHour + startMinute / 60;
        nightHours = endHour - nightStartHour + endMinute / 60;
      } else {
        dayHours = dayEndHour - startHour + startMinute / 60;
        nightHours = 24 - nightStartHour + endHour + endMinute / 60;
      }

      // Calculate money for each rate and sum them up
      const dayMoney = rate * dayHours * quantity;
      const nightMoney = rate * nightHours * quantity;
      return dayMoney + nightMoney;
    } else {
      // Calculate money as usual
      return rate * quantity * hour;
    }
  };

  const handleChange = (event, index) => {
    const {
      target: { value },
    } = event;

    if (value.length === detailData[index].quantity + 1) {
      setShowAlert(true);
    }
    setSelectedRooms((prevSelectedRooms) => {
      const newSelectedRooms = [...prevSelectedRooms];
      newSelectedRooms[index] = value;
      return newSelectedRooms;
    });
  };

  const createBookingObjects = () => {
    return rows.flatMap((row, index) => {
      const selectedRoomsArray = selectedRooms[index];
      return selectedRoomsArray.map((room) => ({
        name: room,
        startTime: row.startTime,
        endTime: row.endTime,
        typeOfRate: row.typeOfRate,
        money: getTypeMoney(
          row.typeOfRate === "Daily"
            ? row.dailyRate
            : row.typeOfRate === "Day"
            ? row.dayRate
            : row.nightRate,
          1,
          row.anticipated,
          row.startTime,
          row.endTime
        ),
      }));
    });
  };

  const handleSaveBooking = () => {
    if (showAlert === false) {
      const anyRoomNotSelected = selectedRooms.some(
        (rooms) => rooms.length === 0
      );
      if (anyRoomNotSelected) {
        setNoRoomsSelectedAlert(true);
      } else {
        setNoRoomsSelectedAlert(false);
        const bookingObjects = createBookingObjects();
        const totalMoney = bookingObjects.reduce(
          (total, booking) => total + booking.money,
          0
        );
        const bookingData = {
          cusNotes: notesValue,
          totalMoney,
          rooms: bookingObjects,
        };
        saveBooking(bookingData);
      }
    } else {
      alert("Please choose the number of room is suitable");
    }
  };

  React.useEffect(() => {
    setRows(detailData);
    setSelectedRooms(Array(detailData.length).fill([]));
  }, [detailData]);

  React.useEffect(() => {
    const anyExceededQuantity = selectedRooms.some(
      (rooms, index) => rooms.length > detailData[index].quantity
    );
    setShowAlert(anyExceededQuantity);
  }, [selectedRooms, detailData]);

  React.useEffect(() => {
    const newTotalMoney = rows.reduce((total, row, index) => {
      const money = selectedRooms[index].reduce((acc) => {
        return (
          acc +
          getTypeMoney(
            row.typeOfRate === "Daily"
              ? row.dailyRate
              : row.typeOfRate === "Day"
              ? row.dayRate
              : row.nightRate,
            1,
            row.anticipated,
            row.startTime,
            row.endTime
          )
        );
      }, 0);
      return total + money;
    }, 0);
    setTotalMoney(newTotalMoney);
  }, [rows, selectedRooms]);

  React.useEffect(() => {
    const newTotalMoney = rows.reduce((total, row, index) => {
      const rate = getRate(
        row.typeOfRate,
        row.dayRate,
        row.nightRate,
        row.dailyRate
      );
      const money = selectedRooms[index].length * rate * row.anticipated;
      return total + money;
    }, 0);
    setTotalMoney(newTotalMoney);
  }, [rows, selectedRooms]);

  if (rows.length !== 0) {
    return (
      <Dialog
        open={openDetailBooking}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDetailBooking}
        aria-describedby="detail-booking-dialog"
        maxWidth="xl"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "1.6rem",
          },
          zIndex: 1,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {"Detail Booking"}
          <IconButton onClick={closeDetailBooking}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: "1200px",
              minHeight: "100px",
              paddingTop: "20px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "25%",
                  height: 47,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e1e3e5",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                }}
              >
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Customer Name"
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    paddingLeft: "15px",
                  }}
                ></input>
                <IconButton onClick={openCusInfor}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              {cusName && (
                <Alert
                  icon={<FaceIcon fontSize="inherit" />}
                  severity="success"
                  sx={{ marginLeft: "15px", width: "20%" }}
                >
                  {cusName}
                </Alert>
              )}
              {showAlert && (
                <Alert
                  severity="error"
                  sx={{ marginLeft: "15px", width: "50%" }}
                >
                  Exceeded maximum quantity.
                </Alert>
              )}
              {noRoomsSelectedAlert && (
                <Alert
                  severity="error"
                  sx={{ marginLeft: "15px", width: "50%" }}
                >
                  Please select at least one room for each row.
                </Alert>
              )}
            </Box>
            <Table sx={{ marginTop: "20px" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell align="center">Rooms</StyledTableCell>
                  <StyledTableCell align="center">Rate</StyledTableCell>
                  <StyledTableCell align="center">Start</StyledTableCell>
                  <StyledTableCell align="center">End</StyledTableCell>
                  <StyledTableCell align="center">Anticipated</StyledTableCell>
                  <StyledTableCell align="center">
                    Money
                    <Tooltip
                      title="Money = Room price + surcharge"
                      placement="top"
                    >
                      <TipsAndUpdatesOutlinedIcon fontSize="inherit" />
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.type}>
                    <StyledTableCell component="th" scope="row">
                      {row.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity}
                    </StyledTableCell>
                    <TableCell align="center" sx={{ width: "250px" }}>
                      <FormControl>
                        <InputLabel>Select room</InputLabel>
                        <Select
                          multiple
                          value={selectedRooms[index]}
                          onChange={(event) => handleChange(event, index)}
                          input={<OutlinedInput label="Select room" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                          sx={{ width: "250px" }}
                        >
                          {row.listRoomNumber.map((room) => (
                            <MenuItem key={room} value={room}>
                              <Checkbox
                                checked={selectedRooms[index].includes(room)}
                              />

                              <ListItemText primary={room} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <StyledTableCell align="center">
                      {getRate(
                        row.typeOfRate,
                        row.dayRate,
                        row.nightRate,
                        row.dailyRate,
                        row.startTime,
                        row.endTime
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.startTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.endTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.anticipated + " " + getHour(row.typeOfRate)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getTypeMoney(
                        row.typeOfRate === "Daily"
                          ? row.dailyRate
                          : row.typeOfRate === "Day"
                          ? row.dayRate
                          : row.nightRate,
                        selectedRooms[index].length,
                        row.anticipated,
                        row.startTime,
                        row.endTime
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ marginTop: "20px", display: "flex" }}>
              <Box sx={{ width: "80%" }}>
                <textarea
                  value={notesValue}
                  onChange={(event) => {
                    setNotesValue(event.target.value);
                  }}
                  rows={3}
                  cols={10}
                  placeholder="Customer notes"
                  style={{
                    color: "rgba(0, 0, 0, 0.87)",
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    lineHeight: "1.4375em",
                    border: "0.1rem solid #c4c4c4",
                    borderRadius: "4px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  background: "#f7f8f9",
                  borderRadius: "8px",
                  padding: "0.5rem",
                  marginLeft: "15px",
                  display: "flex",
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    {rows.reduce((total, row, index) => {
                      const money = getTypeMoney(
                        row.typeOfRate === "Daily"
                          ? row.dailyRate
                          : row.typeOfRate === "Day"
                          ? row.dayRate
                          : row.nightRate,
                        selectedRooms[index].length,
                        row.anticipated,
                        row.startTime,
                        row.endTime
                      );
                      return total + money;
                    }, 0) + " USD"}
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveBooking}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return <></>;
}

DetailBooking.propTypes = {
  openDetailBooking: PropTypes.bool.isRequired,
  saveBooking: PropTypes.func.isRequired,
  closeDetailBooking: PropTypes.func.isRequired,
  openCusInfor: PropTypes.func.isRequired,
  detailData: PropTypes.array.isRequired,
  cusName: PropTypes.string,
};

export default DetailBooking;
