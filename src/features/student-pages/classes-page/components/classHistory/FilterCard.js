import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import NoDataImage from '../../../../../assets/no-data.jpg';
import ClassCard from "../card/ClassCard";


const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(32, 201, 151, 1)",
  durationColor: "rgba(210, 244, 234, 1)",
};



const FilterHeader = ({ filters, onFilterChange, onResetFilters, data,classType }) => {
  // Extract unique course names without duplicates
  const uniqueCourses = [...new Set(data?.map((course) => course.course?.course_name))];

  // Filter data based on selected filters
  const filteredData = data?.filter((item) => {
    const startDate = new Date(item.start_date); // Convert start_date to a Date object
    const itemYear = startDate.getFullYear().toString(); // Extract year as string
    const itemMonth = startDate.toLocaleString("default", { month: "long" }).toLowerCase(); // Extract month name

    const matchesCourse = !filters.course || item.course?.course_name === filters.course;
    const matchesYear = !filters.year || itemYear === filters.year;
    const matchesMonth = !filters.month || itemMonth === filters.month.toLowerCase();

    return matchesCourse && matchesYear && matchesMonth;
  });

  // Log filtered data to debug filtering results
  console.log(filteredData, "filtered data");

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px", mb: 2, px: "50px", mt: 3 }}>
        <FormControl sx={{ minWidth: 120, position: "relative" }}>
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
            <MenuItem value="">All Courses</MenuItem>
            {uniqueCourses.map((courseName, index) => (
              <MenuItem key={index} value={courseName}>
                {courseName}
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
            {[
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ].map((month) => (
              <MenuItem key={month} value={month}>
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </MenuItem>
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
            {["2023", "2024"].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
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
      {/* Render filtered data or a message if empty */}
      {filteredData?.length > 0 ? (
        <Box>
        {filteredData.map((cls, index) => (
          <ClassCard
            key={index}
            cls={cls}
            style={defaultStyles}
            type={classType}
            group={index} 
          />
        ))}
      </Box>
      ) : (
        <Box>
          <img src={NoDataImage} alt="No data available" style={{ maxWidth: '100%', height: 'auto' }} />
          <Typography align="center" fontSize={'32px'} fontStyle={'italic'} fontFamily={'poppins'} paddingRight={160}>
            No Data available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FilterHeader;
