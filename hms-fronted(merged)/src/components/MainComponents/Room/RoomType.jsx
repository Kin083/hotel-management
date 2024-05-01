import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

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

function createData(id, name, dayRate, nightRate, dailyRate, overtimePay) {
  return { id, name, dayRate, nightRate, dailyRate, overtimePay };
}

const data = [
  createData(1, "VIP", 500, 700, 1000, 250),
  createData(2, "TWO SINGLE BED", 350, 400, 800, 200),
  createData(3, "ONE SINGLE BED", 200, 300, 700, 100),
  createData(4, "ONE QUEEN-SIZED BED", 400, 500, 800, 250),
  createData(5, "ONE SINGLE BED, ONE QUEEN-SIZED BED", 450, 700, 900, 300),
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function RoomType() {
  const [rows, setRows] = React.useState(data);
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowData, setRowData] = React.useState(null);

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [dayRate, setDayRate] = React.useState("");
  const [nightRate, setNightRate] = React.useState("");
  const [dailyRate, setDailyRate] = React.useState("");
  const [overtimePay, setOvertimePay] = React.useState("");

  const addType = () => {
    setOpenDialog(true);
  };
  const adjustType = (index) => {
    setRowData(rows[index]);
  };
  const deleteType = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const saveChange = () => {
    if (!id || !name || !dayRate || !nightRate || !dailyRate || !overtimePay) {
      setOpenDialog(false);
      return;
    }

    const newData = createData(
      parseInt(id),
      name,
      parseFloat(dayRate),
      parseFloat(nightRate),
      parseFloat(dailyRate),
      parseFloat(overtimePay)
    );

    if (rowData !== null) {
      const updatedRows = rows.map((row) => {
        if (row.id === rowData.id) {
          return newData;
        }
        return row;
      });
      setRows(updatedRows);
    } else {
      setRows([...rows, newData]);
    }

    setOpenDialog(false);
    setId("");
    setName("");
    setDayRate("");
    setNightRate("");
    setDailyRate("");
    setOvertimePay("");
  };

  React.useEffect(() => {
    if (rowData !== null) {
      setId(rowData.id);
      setName(rowData.name);
      setDayRate(rowData.dayRate);
      setNightRate(rowData.nightRate);
      setDailyRate(rowData.dailyRate);
      setOvertimePay(rowData.overtimePay);
      setOpenDialog(true);
    }
  }, [rowData]);

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar>
        <Typography sx={{ flex: "1 1 100%" }} variant="h3" component="div">
          Room Category
        </Typography>

        <IconButton onClick={addType}>
          <AddIcon />
        </IconButton>
      </Toolbar>

      {/* TABLE OF ROOM'S TYPES */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Day Rate</StyledTableCell>
              <StyledTableCell align="right">Night Rate</StyledTableCell>
              <StyledTableCell align="right">Daily Rate</StyledTableCell>
              <StyledTableCell align="right">Overtime Pay $/h</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow
                key={row.id}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <StyledTableCell align="left">{row.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                  {hoveredRow === index && (
                    <>
                      <IconButton onClick={() => adjustType(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteType(index)}>
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

      {/* ADD NEW TYPE */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
        aria-describedby="add-dialog"
        maxWidth="md"
      >
        {rowData === null ? (
          <DialogTitle>{"Add New Type Of Room"}</DialogTitle>
        ) : (
          <DialogTitle>{"Edit Type Of Room"}</DialogTitle>
        )}

        <DialogContent>
          <Stack spacing={2} sx={{ width: "100%" }} component="form">
            <TextField
              required
              fullWidth
              id="id"
              label="ID"
              type="number"
              variant="standard"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              required
              id="name"
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="dayRate">Day Rate</InputLabel>
              <OutlinedInput
                id="dayRate"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Day Rate"
                value={dayRate}
                onChange={(e) => setDayRate(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="nightRate">Night Rate</InputLabel>
              <OutlinedInput
                id="nightRate"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Night Rate"
                value={nightRate}
                onChange={(e) => setNightRate(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="dailyRate">Daily Rate</InputLabel>
              <OutlinedInput
                id="dailyRate"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Daily Rate"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="overtime-pay">Overtime Pay</InputLabel>
              <OutlinedInput
                id="overtime-pay"
                startAdornment={
                  <InputAdornment position="start">$/h</InputAdornment>
                }
                label="Overtime Pay"
                value={overtimePay}
                onChange={(e) => setOvertimePay(e.target.value)}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default RoomType;
