import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GridRow = ({ label, value }) => {
  return (
    <Grid container sx={{ marginTop: "20px" }}>
      <Grid item xs={4}>
        {label}
      </Grid>
      <Grid item xs={7} sx={{ marginLeft: "10px" }}>
        {value}
      </Grid>
    </Grid>
  );
};

function AddRoomDialog(props) {
  const { openAddDialog, closeAdd, saveAdd, typeList, roomNames } = props;
  const [newRoomData, setNewRoomData] = useState({
    roomName: "",
    type: "",
    hotelID: "1",
    typeID: "",
    status: "",
    notes: "",
  });

  const [nameError, setNameError] = useState(false);
  const [price, setPrice] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "roomName" && roomNames.includes(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (name === "type") {
      const selectedType = typeList.find((item) => item.name === value);
      if (selectedType) {
        setPrice({
          dayRate: selectedType.dayRate,
          nightRate: selectedType.pricepernight,
          dailyRate: selectedType.dailyRate,
          overtimeRate: selectedType.overtimePay,
          capacity: selectedType.capacity,
        });

        setNewRoomData((prevData) => ({
          ...prevData,
          typeID: selectedType.typeID,
        }));
      }
    }
  };

  const saveRoom = () => {
    if (newRoomData.roomName && newRoomData.type && newRoomData.status) {
      saveAdd(newRoomData);
      closeAdd();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Dialog
      open={openAddDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAdd}
      aria-describedby="adjust-dialog"
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "1.6rem",
        },
      }}
    >
      {console.log(newRoomData)}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add a new Room
        <IconButton onClick={closeAdd}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {showAlert && (
          <Alert severity="error" sx={{ marginBottom: "15px" }}>
            Please fill in all required fields.
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: "800px", height: "345.5px" }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6} sx={{ width: "50%" }}>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                  required
                  id="room-name"
                  name="roomName"
                  label="Name"
                  value={newRoomData.roomName}
                  variant="standard"
                  onChange={handleChange}
                  error={nameError}
                  helperText={nameError ? "Name already exists." : ""}
                />
                <FormControl>
                  <div
                    style={{
                      color: "rgb(102, 102, 102)",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    Type *
                  </div>
                  <Select
                    id="select-type"
                    name="type"
                    value={newRoomData.type}
                    onChange={handleChange}
                  >
                    {typeList.map((type) => (
                      <MenuItem key={type.typeID} value={type.name}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status*</FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={newRoomData.status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Available"
                      control={<Radio />}
                      label="Available"
                    />
                    <FormControlLabel
                      value="Using"
                      control={<Radio />}
                      label="Unavailable"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Grid>
            <Box
              sx={{
                width: "45%",
                height: "250px",
                background: "#f7f8f9",
                borderRadius: "8px",
                padding: "0.8rem",
                marginLeft: "35px",
                marginTop: "15px",
              }}
            >
              <div>Price of room is applied follow type of room:</div>
              {price && (
                <>
                  <GridRow label={"Day Rate:"} value={price.dayRate} />
                  <GridRow label={"Night Rate:"} value={price.nightRate} />
                  <GridRow label={"Daily Rate:"} value={price.dailyRate} />
                  <GridRow label={"Overtime Pay:"} value={price.overtimeRate} />
                  <GridRow label={"Capacity:"} value={price.capacity} />
                </>
              )}
            </Box>
            <Box sx={{ width: "100%", paddingLeft: "8px", marginTop: "5px" }}>
              <TextField
                id="notes"
                name="notes"
                label="Notes"
                value={newRoomData.notes || ""}
                variant="standard"
                sx={{ width: "100%", marginTop: "10px" }}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveRoom}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

AddRoomDialog.propTypes = {
  openAddDialog: PropTypes.bool.isRequired,
  closeAdd: PropTypes.func.isRequired,
  saveAdd: PropTypes.func.isRequired,
  typeList: PropTypes.array.isRequired,
  roomNames: PropTypes.array.isRequired,
};

GridRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AddRoomDialog;
