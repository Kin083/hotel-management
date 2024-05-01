import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#009394",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(type, dayRate, nightRate, dailyRate, overtimePay) {
  return { type, dayRate, nightRate, dailyRate, overtimePay };
}

const rows = [
  createData("VIP", 500, 700, 1000, 250),
  createData("TWO SINGLE BED", 350, 400, 800, 200),
  createData("ONE SINGLE BED", 200, 300, 700, 100),
  createData("ONE QUEEN-SIZED BED", 400, 500, 800, 250),
  createData("ONE SINGLE BED, ONE QUEEN-SIZED BED", 450, 700, 900, 300),
];

function RoomType() {
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const addRoom = () => {
    alert("clicked");
  };
  const adjustRoom = () => {
    setOpenDialog(true);
  };
  const deleteRoom = () => {
    alert("clicked");
  };

  const saveChange = () => {
    setOpenDialog(false);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar>
        <Typography sx={{ flex: "1 1 100%" }} variant="h3" component="div">
          Room Category
        </Typography>

        <IconButton onClick={addRoom}>
          <AddIcon />
        </IconButton>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right">Day Rate</StyledTableCell>
              <StyledTableCell align="right">Night Rate</StyledTableCell>
              <StyledTableCell align="right">Daily Rate</StyledTableCell>
              <StyledTableCell align="right">Overtime Pay $/h</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow
                key={row.type}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.type}
                  {hoveredRow === index && (
                    <>
                      <IconButton onClick={adjustRoom}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={deleteRoom}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{row.dayRate}</StyledTableCell>
                <StyledTableCell align="right">{row.nightRate}</StyledTableCell>
                <StyledTableCell align="right">{row.dailyRate}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.overtimePay}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RoomType;
