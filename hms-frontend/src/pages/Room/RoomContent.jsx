import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RoomImage from "./RoomImage";

function createData(
  id,
  name,
  type,
  hourlyRate,
  dailyRate,
  overnightRate,
  status,
  notes,
  overtimePay,
  maximumCapacity
) {
  return {
    id,
    name,
    type,
    hourlyRate,
    dailyRate,
    overnightRate,
    status,
    notes,
    overtimePay,
    maximumCapacity,
  };
}

const data = [
  createData(1, 501, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(
    2,
    502,
    "ONE PERSON ONE BED",
    200,
    800,
    800,
    "active",
    null,
    "250/h",
    1
  ),
  createData(3, 503, "TWO PERSON", 250, 900, 900, "active", null, "300/h", 2),
  createData(4, 504, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(5, 401, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(
    6,
    402,
    "ONE PERSON ONE BED",
    200,
    800,
    800,
    "inactive",
    null,
    "250/h",
    1
  ),
  createData(
    7,
    403,
    "ONE PERSON ONE BED",
    200,
    800,
    800,
    "active",
    null,
    "250/h",
    1
  ),
  createData(8, 404, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(9, 301, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(10, 302, "VIP", 500, 1000, 1000, "active", null, "400/h", 3),
  createData(
    11,
    303,
    "ONE PERSON ONE BED",
    200,
    800,
    800,
    "active",
    null,
    "250/h",
    1
  ),
  createData(
    12,
    304,
    "TWO PERSON",
    250,
    900,
    900,
    "inactive",
    null,
    "300/h",
    2
  ),
];

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

const headCells = [
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Room Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "hourlyRate",
    numeric: true,
    disablePadding: false,
    label: "Hourly Rate",
  },
  {
    id: "dailyRate",
    numeric: true,
    disablePadding: false,
    label: "Daily Rate",
  },
  {
    id: "overnightRate",
    numeric: true,
    disablePadding: false,
    label: "Over Night Rate",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "overtimePay",
    numeric: false,
    disablePadding: false,
    label: "Overtime Pay",
  },
  {
    id: "maximumCapacity",
    numeric: true,
    disablePadding: false,
    label: "Maximun Capacity",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
];
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rooms",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle3"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h3"
          id="tableTitle"
          component="div"
        >
          Room List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function RoomContent({ selectedType, selectedStatus }) {
  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = React.useState(data);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const [roomInforTab, setRoomInforTab] = React.useState("1");

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

  const handleClick = (event, id) => {
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
    setExpandedRowId(id === expandedRowId ? null : id);
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

  // Avoid a layout jump when reaching the last page with empty rows.
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
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
                  <>
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
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
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.hourlyRate}</TableCell>
                      <TableCell align="right">{row.dailyRate}</TableCell>
                      <TableCell align="right">{row.overnightRate}</TableCell>
                      <TableCell align="right">
                        {row.status === "active" ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell align="right">{row.overtimePay}</TableCell>
                      <TableCell align="right">{row.maximumCapacity}</TableCell>
                      <TableCell align="right">{row.notes}</TableCell>
                    </TableRow>

                    {/* Expand Row */}
                    {expandedRowId === row.id && (
                      <TableRow sx={{ maxHeight: "435px" }}>
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
                  </>
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

RoomContent.propTypes = {
  selectedType: PropTypes.string.isRequired,
  selectedStatus: PropTypes.string.isRequired,
};

export default RoomContent;
