import RoomSideBar from "./RoomSideBar";
import RoomList from "./RoomList";

//import classNames from "classnames/bind";
//import styles from "./Room.module.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RoomType from "./RoomType";
//const cx = classNames.bind(styles);

function Room() {
  const [typeSelected, setTypeSelected] = useState(null);

  const handleTypeSelected = (type) => {
    setTypeSelected(type);
  };

  const [statusSelected, setStatusSelected] = useState(null);

  const handleStatusSelected = (status) => {
    setStatusSelected(status);
  };

  const [tabValue, setTabValue] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box
      sx={{ width: "100%", typography: "body1", bgcolor: "background.paper" }}
    >
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChangeTab}
            centered
            textColor="#132046"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#009394",
              },
            }}
          >
            <Tab label="Room Type" value="1" />
            <Tab label="Room List" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RoomType />
        </TabPanel>
        <TabPanel value="2" sx={{ display: "flex" }}>
          <RoomSideBar
            onTypeSelected={handleTypeSelected}
            onStatusSelected={handleStatusSelected}
          />
          <RoomList
            selectedType={typeSelected}
            selectedStatus={statusSelected}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Room;
