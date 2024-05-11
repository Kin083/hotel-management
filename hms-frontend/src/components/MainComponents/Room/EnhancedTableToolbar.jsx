import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";

import BookingDialog from "./BookingDialog";
import DetailBooking from "./DetailBooking";
import CustomerInforDialog from "./CustomerInforDialog";
import AdjustRoomDialog from "./AdjustRoomDialog";

function EnhancedTableToolbar({ numSelected, specificRoomData }) {
  const [openAdjustDialog, setOpenAdjustDialog] = React.useState(false);
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);
  const [openDetailBooking, setOpenDetailBooking] = React.useState(false);
  const [openCusInforDialog, setOpenCusInforDialog] = React.useState(false);
  const [detailData, setDetailData] = React.useState([]);

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

  const confirmBooking = (selectedRows) => {
    setOpenBookingDialog(false);
    setOpenDetailBooking(true);
    setDetailData(selectedRows);
  };

  const closeDetailBooking = () => {
    setOpenDetailBooking(false);
  };

  const saveBooking = () => {
    setOpenDetailBooking(false);
  };

  const openCusInfor = () => {
    setOpenCusInforDialog(true);
  };

  const closeCusInfor = () => {
    setOpenCusInforDialog(false);
  };

  const saveCusInfor = () => {
    setOpenCusInforDialog(false);
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
        {numSelected === 0 ? (
          <IconButton onClick={adjustRoom}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton onClick={deleteRoom}>
            <DeleteIcon />
          </IconButton>
        )}
      </Toolbar>

      {specificRoomData && (
        <AdjustRoomDialog
          openAdjustDialog={openAdjustDialog}
          saveChange={saveChange}
          specificRoomData={specificRoomData}
        >
          {console.log(specificRoomData)}
        </AdjustRoomDialog>
      )}
      <BookingDialog
        openBookingDialog={openBookingDialog}
        closeBooking={closeBooking}
        confirmBooking={confirmBooking}
      />
      <DetailBooking
        openDetailBooking={openDetailBooking}
        closeDetailBooking={closeDetailBooking}
        saveBooking={saveBooking}
        openCusInfor={openCusInfor}
        detailData={detailData}
      />

      <CustomerInforDialog
        openCusInforDialog={openCusInforDialog}
        closeCusInfor={closeCusInfor}
        saveCusInfor={saveCusInfor}
      />
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  specificRoomData: PropTypes.object,
};

export default EnhancedTableToolbar;
