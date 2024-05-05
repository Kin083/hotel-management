import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import PropTypes from "prop-types";
import {
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

const StackItem = ({ label, standard, date, selection, notes }) => {
  const [value, setValue] = React.useState(dayjs());
  const [selectedGender, setSelectedGender] = React.useState("");
  const [textValue, setTextValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleText = (event) => {
    setTextValue(event.target.value);
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

      {standard && <input type="text" style={styleInput} />}
      {date && (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ width: "60%", height: "42px" }}
          />
        </LocalizationProvider>
      )}

      {selection && (
        <RadioGroup row value={selectedGender} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      )}

      {notes && (
        <textarea
          value={textValue}
          onChange={handleText}
          rows={3}
          cols={10}
          placeholder="Customer notes"
          style={styleInput}
        />
      )}
    </div>
  );
};
function CustomerInforDialog({
  openCusInforDialog,
  closeCusInfor,
  saveCusInfor,
}) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog
      open={openCusInforDialog}
      keepMounted
      onClose={closeCusInfor}
      aria-describedby="detail-booking-dialog"
      maxWidth="lg"
      sx={{
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
        {"Customer Information"}
        <IconButton onClick={closeCusInfor}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
            <StackItem label="Customer name" standard />
            <StackItem label="Date of Birth" date />
            <StackItem label="Gender" selection />
            <StackItem label="Email" standard />
            <StackItem label="Phone number" standard />
            <StackItem label="Notes" notes />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveCusInfor}>Save</Button>
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
  standard: PropTypes.bool.isRequired,
  date: PropTypes.bool.isRequired,
  selection: PropTypes.bool.isRequired,
  notes: PropTypes.bool.isRequired,
};

export default CustomerInforDialog;
