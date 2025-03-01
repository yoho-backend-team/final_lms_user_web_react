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
          "& .MuiTabs-indicator": { backgroundColor: "#0000FF" }, // Blue underline
          "& .MuiTab-root": {
            color: "#0000FF", // Blue text
            fontSize: "18px", // Increased font size
            transition: "color 0.3s ease",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#0000FF", // Blue when selected
            fontWeight: "bold",
          },
          "& .MuiTab-root:hover": {
            color: "#0000FF", // Blue on hover
          },
        }}
        aria-label="class tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.title} value={tab.value} />
        ))}
      </Tabs>
    </Card>
  );
};

export default ClassTabs;

