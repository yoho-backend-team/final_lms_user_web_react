import React, { useState, useEffect } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const fetchData = async (endpoint) => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Option 1", "Option 2", "Option 3"]);
    }, 1000);
  });
};

function StudentOfflineClassHistory() {
  const matches = useMediaQuery("(min-width:600px)");
  const [classFilter, setClassFilter] = useState([]);
  const [courseFilter, setCourseFilter] = useState([]);
  const [monthFilter, setMonthFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchData("classes").then(setClasses);
    fetchData("courses").then(setCourses);
    fetchData("months").then(setMonths);
    fetchData("years").then(setYears);
  }, []);

  const handleChange = (filterSetter) => (event) => {
    filterSetter(event.target.value);
  };

  const resetFilters = () => {
    setClassFilter([]);
    setCourseFilter([]);
    setMonthFilter([]);
    setYearFilter([]);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl
            sx={{
              m: 1,
              minWidth: 140,
              color: "var(--Gray-700, #495057)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            <InputLabel id="class-filter-label">All Class</InputLabel>
            <Select
              labelId="class-filter-label"
              id="class-filter"
              multiple
              value={classFilter}
              onChange={handleChange(setClassFilter)}
              IconComponent={ExpandMoreIcon}
              input={<OutlinedInput label="All Class" />}
            >
              {classes.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            sx={{
              m: 1,
              minWidth: 140,
              color: "var(--Gray-700, #495057)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            <InputLabel id="course-filter-label">All Course</InputLabel>
            <Select
              labelId="course-filter-label"
              id="course-filter"
              multiple
              value={courseFilter}
              onChange={handleChange(setCourseFilter)}
              IconComponent={ExpandMoreIcon}
              input={<OutlinedInput label="All Course" />}
            >
              {courses.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            sx={{
              m: 1,
              minWidth: 140,
              color: "var(--Gray-700, #495057)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            <InputLabel id="month-filter-label">All Month</InputLabel>
            <Select
              labelId="month-filter-label"
              id="month-filter"
              multiple
              value={monthFilter}
              onChange={handleChange(setMonthFilter)}
              IconComponent={ExpandMoreIcon}
              input={<OutlinedInput label="All Month" />}
            >
              {months.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            sx={{
              m: 1,
              minWidth: 140,
              color: "var(--Gray-700, #495057)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            <InputLabel id="year-filter-label">All Year</InputLabel>
            <Select
              labelId="year-filter-label"
              id="year-filter"
              multiple
              value={yearFilter}
              onChange={handleChange(setYearFilter)}
              IconComponent={ExpandMoreIcon}
              input={<OutlinedInput label="All Year" />}
            >
              {years.map((name) => (
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
            onClick={resetFilters}
          >
            <RefreshIcon style={{ marginBottom: "-5px" }} />
            Reset Filter
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Example class entries */}
        <Grid item xs={12}>
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: matches ? "row" : "column",
                justifyContent: "space-between",
                alignItems: matches ? "center" : "flex-start",
                padding: "20px",
                width: "100%",
                height: "80px",
                flexShrink: 0,
              }}
            >
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "22px" /* 157.143% */,
                  }}
                >
                  Basics of User Experience
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "16px" /* 157.143% */,
                  }}
                >
                  UX Design
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <PeopleAltIcon sx={{ marginRight: "8px" }} /> #3022024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> 14 Feb
                  2024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <HourglassTopIcon />
                  45 min
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ceefae",
                    color: "#8FCE00",
                    borderRadius: "50px",
                    minWidth: "200px",
                  }}
                >
                  Schedule to Jan 15th 2020
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: matches ? "row" : "column",
                justifyContent: "space-between",
                alignItems: matches ? "center" : "flex-start",
                padding: "20px",
                width: "100%",
                height: "80px",
                flexShrink: 0,
              }}
            >
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "22px" /* 157.143% */,
                  }}
                >
                  Basics of User Experience
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "16px" /* 157.143% */,
                  }}
                >
                  UX Design
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <PeopleAltIcon sx={{ marginRight: "8px" }} /> #3022024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> 14 Feb
                  2024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <HourglassTopIcon />
                  45 min
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#000",
                    borderRadius: "50px",
                    minWidth: "200px",
                  }}
                >
                  Completed
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: matches ? "row" : "column",
                justifyContent: "space-between",
                alignItems: matches ? "center" : "flex-start",
                padding: "20px",
                width: "100%",
                height: "80px",
                flexShrink: 0,
              }}
            >
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "22px" /* 157.143% */,
                  }}
                >
                  Basics of User Experience
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                    fontFamily: "Poppins",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "16px" /* 157.143% */,
                  }}
                >
                  UX Design
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <PeopleAltIcon sx={{ marginRight: "8px" }} /> #3022024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <CalendarTodayIcon style={{ marginBottom: "-5px" }} /> 14 Feb
                  2024
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--Gray-600, #6C757D)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  <HourglassTopIcon />
                  45 min
                </Typography>
              </Box>
              <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ffcccc",
                    color: "#ff0000",
                    borderRadius: "50px",
                    minWidth: "200px",
                  }}
                >
                  Postponed to Feb 14th 2024
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default StudentOfflineClassHistory;
