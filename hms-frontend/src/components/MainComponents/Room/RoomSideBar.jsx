import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const typeOptionsBtn = ["VIP", "ONE PERSON ONE BED", "TWO PERSON", "ALL"];

const StyledBox = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "white",
  borderRadius: 5,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  color: "black",
  padding: "10px",
}));

function RoomSideBar({ onTypeSelected, onStatusSelected }) {
  const [typeExpanded, setTypeExpanded] = useState(true);
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [value, setValue] = useState("active");

  const typeHandleClick = (option) => {
    onTypeSelected(option);
  };

  const handleRadioChange = (event) => {
    const selectedStatus = event.target.value;
    setValue(selectedStatus);
    onStatusSelected(selectedStatus);
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "var(--default-layout-sidebar-width)", mr: "30px" }}
      >
        {/* NAME */}
        <StyledBox component="form">
          <Stack spacing={1}>
            <div>Name:</div>
            <TextField id="outlined-search" type="search" variant="standard" />
          </Stack>
        </StyledBox>
        {/* TYPE */}
        <StyledBox>
          <Accordion
            expanded={typeExpanded}
            onChange={() => {
              setTypeExpanded(!typeExpanded);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="type-content"
              id="type-header"
            >
              Type
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {typeOptionsBtn.map((option) => (
                  <Button key={option} onClick={() => typeHandleClick(option)}>
                    {option}
                  </Button>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </StyledBox>
        {/* STATUS */}
        <StyledBox>
          <Accordion
            expanded={statusExpanded}
            onChange={() => {
              setStatusExpanded(!statusExpanded);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="status-content"
              id="status-header"
            >
              Status
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="status_radio_group"
                    name="controlled-status-radio-group"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive"
                    />
                    <FormControlLabel
                      value="both"
                      control={<Radio />}
                      label="Both"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </StyledBox>
      </Stack>
    </>
  );
}

RoomSideBar.propTypes = {
  onTypeSelected: PropTypes.func.isRequired,
  onStatusSelected: PropTypes.func.isRequired,
};

export default RoomSideBar;
