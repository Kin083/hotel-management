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
}) {
  const [rows, setRows] = React.useState(detailData);
  const [selectedRooms, setSelectedRooms] = React.useState([]);
  const [notesValue, setNotesValue] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  let totalMoney = 0;

  const getRate = (typeOfRate, dayRate, nightRate, dailyRate) => {
    if (typeOfRate === "Day") {
      return dayRate;
    } else if (typeOfRate === "Night") {
      return nightRate;
    } else {
      return dailyRate;
    }
  };

  const getHour = (typeOfRate) => {
    if (typeOfRate === "Daily") {
      return "day";
    }
    return "hour";
  };

  const getTypeMoney = (rate, quantity, hour) => {
    const money = rate * quantity * hour;
    totalMoney += money;
    return money;
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
          getRate(row.typeOfRate, row.dayRate, row.nightRate, row.dailyRate),
          1,
          row.anticipated
        ),
      }));
    });
  };

  const handleSaveBooking = () => {
    if (showAlert === false) {
      const bookingObjects = createBookingObjects();
      saveBooking(bookingObjects);
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
  }, [selectedRooms]);

  if (rows.length != 0) {
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
                  height: 40,
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
              {showAlert && (
                <Alert
                  severity="error"
                  sx={{ marginLeft: "15px", width: "75%" }}
                >
                  Exceeded maximum quantity.
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
                      {row.typeOfRate +
                        "-" +
                        getRate(
                          row.typeOfRate,
                          row.dayRate,
                          row.nightRate,
                          row.dailyRate
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
                        getRate(
                          row.typeOfRate,
                          row.dayRate,
                          row.nightRate,
                          row.dailyRate
                        ),
                        row.quantity,
                        row.anticipated
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
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>Total</div>
                  <div>{totalMoney}</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>Deposit</div>
                  <input
                    type="number"
                    dir="rtl"
                    style={{
                      fontSize: 16,
                      background: "#f7f8f9",
                      border: "none",
                      borderBottom: "1px solid #e1e3e6",
                      outline: "none",
                    }}
                  ></input>
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
};

export default DetailBooking;
