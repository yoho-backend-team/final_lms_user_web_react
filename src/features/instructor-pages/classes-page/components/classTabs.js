import React from "react";
import { Box, Card, Tabs, Tab } from "@mui/material";

const ClassTabs = ({ tabs, value, handleChange }) => {
  return (
    <Card elevation={3} sx={{ height: "100%", pl: "40px", boxShadow: "none" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          cursor: "pointer",
          "& .MuiTabs-indicator": { backgroundColor: "#5611B1" },
          color: "#5611B1",
          fontSize: "1rem",
          ".Mui-selected": {
              color : "#5611B1",
          }
        }}
        textColor="#5611B1"
        indicatorColor="#5611B1"
        aria-label="secondary tabs example"
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.title} value={tab.value} sx={{ fontSize: "1.2rem" }} />
        ))}
      </Tabs>
    </Card>
  );
};

export default ClassTabs;

