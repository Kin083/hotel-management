import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
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
    <>
      <Grid container sx={{ marginTop: "20px" }}>
        <Grid item xs={4}>
          {label}
        </Grid>
        <Grid item xs={7} sx={{ marginLeft: "10px" }}>
          {value}
        </Grid>
      </Grid>
    </>
  );
};

const AdjustRoomDialog = ({
  openAdjustDialog,
  closeAdjustDialog,
  saveChange,
  specificRoomData,
  typeList,
  roomNames,
}) => {
  const [updatedRoomData, setUpdatedRoomData] = useState({});

  const [price, setPrice] = useState(() => ({
    dayRate: specificRoomData.dayRate,
    nightRate: specificRoomData.nightRate,
    dailyRate: specificRoomData.dailyRate,
    overtimeRate: specificRoomData.overtimeRate,
    capacity: specificRoomData.maxiumCapacity,
  }));
  const [name, setName] = useState(specificRoomData.name);
  const [type, setType] = useState(specificRoomData.type);
  const [status, setStatus] = useState(specificRoomData.status);
  const [notes, setNotes] = useState(specificRoomData.notes);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    setName(specificRoomData.roomName);
    setType(specificRoomData.type);
    setStatus(specificRoomData.status);
    setNotes(specificRoomData.notes);
  }, [specificRoomData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setUpdatedRoomData({ ...updatedRoomData, status: event.target.value });
  };

  const handleChangeType = (event) => {
    const selectedType = typeList.find(
      (item) => item.name === event.target.value
    );
    if (selectedType) {
      setPrice({
        dayRate: selectedType.dayRate,
        nightRate: selectedType.pricepernight,
        dailyRate: selectedType.dailyRate,
        overtimeRate: selectedType.overtimePay,
        capacity: selectedType.capacity,
      });
      setType(event.target.value);
      setUpdatedRoomData({ ...updatedRoomData, type: event.target.value });
    }
  };

  const handleChangeName = (event) => {
    const newName = event.target.value;
    if (!roomNames.includes(newName)) {
      setName(newName);
      setNameError(false);
      setUpdatedRoomData({ ...updatedRoomData, roomName: newName });
    } else {
      setNameError(true);
    }
  };

  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
    setUpdatedRoomData({ ...updatedRoomData, notes: event.target.value });
  };

  return (
    <Dialog
      open={openAdjustDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAdjustDialog}
      aria-describedby="adjust-dialog"
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "1.6rem",
        },
      }}
    >
      <DialogTitle>{"Edit Room Information"}</DialogTitle>
      <DialogContent>
        {specificRoomData && (
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
                    label="Name"
                    value={name || ""}
                    variant="standard"
                    onChange={handleChangeName}
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
                      value={type}
                      onChange={handleChangeType}
                    >
                      {typeList.map((type) => (
                        <MenuItem key={type.typeID} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                      row
                      value={status}
                      defaultValue={status}
                      onChange={handleChangeStatus}
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
                    <GridRow
                      label={"Overtime Pay:"}
                      value={price.overtimeRate}
                    />
                    <GridRow label={"Capacity:"} value={price.capacity} />
                  </>
                )}
              </Box>
              <Box sx={{ width: "100%", paddingLeft: "8px", marginTop: "5px" }}>
                <TextField
                  required
                  id="notes"
                  label="Notes"
                  value={notes || ""}
                  variant="standard"
                  sx={{ width: "100%", marginTop: "10px" }}
                  onChange={handleChangeNotes}
                />
              </Box>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => saveChange(updatedRoomData)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

AdjustRoomDialog.propTypes = {
  openAdjustDialog: PropTypes.bool.isRequired,
  closeAdjustDialog: PropTypes.func.isRequired,
  saveChange: PropTypes.func.isRequired,
  specificRoomData: PropTypes.object,
  typeList: PropTypes.array,
  roomNames: PropTypes.array,
};

GridRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AdjustRoomDialog;
