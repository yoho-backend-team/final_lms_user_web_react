import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getMonthList, getYearList } from "utils/formatDate";
import ClassCard, { ClassCardHeader } from "../card/ClassCard";

const FilterHeader = ({ filters, onFilterChange, onResetFilters }) => {
  const [yearList, setYearList] = useState([]);

  useEffect(() => {
    setYearList(getYearList(2018)); // Adjust the year range if needed
  }, []);

  // Check if all filters are filled (not empty or default)
  const isAllFiltersFilled =
    filters.class &&
    filters.course &&
    filters.month &&
    filters.year;

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Sticky Filter Controls */}
      <Box
        sx={{
          position: "sticky",
          top: "0px",
          mb: 2, // Margin to separate from the content below
        }}
      >
        <Box sx={{ display: "flex", gap: "20px", px: "50px", mt: 3 }}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>All Class</InputLabel>
            <Select
              value={filters.class}
              onChange={(e) => onFilterChange("class", e.target.value)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="">All Class</MenuItem>
              <MenuItem value="class1">Class 1</MenuItem>
              <MenuItem value="class2">Class 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>All Course</InputLabel>
            <Select
              value={filters.course}
              onChange={(e) => onFilterChange("course", e.target.value)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="">All Course</MenuItem>
              <MenuItem value="course1">Course 1</MenuItem>
              <MenuItem value="course2">Course 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>All Month</InputLabel>
            <Select
              value={filters.month}
              onChange={(e) => onFilterChange("month", e.target.value)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="">All Month</MenuItem>
              {getMonthList().map((month) => (
                <MenuItem value={month} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>All Year</InputLabel>
            <Select
              value={filters.year}
              onChange={(e) => onFilterChange("year", e.target.value)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value="">All Year</MenuItem>
              {yearList?.map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Conditionally render the Reset Filter button */}
          {isAllFiltersFilled && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={onResetFilters}
                sx={{ color: "#EA0234" }}
                startIcon={<RestartAltIcon />}
              >
                Reset Filter
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Class Card Header (sticky) */}
      <Box sx={{ display: "flex", justifyContent: "space-between", px: "50px", mt: 2 }}>
        <ClassCardHeader /> {/* This renders the header with the column titles */}
      </Box>

      {/* Content Below Sticky Header */}
      <Box sx={{ mt: 4 }}>
        {/* Add your content here */}
        {/* This could be a list of class cards */}
      </Box>
    </Box>
  );
};

export default FilterHeader;
