import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import NoDataImage from '../../../../../assets/no-data.jpg';
import ClassCard, { ClassCardHeader } from "../card/ClassCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(32, 201, 151, 1)",
  durationColor: "rgb(198, 227, 218)",
};

const selectStyles = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

const FilterHeader = ({ filters, onFilterChange, onResetFilters, data, classType }) => {
  const uniqueCourses = [...new Set(data?.map(course => course.course?.course_name))];

  const filteredData = data?.filter(item => {
    const startDate = new Date(item.start_date);
    const year = startDate.getFullYear().toString();
    const month = startDate.toLocaleString("default", { month: "long" }).toLowerCase();

    return (
      (!filters.course || item.course?.course_name === filters.course) &&
      (!filters.year || filters.year === year) &&
      (!filters.month || filters.month.toLowerCase() === month)
    );
  });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, mt: 4 }}>
      {/* Filter Bar */}
      <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
        {/* Course */}
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>All Courses</InputLabel>
          <Select
            value={filters.course}
            onChange={(e) => onFilterChange("course", e.target.value)}
            IconComponent={ArrowDropDownIcon}
            sx={selectStyles}
          >
            <MenuItem value="">All Courses</MenuItem>
            {uniqueCourses.map((name, i) => (
              <MenuItem key={i} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Month */}
        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel>All Month</InputLabel>
          <Select
            value={filters.month}
            onChange={(e) => onFilterChange("month", e.target.value)}
            sx={selectStyles}
          >
            <MenuItem value="">All Month</MenuItem>
            {[
              "january", "february", "march", "april", "may", "june",
              "july", "august", "september", "october", "november", "december"
            ].map(month => (
              <MenuItem key={month} value={month}>{month[0].toUpperCase() + month.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year */}
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>All Year</InputLabel>
          <Select
            value={filters.year}
            onChange={(e) => onFilterChange("year", e.target.value)}
            sx={selectStyles}
          >
            <MenuItem value="">All Year</MenuItem>
            {["2023", "2024"].map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Reset Button */}
        <Button
          onClick={onResetFilters}
          startIcon={<RestartAltIcon />}
          sx={{
            background: "linear-gradient(45deg, #EA0234, #FF5733)",
            color: "#fff",
            borderRadius: "20px",
            textTransform: "uppercase",
            fontWeight: "bold",
            px: 3,
            "&:hover": {
              background: "linear-gradient(45deg, #FF5733, #EA0234)",
              transform: "scale(1.05)",
            },
          }}
        >
          Reset
        </Button>
      </Stack>

      {/* Render Results */}
      {filteredData?.length > 0 ? (
        <Box>
          <ClassCardHeader />
          {filteredData.map((cls, i) => (
            <ClassCard
              key={i}
              cls={cls}
              style={defaultStyles}
              type={classType}
              group={i}
            />
          ))}
        </Box>
      ) : (
        <Box textAlign="center" mt={6}>
          <img
            src={NoDataImage}
            alt="No data available"
            style={{ maxWidth: "300px", width: "100%", marginBottom: "20px" }}
          />
          <Typography variant="h3" fontStyle="italic" fontFamily="Poppins">
            No Data Available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FilterHeader;
