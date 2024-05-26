import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import format from "date-fns/format";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
} from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import styles from "./Report.module.css";

import InputLabel from "@mui/material/InputLabel";

const cx = classNames.bind(styles);
const StyledBox = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "white",
  borderRadius: 5,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  color: "black",
  padding: "10px",
}));

export function RevenueReportSideBar({
  onDisplayTypeSelected,
  onDateRangeSelected,
  onYearSelected,
  year,
}) {
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [timeExpanded, setTimeExpanded] = useState(true);
  const [value, setValue] = useState("report-chart");

  const handleChange = (e) => {
    onYearSelected(e.target.value);
  };

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleRadioChange = (event) => {
    const selectedDisplayType = event.target.value;
    setValue(selectedDisplayType);
    onDisplayTypeSelected(selectedDisplayType);
  };

  const CalendarLabel = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "var(--default-layout-sidebar-width)", mr: "30px" }}
    >
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
            aria-controls="display-type-content"
            id="display-type-header"
          >
            Display type
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <FormControl>
                <RadioGroup
                  aria-labelledby="display_type_radio_group"
                  name="controlled-display-type-radio-group"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="report-chart"
                    control={<Radio />}
                    label="Chart"
                  />
                  <FormControlLabel
                    value="report-pdf"
                    control={<Radio />}
                    label="Report"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </StyledBox>
      {/* Time */}
      <StyledBox>
        <Accordion
          expanded={timeExpanded}
          onChange={() => {
            setTimeExpanded(!timeExpanded);
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="status-content"
            id="status-header"
          >
            Year
          </AccordionSummary>
          <AccordionDetails>
            <CalendarLabel />
          </AccordionDetails>
        </Accordion>
      </StyledBox>
    </Stack>
  );
}

export function RoomBookingReportSideBar({ onDisplayTypeSelected }) {
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [timeExpanded, setTimeExpanded] = useState(true);
  const [value, setValue] = useState("report-chart");
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const shortcuts = [
    {
      label: "This week",
      dates: [startOfWeek(new Date()), endOfWeek(new Date())],
    },
    {
      label: "Last week",
      dates: [
        startOfWeek(addDays(new Date(), -7)),
        endOfWeek(addDays(new Date(), -7)),
      ],
    },

    {
      label: "This month",
      dates: [startOfMonth(new Date()), endOfMonth(new Date())],
    },
    {
      label: "This year",
      dates: [startOfYear(new Date()), new Date()],
    },
  ];
  const typeroom = [
    {
      value: "P1G2",
      label: "Phòng 1 giường đôi",
    },
    {
      value: "P1G1",
      label: "Phòng 1 giường đơn",
    },
    {
      value: "P1G2G1",
      label: "Phòng 1 giường đôi và 1 giường đơn",
    },
    {
      value: "P2G1",
      label: "Phòng 2 giường đơn",
    },
  ];
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleRadioChange = (event) => {
    const selectedDisplayType = event.target.value;
    setValue(selectedDisplayType);
    onDisplayTypeSelected(selectedDisplayType);
  };
  const CalendarLabel = () => (
    <div className={cx("calendarWrap")}>
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        className={cx("inputBox")}
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className={cx("calendarElement")}
          />
        )}
        <div className="shortcuts">
          <Select>
            {shortcuts.map((shortcut) => (
              <MenuItem
                key={shortcut.label}
                onClick={() =>
                  setRange([
                    {
                      startDate: shortcut.dates[0],
                      endDate: shortcut.dates[1],
                      key: "selection",
                    },
                  ])
                }
              >
                {shortcut.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ width: "var(--default-layout-sidebar-width)", mr: "30px" }}
    >
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
            aria-controls="display-type-content"
            id="display-type-header"
          >
            Display type
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <FormControl>
                <RadioGroup
                  aria-labelledby="display_type_radio_group"
                  name="controlled-display-type-radio-group"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="report-chart"
                    control={<Radio />}
                    label="Chart"
                  />
                  <FormControlLabel
                    value="report-pdf"
                    control={<Radio />}
                    label="Report"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </StyledBox>
      {/* Time */}
      <StyledBox>
        <Accordion
          expanded={timeExpanded}
          onChange={() => {
            setTimeExpanded(!timeExpanded);
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="status-content"
            id="status-header"
          >
            Time Booking
          </AccordionSummary>
          <AccordionDetails>
            <CalendarLabel />
          </AccordionDetails>
        </Accordion>
      </StyledBox>
      <StyledBox>
        <TextField
          id="standard-select-currency-native"
          sx={{ width: "280px", height: "100px", fontSize: "8px" }}
          select
          label="Type room select"
          defaultValue="Phòng 1 giường đôi"
          SelectProps={{
            native: true,
          }}
          variant="standard"
        >
          {typeroom.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </StyledBox>
    </Stack>
  );
}
