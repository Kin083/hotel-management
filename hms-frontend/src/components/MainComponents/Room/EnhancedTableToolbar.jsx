import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import PaidIcon from "@mui/icons-material/Paid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import BookingDialog from "./BookingDialog";
import DetailBooking from "./DetailBooking";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function EnhancedTableToolbar({ numSelected, specificRoomData }) {
  const [openAdjustDialog, setOpenAdjustDialog] = React.useState(false);
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);
  const [openDetailBooking, setOpenDetailBooking] = React.useState(false);

  const addRoom = () => {
    alert("clicked");
  };
  const adjustRoom = () => {
    setOpenAdjustDialog(true);
  };
  const deleteRoom = () => {
    alert("clicked");
  };

  const saveChange = () => {
    setOpenAdjustDialog(false);
  };

  const openBooking = () => {
    setOpenBookingDialog(true);
  };

  const closeBooking = () => {
    setOpenBookingDialog(false);
  };

  const confirmBooking = () => {
    setOpenBookingDialog(false);
    setOpenDetailBooking(true);
  };

  const closeDetailBooking = () => {
    setOpenDetailBooking(false);
  };

  const saveBooking = () => {
    setOpenDetailBooking(false);
  };

  return (
    <>
      <Toolbar>
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

        <IconButton onClick={openBooking}>
          <PaidIcon />
        </IconButton>
        {numSelected === 1 ? (
          <IconButton onClick={adjustRoom}>
            <BuildIcon />
          </IconButton>
        ) : numSelected > 1 ? (
          <IconButton onClick={deleteRoom}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={addRoom}>
            <AddIcon />
          </IconButton>
        )}
      </Toolbar>

      {specificRoomData && (
        <Dialog
          open={openAdjustDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={saveChange}
          aria-describedby="adjust-dialog"
          maxWidth="lg"
        >
          <DialogTitle>{"Edit Room Information"}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                width: "800px",
                height: "406.5px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <TextField
                      required
                      id="room-name"
                      label="Name"
                      defaultValue={1234324}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="type"
                      label="Type"
                      defaultValue={specificRoomData.type}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="status"
                      label="Status"
                      defaultValue={specificRoomData.status}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="maximum-capacity"
                      label="Maximum Capacity"
                      defaultValue={specificRoomData.maximumCapacity}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="notes"
                      label="Notes"
                      defaultValue={specificRoomData.notes}
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
                      defaultValue={specificRoomData.hourlyRate}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="daily-rate"
                      label="Daily Rate"
                      defaultValue={specificRoomData.dailyRate}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="overnight-rate"
                      label="Overnight Rate ($/h)"
                      defaultValue={specificRoomData.overnightRate}
                      variant="standard"
                    />
                    <TextField
                      required
                      id="overtime-pay"
                      label="Overtime Pay"
                      defaultValue={specificRoomData.overtimePay}
                      variant="standard"
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Box>Long Item</Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={saveChange}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
      <BookingDialog
        openBookingDialog={openBookingDialog}
        closeBooking={closeBooking}
        confirmBooking={confirmBooking}
      />

      {openDetailBooking && (
        <DetailBooking
          openDetailBooking={openDetailBooking}
          closeDetailBooking={closeDetailBooking}
          saveBooking={saveBooking}
        />
      )}
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  specificRoomData: PropTypes.object.isRequired,
};

export default EnhancedTableToolbar;
