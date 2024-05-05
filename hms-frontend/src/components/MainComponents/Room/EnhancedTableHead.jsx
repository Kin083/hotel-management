import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

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
    id: "dayRate",
    numeric: true,
    disablePadding: false,
    label: "Day Rate",
  },
  {
    id: "nightRate",
    numeric: true,
    disablePadding: false,
    label: "Night Rate",
  },
  {
    id: "dailyRate",
    numeric: true,
    disablePadding: false,
    label: "Daily Rate",
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
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      disablePadding: PropTypes.bool,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EnhancedTableHead;
