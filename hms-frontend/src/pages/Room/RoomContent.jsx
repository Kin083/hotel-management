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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

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
  maximumCapacity,
  img
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
    img,
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

const imageData = [
  {
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8Mg%3D%3D",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDI%3D",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbnxlbnwwfHwwfHx8Mg%3D%3D",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1556037843-347ddff9f4b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGNoZW58ZW58MHx8MHx8fDI%3D",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENoYWlyfGVufDB8fDB8fHwy",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFwdG9wfGVufDB8fDB8fHwy",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1558827052-620cb6371c78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvb3J8ZW58MHx8MHx8fDI%3D",
    title: "Doors",
  },
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
                      <TableCell align="right">{row.notes}</TableCell>
                    </TableRow>

                    {expandedRowId === row.id && (
                      <TableRow sx={{ maxHeight: "435px" }}>
                        <TableCell
                          padding="none"
                          colSpan={8}
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
                                <Tab label="Information" value="1" />
                                <Tab label="Booking History" value="2" />
                                <Tab label="Transaction History" value="3" />
                                <Tab label="Cleanup History" value="4" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <Box sx={{ display: "flex" }}>
                                <Box
                                  sx={{
                                    flex: 1,
                                    width: "50%",
                                    height: "100%",
                                    overflowY: "scroll",
                                  }}
                                >
                                  <ImageList variant="masonry" cols={3} gap={8}>
                                    {imageData.map((image) => (
                                      <ImageListItem key={image.img}>
                                        <img
                                          srcSet={`${image.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                          src={`${image.img}?w=248&fit=crop&auto=format`}
                                          alt={image.title}
                                          loading="lazy"
                                        />
                                        <ImageListItemBar
                                          position="below"
                                          title={image.title}
                                        />
                                      </ImageListItem>
                                    ))}
                                  </ImageList>
                                </Box>
                                <Box sx={{ flex: 1, paddingLeft: "16px" }}>
                                  Item One
                                </Box>
                              </Box>
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
                  <TableCell colSpan={6} />
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
