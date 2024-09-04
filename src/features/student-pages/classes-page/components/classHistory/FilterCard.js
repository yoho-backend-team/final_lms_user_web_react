import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

const FilterHeader = ({ filters, onFilterChange, onResetFilters, data,classType }) => {
  console.log(data,"data")
  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", mb: 2, px: "50px", mt: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>All Class</InputLabel>
          <Select
            value={filters.class}
            onChange={(e) => onFilterChange("class", e.target.value)}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="">All Class</MenuItem>
            <MenuItem value="Live Class">Live Class</MenuItem>
            <MenuItem value="offline">Offline</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, position: 'relative' }}>
          <InputLabel>All Courses</InputLabel>
          <Select
            value={filters.course}
            onChange={(e) => onFilterChange("course", e.target.value)}
            sx={{
              backgroundColor: "white",
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "Poppins",
              lineHeight: "16px",
              border: "1px #ADB5BD", 
              borderRadius: "8px",
            }}
            tabIndex={1}
            variant="outlined"
            iconComponent={ArrowDropDownIcon}
          >
            <MenuItem value="">All Course</MenuItem>
            {data?.map((course, index) => (
              <MenuItem key={index} value={course.id}>
                {course?.course?.course_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>All Month</InputLabel>
          <Select
            value={filters.month}
            onChange={(e) => onFilterChange("month", e.target.value)}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="">All Month</MenuItem>
            {["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].map(month => (
              <MenuItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>All Year</InputLabel>
          <Select
            value={filters.year}
            onChange={(e) => onFilterChange("year", e.target.value)}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="">All Year</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={onResetFilters}
            sx={{ color: "#EA0234" }}
            startIcon={<RestartAltIcon />}
          >
            Reset Filter
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterHeader;
