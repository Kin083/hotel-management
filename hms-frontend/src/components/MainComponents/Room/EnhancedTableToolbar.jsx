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
import AddRoomDialog from "./AddRoomDialog";
import userApi from "../../../api/userApi";

function EnhancedTableToolbar({
  numSelected,
  typeList,
  roomNames,
  updateRoomList,
}) {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);
  const [openDetailBooking, setOpenDetailBooking] = React.useState(false);
  const [openCusInforDialog, setOpenCusInforDialog] = React.useState(false);
  const [detailData, setDetailData] = React.useState([]);
  const [cusInfor, setCusInfor] = React.useState({});

  const openAdd = () => {
    setOpenAddDialog(true);
  };

  const closeAdd = () => {
    setOpenAddDialog(false);
  };

  const saveAdd = (newRoomData) => {
    userApi
      .addRoom(newRoomData)
      .then(() => {
        console.log("Room added successfully");
        updateRoomList(newRoomData);
      })
      .catch((error) => {
        console.error("Error adding room:", error);
      })
      .finally(() => {
        closeAdd();
      });
  };

  const deleteRoom = () => {
    alert("clicked");
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

  const saveBooking = (bookingData) => {
    if (cusInfor && Object.keys(cusInfor).length > 0) {
      const combinedData = { ...bookingData, ...cusInfor };
      combinedData.rooms.forEach((room) => {
        const roomData = {
          totalPrice: room.money,
          gestID: combinedData.firstname,
          checkinDate: room.startTime,
          checkoutDate: room.endTime,
          roomNumber: room.name,
        };
        console.log(combinedData);
        userApi
          .addBooking(roomData)
          .then(() => {
            console.log("Room booked successfully:", roomData);
          })
          .catch((error) => {
            console.error("Error booking room:", error);
          });
      });

      setOpenDetailBooking(false);
    } else {
      alert("Please provide customer information");
    }
  };

  const openCusInfor = () => {
    setOpenCusInforDialog(true);
  };

  const closeCusInfor = () => {
    setOpenCusInforDialog(false);
  };

  const saveCusInfor = (cusInfor) => {
    setCusInfor(cusInfor);
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
          <IconButton onClick={openAdd}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton onClick={deleteRoom}>
            <DeleteIcon />
          </IconButton>
        )}
      </Toolbar>

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
        cusName={cusInfor.firstname}
      />

      <CustomerInforDialog
        openCusInforDialog={openCusInforDialog}
        closeCusInfor={closeCusInfor}
        saveCusInfor={saveCusInfor}
      />

      {openAddDialog && (
        <AddRoomDialog
          openAddDialog={openAddDialog}
          closeAdd={closeAdd}
          saveAdd={saveAdd}
          typeList={typeList}
          roomNames={roomNames}
        />
      )}
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  typeList: PropTypes.array.isRequired,
  roomNames: PropTypes.array.isRequired,
  updateRoomList: PropTypes.func,
};

export default EnhancedTableToolbar;
