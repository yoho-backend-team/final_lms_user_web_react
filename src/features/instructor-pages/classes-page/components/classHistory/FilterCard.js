import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useState } from "react";
import { getMonthList, getYearList } from "utils/formatDate";

const FilterHeader = ({ filters, onFilterChange, onResetFilters }) => {
  const [yearList,setYearList] = useState([])
  

  useEffect(() => {
  setYearList(getYearList(2018))
  },[])
  
  return (
  <Box sx={{  position: "sticky", top: "0px", overflow: "hidden" }} >
    <Box sx={{ display: "flex", gap: "20px", mb: 2, px: "50px", mt: 3 ,}}>
      <FormControl sx={{ minWidth: 120 }}>
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
      <FormControl sx={{ minWidth: 120 }}>
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
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>All Month</InputLabel>
        <Select
          value={filters.month}
          onChange={(e) => onFilterChange("month", e.target.value)}
          sx={{ backgroundColor: "white" }}
        >
          <MenuItem value="">All Month</MenuItem>
          {
            getMonthList().map((month) => 
               <MenuItem value={month} key={month} >{month}</MenuItem>
            )
          }
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
          {
            yearList?.map((year) => 
              <MenuItem value={year} id={year}  key={year} >{year}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* <RestartAltIcon color="#EA0234" sx={{color:"red"}} /> */}
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
)}

export default FilterHeader;
