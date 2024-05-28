import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import BookingDialog from "./BookingDialog";
import DetailBooking from "./DetailBooking";
import CustomerInforDialog from "./CustomerInforDialog";
import AddRoomDialog from "./AddRoomDialog";
import userApi from "../../../api/userApi";
import { Alert } from "@mui/material";


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
  const [openBackdrop, setOpenBackDrop] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);


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
  const closeAlert = () => {
    setSuccessAlert(false);
  };


  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const saveBooking = (bookingData) => {
    if (cusInfor && Object.keys(cusInfor).length > 0) {
      bookingData.rooms.forEach((room) => {
        const roomData = {
          ...cusInfor,
          name: room.name,
          startTime: room.startTime,
          endTime: room.endTime,
          money: room.money,
          typeOfRate: room.typeOfRate,
          cusNotes: bookingData.cusNotes,
        };
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
      setOpenBackDrop(true);
      setTimeout(() => {
        setOpenBackDrop(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 2000);
      }, 3000);
      setCusInfor({});
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
    userApi
      .addGuest(cusInfor)
      .then(() => {
        console.log("Adding guest information successfully:", cusInfor);
      })
      .catch((error) => {
        console.error("Adding guest information Error:", error);
      });
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
        cusInfor={cusInfor}
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


      {openBackdrop && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}


      {successAlert && (
        <Snackbar
          open={successAlert}
          autoHideDuration={2000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={closeAlert}
            severity="success"
            sx={{ width: "100%", borderRadius: "1.6rem" }}
          >
            Booking success
          </Alert>
        </Snackbar>
      )}
    </>
  );
}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  typeList: PropTypes.array.isRequired,
  roomNames: PropTypes.array,
  updateRoomList: PropTypes.func,
};


export default EnhancedTableToolbar;



