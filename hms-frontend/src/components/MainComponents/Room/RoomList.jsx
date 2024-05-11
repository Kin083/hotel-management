import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
import BuildIcon from "@mui/icons-material/Build";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import userApi from "../../../api/userApi";
import { IconButton } from "@mui/material";

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

function RoomList({ selectedType, selectedStatus }) {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const [roomInforTab, setRoomInforTab] = React.useState("1");
  const [specificRoomData, setSpecificRoomData] = React.useState(null);
  const [hoveredRowId, setHoveredRowId] = React.useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getAll();
      const rowsWithId = userList.map((user, index) => ({
        ...user,
        id: index,
      }));
      setRows(rowsWithId);
    };

    fetchUsers();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setRoomInforTab(newValue);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const handleClickBuildIcon = (event, id) => {
    const clickedRoom = rows.find((room) => room.id === id);
    setSpecificRoomData(clickedRoom);
  };

  const handleClickExpand = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

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
        console.log(selectedStatus, selectedType);
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

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          specificRoomData={specificRoomData}
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
                const isHovered = hoveredRowId === row.id;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      onMouseEnter={() => setHoveredRowId(row.id)}
                      onMouseLeave={() => setHoveredRowId(null)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
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
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {isHovered && (
                          <IconButton onClick={() => handleClickExpand(row.id)}>
                            <ExpandMoreIcon />
                          </IconButton>
                        )}
                        {row.roomName}
                        {isHovered && (
                          <IconButton
                            onClick={() => handleClickBuildIcon(event, row.id)}
                          >
                            <BuildIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.dayRate}</TableCell>
                      <TableCell align="right">{row.nightRate}</TableCell>
                      <TableCell align="right">{row.dailyRate}</TableCell>
                      <TableCell align="right">
                        {row.status === "Available"
                          ? "Available"
                          : "Unavailable"}
                      </TableCell>
                      <TableCell align="right">{row.overtimePay}</TableCell>

                      <TableCell align="right">{row.maxiumCapacity}</TableCell>

                      <TableCell align="right">{row.notes}</TableCell>
                    </TableRow>

                    {/* Expand Row */}
                    {expandedRowId === row.id && (
                      <TableRow
                        key={`${row.id}-expand`}
                        sx={{ maxHeight: "435px" }}
                      >
                        <TableCell
                          padding="none"
                          colSpan={10}
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
                                <Tab label="Booking History" value="2" />
                                <Tab label="Transaction History" value="3" />
                                <Tab label="Cleanup History" value="4" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <RoomImage />
                            </TabPanel>

                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                            <TabPanel value="4">Item four</TabPanel>
                          </TabContext>
                        </TableCell>
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
                  <TableCell colSpan={10} />
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
  );
}

RoomList.propTypes = {
  selectedType: PropTypes.string,
  selectedStatus: PropTypes.string,
};

export default RoomList;
