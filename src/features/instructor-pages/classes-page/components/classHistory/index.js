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

const ClassHistory = ({ data, classType, group, image }) => {
  const [filters, setFilters] = React.useState({
    class: "",
    course: "",
    month: "",
    year: "",
  });

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      class: "",
      course: "",
      month: "",
      year: "",
    });
  };

  console.log(data,"data")
  return (
    <>
      {/* <FilterHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      /> */}
      <Box sx={{ mt: 3, px: "40px" }}>
        {data?.map((cls) => (
          <ClassCard
            key={cls.id}
            cls={cls}
            style={defaultStyles}
            type={classType}
            group={group}
            img={image}
          />
        ))}
      </Box>
    </>
  );
};

export default ClassHistory;
