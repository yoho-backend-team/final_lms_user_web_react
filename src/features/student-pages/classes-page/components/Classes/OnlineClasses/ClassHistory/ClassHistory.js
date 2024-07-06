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

// Mock API call
const fetchClassHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Basics of User Experience",
          subtitle: "UX Design",
          classNumber: "#3022024",
          date: "14 Feb 2024",
          duration: "45 min",
          status: "Scheduled",
          actionDate: "Jan 15th 2020",
        },
        {
          id: 2,
          title: "Advanced User Experience",
          subtitle: "UX Design",
          classNumber: "#3022025",
          date: "15 Mar 2024",
          duration: "1hr 30 min",
          status: "Completed",
        },
        {
          id: 3,
          title: "Intermediate User Experience",
          subtitle: "UX Design",
          classNumber: "#3022026",
          date: "16 Apr 2024",
          duration: "1hr 30 min",
          status: "Postponed",
          actionDate: "Feb 14th 2024",
        },
      ]);
    }, 1000);
  });
};

function StudentOnlineClassHistory() {
  const matches = useMediaQuery("(min-width:600px)");
  const [classHistory, setClassHistory] = useState([]);
  const [classFilter, setClassFilter] = useState([]);
  const [courseFilter, setCourseFilter] = useState([]);
  const [monthFilter, setMonthFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);

  useEffect(() => {
    fetchClassHistory().then(setClassHistory);
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

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const classes = classHistory.map((item) => item.title).filter(unique);
  const courses = classHistory.map((item) => item.subtitle).filter(unique);
  const months = classHistory
    .map((item) =>
      new Date(item.date).toLocaleString("default", { month: "long" }),
    )
    .filter(unique);
  const years = classHistory
    .map((item) => new Date(item.date).getFullYear())
    .filter(unique);

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
        {classHistory.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: matches ? "row" : "column",
                  justifyContent: "space-between",
                  alignItems: matches ? "center" : "flex-start",
                  padding: "20px",
                  width: "1320px",
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
                      fontWeight: 600,
                      lineHeight: "22px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "var(--Gray-Black, var(--Colour-Neutral-1, #000))",
                      fontFamily: "Poppins",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "16px",
                      minWidth: "220px",
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--Gray-600, #6C757D)",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "22px",
                    }}
                  >
                    <PeopleAltIcon sx={{ marginRight: "8px" }} />{" "}
                    {item.classNumber}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--Gray-600, #6C757D)",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "22px",
                    }}
                  >
                    <CalendarTodayIcon style={{ marginBottom: "-5px" }} />{" "}
                    {item.date}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--Gray-600, #6C757D)",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "22px",
                      minWidth: "140px",
                    }}
                  >
                    <HourglassTopIcon />
                    {item.duration}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: matches ? 0 : 2 }}>
                  {item.status === "Scheduled" ? (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#ceefae",
                        color: "#8FCE00",
                        borderRadius: "50px",
                        minWidth: "200px",
                      }}
                    >
                      Schedule to {item.actionDate}
                    </Button>
                  ) : item.status === "Completed" ? (
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
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#ffcccc",
                        color: "#ff0000",
                        borderRadius: "50px",
                        minWidth: "200px",
                      }}
                    >
                      Postponed to {item.actionDate}
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default StudentOnlineClassHistory;
