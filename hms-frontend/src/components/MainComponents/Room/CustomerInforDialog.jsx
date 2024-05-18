import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const styleInput = {
  color: "rgba(0, 0, 0, 0.87)",
  width: "60%",
  padding: "0.5rem",
  fontSize: "1rem",
  lineHeight: "1.4375em",
  border: "0.1rem solid #c4c4c4",
  borderRadius: "4px",
};

const StackItem = ({ label, standard, date, selection, onChange, value }) => {
  const [valueDate, setValueDate] = React.useState(dayjs());
  const [selectedGender, setSelectedGender] = React.useState(value);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    onChange(event.target.value);
  };

  const handleDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
    setValueDate(newValue);
    onChange(formattedDate);
  };

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          fontSize: 20,
          justifyContent: "center",
        }}
      >
        {label}
      </div>

      {standard && (
        <input
          type="text"
          value={value}
          style={styleInput}
          onChange={handleInputChange}
        />
      )}
      {date && (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            value={valueDate}
            onChange={handleDateChange}
            sx={{ width: "60%", height: "42px" }}
          />
        </LocalizationProvider>
      )}

      {selection && (
        <RadioGroup row value={selectedGender} onChange={handleGenderChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      )}
    </div>
  );
};

function CustomerInforDialog({
  openCusInforDialog,
  closeCusInfor,
  saveCusInfor,
}) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [cusInfor, setCusInfor] = React.useState({
    cusID: "",
    firstname: "",
    cusDoB: "",
    cusGender: "",
    cusEmail: "",
    cusPhone: "",
    cusImg: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCusInfor({ ...cusInfor, cusImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (key) => (value) => {
    setCusInfor((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const { cusID, firstname, cusGender, cusPhone } = cusInfor;
    if (!cusID || !firstname || !cusGender || !cusPhone) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    saveCusInfor(cusInfor);
    setCusInfor({
      cusID: "",
      firstname: "",
      cusDoB: "",
      cusGender: "",
      cusEmail: "",
      cusPhone: "",
      cusImg: "",
    });
    setSelectedImage(null);
  };

  return (
    <Dialog
      open={openCusInforDialog}
      keepMounted
      onClose={closeCusInfor}
      aria-describedby="detail-booking-dialog"
      maxWidth="lg"
      sx={{
        zIndex: 2,
        "& .MuiDialog-paper": {
          borderRadius: "1.6rem",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Customer Information
        {showAlert && (
          <Alert severity="error" sx={{ marginLeft: "15px", width: "450px" }}>
            Please provide enough necessary information
          </Alert>
        )}
        <IconButton onClick={closeCusInfor}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {console.log(cusInfor)}
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            width: "700px",
            minHeight: "100px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              width: 120,
              height: 100,
              border: selectedImage ? "none" : "3px dashed #bdbdbd",
              borderRadius: 15.0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <FaceRetouchingNaturalOutlinedIcon
                color="disabled"
                fontSize="large"
              />
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <Stack
            spacing={2}
            sx={{
              paddingLeft: 5,
              width: "100%",
            }}
          >
            <StackItem
              label="Identification Number *"
              standard
              value={cusInfor.cusID}
              onChange={handleInputChange("cusID")}
            />
            <StackItem
              label="Customer name *"
              standard
              value={cusInfor.firstname}
              onChange={handleInputChange("firstname")}
            />
            <StackItem
              label="Date of Birth"
              date
              onChange={handleInputChange("cusDoB")}
            />
            <StackItem
              label="Gender *"
              selection
              value={cusInfor.cusGender}
              onChange={handleInputChange("cusGender")}
            />
            <StackItem
              label="Email"
              standard
              value={cusInfor.cusEmail}
              onChange={handleInputChange("cusEmail")}
            />
            <StackItem
              label="Phone number *"
              standard
              value={cusInfor.cusPhone}
              onChange={handleInputChange("cusPhone")}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

CustomerInforDialog.propTypes = {
  openCusInforDialog: PropTypes.bool.isRequired,
  saveCusInfor: PropTypes.func.isRequired,
  closeCusInfor: PropTypes.func.isRequired,
};

StackItem.propTypes = {
  label: PropTypes.string.isRequired,
  standard: PropTypes.bool,
  date: PropTypes.bool,
  selection: PropTypes.bool,
  notes: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default CustomerInforDialog;
