import * as React from "react";
import PropTypes from "prop-types";
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
import CloseIcon from "@mui/icons-material/Close";
import userApi from "../../../api/userApi";

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
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f7f8f9",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  typeId,
  name,
  description,
  nightRate,
  dayRate,
  dailyRate,
  overtimePay,
  capacity
) {
  return {
    typeId,
    name,
    description,
    nightRate,
    dayRate,
    dailyRate,
    overtimePay,
    capacity,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function RoomType({ typeList }) {
  const [rows, setRows] = React.useState([]);

  const initialFormState = {
    name: "",
    description: "",
    nightRate: "",
    dayRate: "",
    dailyRate: "",
    overtimePay: "",
    capacity: "",
  };

  const [formState, setFormState] = React.useState(initialFormState);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(null);

  React.useEffect(() => {
    setRows(
      typeList.map((item) =>
        createData(
          item.typeId,
          item.name,
          item.description,
          item.nightRate,
          item.dayRate,
          item.dailyRate,
          item.overtimePay,
          item.capacity
        )
      )
    );
  }, [typeList]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const addType = () => {
    setSelectedRow(null);
    setFormState(initialFormState);
    setOpenDialog(true);
  };

  const updateType = (index) => {
    setSelectedRow(rows[index]);
  };

  const confirmDeleteType = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const deleteType = async () => {
    const typeIdToDelete = rows[deleteIndex].typeId;
    try {
      setRows((prevRows) => prevRows.filter((_, idx) => idx !== deleteIndex));
      await userApi.deleteType(typeIdToDelete);
    } catch (error) {
      console.error("Error deleting type:", error);
    } finally {
      setOpenDeleteDialog(false);
      setDeleteIndex(null);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeleteIndex(null);
  };

  const saveChange = async () => {
    const {
      name,
      description,
      nightRate,
      dayRate,
      dailyRate,
      overtimePay,
      capacity,
    } = formState;

    if (
      !name ||
      !description ||
      !nightRate ||
      !dayRate ||
      !dailyRate ||
      !overtimePay ||
      !capacity
    ) {
      alert("Please provide enough information");
      return;
    }

    const newID =
      rows.length > 0 ? Math.max(...rows.map((row) => row.typeId)) + 1 : 1;

    const newData = {
      typeId: selectedRow ? selectedRow.typeId : newID,
      name,
      description,
      nightRate: parseFloat(nightRate),
      dayRate: parseFloat(dayRate),
      dailyRate: parseFloat(dailyRate),
      overtimePay: parseFloat(overtimePay),
      capacity: parseInt(capacity),
    };

    try {
      if (selectedRow !== null) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.typeId === selectedRow.typeId ? newData : row
          )
        );
        await userApi.updateType(selectedRow.typeId, newData);
      } else {
        setRows((prevRows) => [...prevRows, newData]);
        await userApi.addType(newData);
      }
    } catch (error) {
      console.error("Error saving change:", error);
    } finally {
      setOpenDialog(false);
      setFormState(initialFormState);
    }
  };

  React.useEffect(() => {
    if (selectedRow !== null) {
      setFormState({
        name: selectedRow.name,
        description: selectedRow.description,
        nightRate: selectedRow.nightRate,
        dayRate: selectedRow.dayRate,
        dailyRate: selectedRow.dailyRate,
        overtimePay: selectedRow.overtimePay,
        capacity: selectedRow.capacity,
      });
      setOpenDialog(true);
    }
  }, [selectedRow]);

  function getTitle() {
    const title =
      selectedRow === null ? "Add New Type Of Room" : "Edit Type Of Room";
    return (
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  }

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Day Rate</StyledTableCell>
              <StyledTableCell align="right">Night Rate</StyledTableCell>
              <StyledTableCell align="right">Daily Rate</StyledTableCell>
              <StyledTableCell align="right">Overtime Pay $/h</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.typeId}>
                <StyledTableCell align="left">{row.typeId}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.description}</StyledTableCell>
                <StyledTableCell align="right">{row.dayRate}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.nightRate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.dailyRate}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.overtimePay}
                </StyledTableCell>
                <StyledTableCell align="right">{row.capacity}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => updateType(index)}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => confirmDeleteType(index)}>
                    <DeleteIcon />
                  </IconButton>
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
        {getTitle()}
        <DialogContent>
          <Stack spacing={2} sx={{ width: "100%" }} component="form">
            <TextField
              required
              id="name"
              label="Name"
              variant="standard"
              value={formState.name}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="description"
              label="Description"
              variant="standard"
              value={formState.description}
              onChange={handleInputChange}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="dayRate">Day Rate</InputLabel>
              <OutlinedInput
                id="dayRate"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Day Rate"
                value={formState.dayRate}
                onChange={handleInputChange}
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
                value={formState.nightRate}
                onChange={handleInputChange}
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
                value={formState.dailyRate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="overtimePay">Overtime Pay</InputLabel>
              <OutlinedInput
                id="overtimePay"
                startAdornment={
                  <InputAdornment position="start">$/h</InputAdornment>
                }
                label="Overtime Pay"
                value={formState.overtimePay}
                onChange={handleInputChange}
              />
            </FormControl>
            <TextField
              required
              id="capacity"
              label="Capacity"
              type="number"
              variant="standard"
              value={formState.capacity}
              onChange={handleInputChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveChange}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent id="delete-dialog-description">
          Are you sure you want to delete this room type?
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteType}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

RoomType.propTypes = {
  typeList: PropTypes.array.isRequired,
};

export default RoomType;
