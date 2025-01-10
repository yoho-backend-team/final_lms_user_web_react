import React from "react";
import { Box } from "@mui/material";
import FilterHeader from "./FilterCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(32, 201, 151, 1)",
  durationColor: "rgba(210, 244, 234, 1)",
};

const ClassHistory = ({ data, classType, filters, onFilterChange, onResetFilters }) => {
  return (
    <Box>
      <FilterHeader
        filters={filters}
        classType={classType}
        data={data}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />
    </Box>
  );
};

export default ClassHistory;
