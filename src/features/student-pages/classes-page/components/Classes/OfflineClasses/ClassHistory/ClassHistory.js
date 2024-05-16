import React, { useState } from "react";
import {
  Button,
  Paper,
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RefreshIcon from "@mui/icons-material/Refresh";
import useMediaQuery from "@mui/material/useMediaQuery";

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
];

function StudentOfflineClassHistory() {
  const matches = useMediaQuery('(min-width:600px)');
  const [classFilter, setClassFilter] = useState([]);
  const [courseFilter, setCourseFilter] = useState([]);
  const [monthFilter, setMonthFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);

  const handleChange = (filterSetter) => (event) => {
    filterSetter(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="class-filter-label">All Class</InputLabel>
            <Select
              labelId="class-filter-label"
              id="class-filter"
              multiple
              value={classFilter}
              onChange={handleChange(setClassFilter)}
              input={<OutlinedInput label="All Class" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="course-filter-label">All Course</InputLabel>
            <Select
              labelId="course-filter-label"
              id="course-filter"
              multiple
              value={courseFilter}
              onChange={handleChange(setCourseFilter)}
              input={<OutlinedInput label="All Course" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="month-filter-label">All Month</InputLabel>
            <Select
              labelId="month-filter-label"
              id="month-filter"
              multiple
              value={monthFilter}
              onChange={handleChange(setMonthFilter)}
              input={<OutlinedInput label="All Month" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id="year-filter-label">All Year</InputLabel>
            <Select
              labelId="year-filter-label"
              id="year-filter"
              multiple
              value={yearFilter}
              onChange={handleChange(setYearFilter)}
              input={<OutlinedInput label="All Year" />}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            style={{ borderRadius: "50px", color: "red" }}
            onClick={() => {
              setClassFilter([]);
              setCourseFilter([]);
              setMonthFilter([]);
              setYearFilter([]);
            }}
          >
            <RefreshIcon style={{ marginBottom: "-5px" }} />
            Reset Filter
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Example class entries */}
        {Array.from({ length: 3 }).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Paper>
              <Box sx={{
                display: "flex",
                flexDirection: matches ? "row" : "column",
                justifyContent: "space-between",
                alignItems: matches ? "center" : "flex-start",
                padding: "20px"
              }}>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography variant="h3">Basic of User Experience</Typography>
                  <Typography variant="subtitle1">UI/UX Design</Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography variant="h5">
                    <AccessTimeIcon style={{ marginBottom: "-5px" }} />#32022024
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography variant="h5">
                    <CalendarTodayIcon style={{ marginBottom: "-5px" }} />14 Feb 2024
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography variant="h5" style={{ backgroundColor: "lightblue", color: "darkblue", borderRadius: "10px" }}>
                    45 min
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Button variant="outlined" style={{ borderRadius: "50px", backgroundColor: "#ceefae", color: "#8FCE00" }}>
                    Schedule to Jan 15th 2020
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default StudentOfflineClassHistory;
