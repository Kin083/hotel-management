import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  Table,
  IconButton,
  Tooltip,
  DialogActions,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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

function createData(type, rooms, rate, start, end, anticipated, money) {
  return { type, rooms, rate, start, end, anticipated, money };
}

const data = [
  createData(
    "VIP",
    2,
    "dailyRate",
    "05/03/2024 12:43 AM",
    "05/04/2024 01:43 AM",
    "1 day",
    600
  ),
  createData(
    "TWO SINGLE BED",
    1,
    "dailyRate",
    "05/03/2024 12:43 AM",
    "05/04/2024 01:43 AM",
    "1 day",
    200
  ),
];

function DetailBooking(openDetailBooking, closeDetailBooking, saveBooking) {
  const [rows, setRows] = React.useState(data);
  return (
    <Dialog
      open={openDetailBooking}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDetailBooking}
      aria-describedby="detail-booking-dialog"
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
        {"Detail Booking"}{" "}
        <IconButton onClick={closeDetailBooking}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: "900px",
            minHeight: "100px",
            paddingTop: "20px",
          }}
        >
          <Box
            sx={{
              width: 292,
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
              style={{ border: "none", outline: "none" }}
            ></input>
            <IconButton>
              <AddPhotoAlternateIcon />
            </IconButton>
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Table sx={{ marginTop: "50px" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
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
                  <StyledTableCell align="center">{row.rooms}</StyledTableCell>
                  <StyledTableCell align="center">{row.rate}</StyledTableCell>
                  <StyledTableCell align="center">{row.start}</StyledTableCell>
                  <StyledTableCell align="center">{row.end}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.anticipated}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.money}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveBooking}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

DetailBooking.propTypes = {
  openDetailBooking: PropTypes.bool.isRequired,
  saveBooking: PropTypes.func.isRequired,
  closeDetailBooking: PropTypes.func.isRequired,
};

export default DetailBooking;
