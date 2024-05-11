import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function AdjustRoomDialog({
  openAdjustDialog,
  closeAdjustDialog,
  saveChange,
  specificRoomData,
}) {
  const [room, setRoom] = React.useState(null);

  React.useEffect(() => {
    setRoom(specificRoomData);
  }, [specificRoomData]);

  return (
    <Dialog
      open={openAdjustDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeAdjustDialog}
      aria-describedby="adjust-dialog"
      maxWidth="lg"
    >
      <DialogTitle>{"Edit Room Information"}</DialogTitle>
      <DialogContent>
        {room && (
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              width: "800px",
              height: "406.5px",
            }}
          >
            {console.log(room)}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <TextField
                    required
                    id="room-name"
                    label="Name"
                    defaultValue={room.roomName}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="type"
                    label="Type"
                    defaultValue={room.type}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="status"
                    label="Status"
                    defaultValue={room.status}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="maximum-capacity"
                    label="Maximum Capacity"
                    defaultValue={room.maximumCapacity}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="notes"
                    label="Notes"
                    defaultValue={room.notes}
                    variant="standard"
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <TextField
                    required
                    id="hourly-rate"
                    label="Hourly Rate"
                    defaultValue={room.hourlyRate}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="daily-rate"
                    label="Daily Rate"
                    defaultValue={room.dailyRate}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="overnight-rate"
                    label="Overnight Rate ($/h)"
                    defaultValue={room.overnightRate}
                    variant="standard"
                  />
                  <TextField
                    required
                    id="overtime-pay"
                    label="Overtime Pay"
                    defaultValue={room.overtimePay}
                    variant="standard"
                  />
                </Stack>
              </Grid>
            </Grid>
            <Box>Long Item</Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={saveChange}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

AdjustRoomDialog.propTypes = {
  openAdjustDialog: PropTypes.bool.isRequired,
  closeAdjustDialog: PropTypes.func.isRequired,
  saveChange: PropTypes.func.isRequired,
  specificRoomData: PropTypes.object,
};

export default AdjustRoomDialog;
