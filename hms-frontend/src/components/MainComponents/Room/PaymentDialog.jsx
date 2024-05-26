import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  styled,
  TableBody,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "qrcode.react";

function createData(
  roomName,
  type,
  startTime,
  endTime,
  money,
  firstname,
  cusID,
  dayRate,
  nightRate,
  dailyRate,
  gender,
  phone
) {
  return {
    roomName,
    type,
    startTime,
    endTime,
    money,
    firstname,
    cusID,
    dayRate,
    nightRate,
    dailyRate,
    gender,
    phone,
  };
}

const data = createData(
  "303",
  "Suite",
  "23:00/16/05/2024",
  "03:15/17/05/2024",
  1000,
  "Tuan Anh",
  2004,
  50,
  250,
  250,
  "male",
  "0123496894"
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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
    padding: 10,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f7f8f9",
  },
  "& td, & th": {
    border: 0,
  },
}));

const StackItem = ({ label, infor, mT, mB, tag, input, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: 400,
        marginTop: mT ? "20px" : 0,
        marginBottom: mB ? "20px" : 0,
      }}
    >
      <div
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {label}
      </div>
      {tag && <div>{infor}</div>}
      {input && (
        <TextField
          variant="standard"
          size="small"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "right" },
          }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

function PaymentDialog(props) {
  const { openPayDialog, closePaymentDialog, savePayment } = props;

  const [surcharge, setSurcharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmountDue, setTotalAmountDue] = useState(data.money);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const calculatedTotal =
      data.money +
      parseFloat(surcharge) -
      (parseFloat(discount) / 100) * data.money;
    setTotalAmountDue(calculatedTotal.toFixed(2));
  }, [surcharge, discount]);

  const handleSurchargeChange = (event) => {
    setSurcharge(event.target.value);
  };

  const handleDiscountChange = (event) => {
    let discountValue = event.target.value;
    
    if (discountValue < 0) {
      alert("Discount value cannot be negative. Setting discount to 0.");
      discountValue = 0;
    }
    
    if (discountValue > 100) {
      alert("Discount value cannot exceed 100%. Setting discount to 100.");
      discountValue = 100;
    }
  
    setDiscount(discountValue);
  };
  

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // CALCULATE RENTED HOURS.
  const convertTimeString = (timeString) => {
    const [time, date] = timeString.split("/");
    const timeParts = time.split(":");
    const dateParts = date.split("/");
    const hours = timeParts.length > 0 ? parseInt(timeParts[0]) : 0;
    const minutes = timeParts.length > 1 ? parseInt(timeParts[1]) : 0;
    const day = dateParts.length > 0 ? dateParts[0] : "01";
    const month = dateParts.length > 1 ? dateParts[1] : "01";
    const year = dateParts.length > 2 ? dateParts[2] : "1970";
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hours,
      minutes
    ).toISOString();
  };
  const startTime = new Date(convertTimeString(data.startTime));
  const endTime = new Date(convertTimeString(data.endTime));
  const timeDiffMs = endTime - startTime;
  const timeDiffHours = timeDiffMs / (1000 * 60 * 60);

  return (
    <Dialog
      open={openPayDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={closePaymentDialog}
      aria-describedby="payment-dialog"
      fullScreen
      sx={{
        left: "unset",
        right: 0,
        height: "100vh",
        width: "75vw",
        margin: 0,
        animation: "slideInLeft 0.3s ease-out",
        "& .MuiDialog-paper": {
          borderTopLeftRadius: "1.3rem",
          borderBottomLeftRadius: "1.3rem",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
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
        {"PAYMENT OF ROOM: " + data.roomName}
        <IconButton onClick={closePaymentDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: "calc(100vh - 64px)", display: "flex" }}>
          {/* Content 1 */}
          <Box
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            {/* CUSTOMER INFORMATION */}
            <Box>
              <Box
                sx={{
                  backgroundColor: "#ebf5ee",
                  padding: "10px",
                  color: "#1f2224",
                  fontWeight: "500",
                }}
              >
                Customer Information
              </Box>
              <Box sx={{ padding: "10px" }}>
                <StackItem label="Customer name" infor={data.firstname} tag />
                <StackItem
                  label="Identification Number"
                  infor={data.cusID}
                  mT
                  mB
                  tag
                />
                <StackItem label="Gender" infor={data.gender} mT mB tag />
                <StackItem label="Phone" infor={data.phone} tag />
              </Box>
            </Box>
            {/* ROOM INFORMATION */}
            <Table sx={{ marginTop: "20px" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell align="center">Check In</StyledTableCell>
                  <StyledTableCell align="center">Check Out</StyledTableCell>
                  <StyledTableCell align="center">Time</StyledTableCell>
                  <StyledTableCell align="center">Money</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {data.type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.startTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.endTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {timeDiffHours} hours
                  </StyledTableCell>
                  <StyledTableCell align="center">{data.money}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Box>
          {/* Divider */}
          <Box
            sx={{
              width: "1%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                borderLeft: "1px dashed #e1e3e5",
                height: "90%",
                margin: "0 auto",
              }}
            />
          </Box>
          {/* Content 2 */}
          <Box
            sx={{
              width: "39%",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <StackItem label="Room Money" infor={data.money} tag bold mB />
            <StackItem
              label="Surcharge"
              input
              mB
              onChange={handleSurchargeChange}
            />
            <StackItem
              label="Discount (%)"
              input
              mB
              onChange={handleDiscountChange}
            />
            <StackItem label="Total amount due" infor={totalAmountDue} tag mB />
            <FormControl>
              <FormLabel id="Payment Method">Payment Method</FormLabel>
              <RadioGroup
                row
                aria-labelledby="Payment Method"
                name="row-radio-buttons-group"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="bank-transfer"
                  control={<Radio />}
                  label="Bank Transfer"
                />
              </RadioGroup>
            </FormControl>
            {paymentMethod === "bank-transfer" && (
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <QRCode value={`bank-transfer:${totalAmountDue}`} />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={savePayment}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

PaymentDialog.propTypes = {
  openPayDialog: PropTypes.bool.isRequired,
  closePaymentDialog: PropTypes.func.isRequired,
  savePayment: PropTypes.func.isRequired,
};

StackItem.propTypes = {
  label: PropTypes.string.isRequired,
  infor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mT: PropTypes.bool,
  mB: PropTypes.bool,
  tag: PropTypes.bool,
  input: PropTypes.bool,
  bold: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PaymentDialog;
