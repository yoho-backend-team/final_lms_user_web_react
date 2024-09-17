import React from "react";
import { Box } from "@mui/material";
import ClassCard from "../card/ClassCard";
import FilterHeader from "./FilterCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(32, 201, 151, 1)",
  durationColor: "rgba(210, 244, 234, 1)",
};

const ClassHistory = ({ data, classType, filters, onFilterChange, onResetFilters }) => {

  return (
    <>
      <FilterHeader
        filters={filters}
        classType={classType}
        data={data}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />
      {/* <Box sx={{ mt: 3, px: "40px" }}>
        {data.map((cls, index) => (
          <ClassCard
            key={cls.id}
            cls={cls}
            style={defaultStyles}
            type={classType}
            group={index}
          />
        ))}
      </Box> */}
    </>
  );
};

export default ClassHistory;
