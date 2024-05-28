import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RoomImage from "./RoomImage";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect } from "react";
import userApi from "../../../api/userApi";
import { Alert, IconButton } from "@mui/material";
import AdjustRoomDialog from "./AdjustRoomDialog";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentDialog from "./PaymentDialog";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function RoomList({ selectedType, selectedStatus, typeList }) {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [expandedRows, setExpandedRows] = React.useState({});
  const [roomInforTab, setRoomInforTab] = React.useState("1");
  const [openAdjustDialog, setOpenAdjustDialog] = React.useState(false);
  const [specificRoomData, setSpecificRoomData] = React.useState(null);
  const [roomNumbers, setRoomNumbers] = React.useState([]);
  const [openPayDialog, setOpenPayDialog] = React.useState(false);
  const [openBackdrop, setOpenBackDrop] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  // Call API
  useEffect(() => {
    const fetchRooms = async () => {
      const roomList = await userApi.getAll();
      const rowsWithId = roomList.map((room, index) => ({
        ...room,
        id: index,
      }));

      setRoomNumbers(roomList.map((room) => room.roomNumber));
      setRows(rowsWithId);
    };

    fetchRooms();
  }, []);

  // ADJUST ROOM
  const handleClickAdjust = (id) => {
    setOpenAdjustDialog(true);
    const clickedRoom = rows.find((room) => room.id === id);
    setSpecificRoomData(clickedRoom);
  };

  const closeAdjustDialog = () => {
    setOpenAdjustDialog(false);
  };

  // Render Room information is changed.
  const saveChange = (updatedData) => {
    const currentRoomData = specificRoomData;

    // Checking are there any changes? If not -> Do not create new object
    const isDataChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== currentRoomData[key]
    );

    if (!isDataChanged) {
      setOpenAdjustDialog(false);
      return;
    }

    const updatedRoomData = {
      ...currentRoomData,
      roomNumber:
        updatedData.name !== currentRoomData.roomNumber &&
        updatedData.roomNumber !== undefined
          ? updatedData.roomNumber
          : currentRoomData.roomNumber,
      type:
        updatedData.type !== currentRoomData.type &&
        updatedData.type !== undefined
          ? updatedData.type
          : currentRoomData.type,
      status:
        updatedData.status !== currentRoomData.status &&
        updatedData.status !== undefined
          ? updatedData.status
          : currentRoomData.status,
      notes:
        updatedData.notes !== currentRoomData.notes &&
        updatedData.notes !== undefined
          ? updatedData.notes
          : currentRoomData.notes,
    };

    if (updatedRoomData.type !== currentRoomData.type) {
      const updatedType = typeList.find(
        (type) => type.name === updatedRoomData.type
      );
      if (updatedType) {
        updatedRoomData.dailyRate = updatedType.dailyRate;
        updatedRoomData.dayRate = updatedType.dayRate;
        updatedRoomData.nightRate = updatedType.nightRate;
        updatedRoomData.overtimeRate = updatedType.overtimePay;
        updatedRoomData.maximumCapacity = updatedType.capacity;
      }
    }

    const updatedUIRow = rows.map((room) => {
      if (room.id === updatedRoomData.id) {
        return updatedRoomData;
      }
      return room;
    });

    setRows(updatedUIRow);
    setOpenAdjustDialog(false);
  };

  // Render New Room
  const updateRoomList = (newRoomData) => {
    // Get type details from typeList
    const typeDetails = typeList.find((type) => type.name === newRoomData.type);

    // If type details found, update newRoomData with corresponding fields
    if (typeDetails) {
      newRoomData.dayRate = typeDetails.dayRate;
      newRoomData.nightRate = typeDetails.nightRate;
      newRoomData.dailyRate = typeDetails.dailyRate;
      newRoomData.overtimeRate = typeDetails.overtimePay;
      newRoomData.maximumCapacity = typeDetails.capacity;
    }

    // Update rows with newRoomData
    setRows([...rows, newRoomData]);
  };

  // PAYMENT DIALOG
  const openPaymentDialog = (id) => {
    setOpenPayDialog(true);
    const clickedRoom = rows.find((room) => room.id === id);
    setSpecificRoomData(clickedRoom);
  };

  const closePaymentDialog = () => {
    setOpenPayDialog(false);
  };

  const updateRoomStatusAfterPayment = () => {
    // Update room status to "Using" after successful payment
    const updatedRoomData = {
      ...specificRoomData,
      status: "Available",
    };

    const updatedRoomList = rows.map((room) =>
      room.id === specificRoomData.id ? updatedRoomData : room
    );

    setRows(updatedRoomList);
  };

  const savePayment = () => {
    setOpenPayDialog(false);
    setOpenBackDrop(true);
    updateRoomStatusAfterPayment();

    setTimeout(() => {
      setOpenBackDrop(false);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    }, 3000);
  };

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };

  const closeAlert = () => {
    setSuccessAlert(false);
  };

  // Render expand information of specific row when Click Expand btn.
  const handleClickExpand = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };

  // Change Inner Tab in expand row
  const handleChangeTab = (event, newValue) => {
    setRoomInforTab(newValue);
  };

  // Sort by specific attribute
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // CHECK BOX
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickCheckbox = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // CHANGE PAGE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // FILLER TABLE FROM STATUS AND TYPE
  const visibleRows = stableSort(
    rows.filter((row) => {
      if (selectedType === null && selectedStatus === null) {
        return true;
      } else if (selectedType !== null && selectedStatus === null) {
        if (selectedType === "ALL") {
          return true;
        }

        return row.type === selectedType;
      } else if (selectedType === null && selectedStatus !== null) {
        if (selectedStatus === "both") {
          return true;
        }

        return row.status === selectedStatus;
      } else {
        if (row.type === "ALL") {
          if (row.status === "both") return true;
          return row.status === selectedStatus;
        }
        if (row.status === "both") {
          if (row.status === "ALL") return true;
          return row.type === selectedType;
        }
        return row.status === selectedStatus && row.type === selectedType;
      }
    }),
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // UI
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            typeList={typeList}
            roomNumbers={roomNumbers}
            updateRoomList={updateRoomList}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <React.Fragment key={row.id}>
                      <StyledTableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) =>
                              handleClickCheckbox(event, row.id)
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.roomNumber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.type}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.dayRate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.nightRate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.dailyRate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.status === "Available"
                            ? "Available"
                            : "Unavailable"}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.overtimeRate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.maximumCapacity}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton
                            color={
                              row.status === "Available"
                                ? "secondary"
                                : "primary"
                            }
                            disabled={row.status === "Available"}
                            onClick={() => openPaymentDialog(row.id)}
                          >
                            <AccountBalanceWalletIcon />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton onClick={() => handleClickAdjust(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() => handleClickExpand(row.id)}
                            sx={{
                              transition: "transform 0.5s ease-in-out",
                              transform: expandedRows[row.id]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          >
                            {expandedRows[row.id] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>

                      {/* Expand Row */}
                      {expandedRows[row.id] && (
                        <TableRow key={`${row.id}-expand`}>
                          <StyledTableCell
                            padding="none"
                            colSpan={12}
                            sx={{ width: "100%" }}
                          >
                            <TabContext value={roomInforTab}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <TabList
                                  onChange={handleChangeTab}
                                  aria-label="room infor tab"
                                >
                                  <Tab label="Images" value="1" />
                                  {/* <Tab label="Booking History" value="2" /> */}
                                </TabList>
                              </Box>
                              <TabPanel sx={{ height: "450px" }} value="1">
                                <RoomImage />
                              </TabPanel>
                              {/* <TabPanel value="2">Customer Information</TabPanel> */}
                            </TabContext>
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      {openAdjustDialog && (
        <AdjustRoomDialog
          openAdjustDialog={openAdjustDialog}
          closeAdjustDialog={closeAdjustDialog}
          saveChange={saveChange}
          specificRoomData={specificRoomData}
          typeList={typeList}
          roomNumbers={roomNumbers}
        />
      )}
      {openPayDialog && (
        <PaymentDialog
          openPayDialog={openPayDialog}
          closePaymentDialog={closePaymentDialog}
          savePayment={savePayment}
          specificRoomData={specificRoomData}
        />
      )}

      {openBackdrop && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {successAlert && (
        <Snackbar
          open={successAlert}
          autoHideDuration={2000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={closeAlert}
            severity="success"
            sx={{ width: "100%", borderRadius: "1.6rem" }}
          >
            Payment success
          </Alert>
        </Snackbar>
      )}
      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent id="delete-dialog-description">
          Are you sure you want to delete this rooms?
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={deleteType}>Yes</Button> */}
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RoomList.propTypes = {
  selectedType: PropTypes.string,
  selectedStatus: PropTypes.string,
  typeList: PropTypes.array,
};

export default RoomList;
