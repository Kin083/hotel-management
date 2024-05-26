import * as React from "react";
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
import userApi from "../../../api/userApi";
//const cx = classNames.bind(styles);

function Room() {
  const [typeSelected, setTypeSelected] = useState(null);
  const [typeList, setTypeList] = React.useState([]);

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

  // GET TYPE FROM API
  React.useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await userApi.getType();
        setTypeList(response);
      } catch (error) {
        console.error("Failed to fetch types", error);
      }
    };

    fetchTypes();
  }, []);
  return (
    <Box
      sx={{ width: "100%", typography: "body1", bgcolor: "background.paper" }}
    >
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChangeTab}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#009394",
              },
              "& .custom-tab-label": {
                color: "#132046",
              },
            }}
          >
            <Tab label="Room Type" value="1" />
            <Tab label="Room List" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <RoomType typeList={typeList} />
        </TabPanel>
        <TabPanel value="2" sx={{ display: "flex", padding: 0 }}>
          <RoomSideBar
            onTypeSelected={handleTypeSelected}
            onStatusSelected={handleStatusSelected}
            typeList={typeList}
          />
          <RoomList
            selectedType={typeSelected}
            selectedStatus={statusSelected}
            typeList={typeList}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Room;
