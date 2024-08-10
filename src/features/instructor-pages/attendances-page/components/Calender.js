
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  MenuItem,
  Select,
  FormControl,
  Typography,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  Box,
} from "@mui/material";
import back from "../../../../assets/images/pages/background_1.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function InstructorAttendance({ attendanceData,getAttedenceDetails, attendance_data ,handleUpdateDetails}) {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    backgroundImage: `url(${back})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }));

  const formatAttendanceForMonth = (attendanceData, month) => {
    const year = new Date().getFullYear();
    return attendanceData
      .filter(
        ({ date }) =>
          new Date(date).getMonth() === month &&
          new Date(date).getFullYear() === year,
      )
      .map(({ date, status }) => ({
        date: new Date(date).getDate(),
        status: status.charAt(0).toUpperCase() + status.slice(1),
      }));
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const formattedAttendance = formatAttendanceForMonth(
      attendanceData,
      selectedMonth,
    );
    const attendanceObject = formattedAttendance.reduce(
      (acc, { date, status }) => {
        acc[date] = status;
        return acc;
      },
      {},
    );
    setAttendance(attendanceObject);
  }, [selectedMonth]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    handleUpdateDetails(months[event?.target?.value])
    handleUpdateDetails(months[event.target.value])
  };

  const handleAttendanceChange = (day) => {
    const currentStatus = attendance[day];
    const newStatus = currentStatus === "Present" ? "Absent" : "Present";
    setAttendance({ ...attendance, [day]: newStatus });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(new Date().getFullYear(), selectedMonth);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), selectedMonth, i);
      const dayOfWeek = daysOfWeek[date.getDay()];
    
      const status = attendance_data?.workingDays?.filter((i)=>new Date(i?.date).getDate() === date?.getDate())
      const attendanceStatus = status?.[0]?.status || "Absent";
      
      days.push(
        <Grid item xs={2.4} key={i}>
          <Card sx={{ ":hover":{
            backgroundColor : "#5611B1",
            color : "white",
            cursor : "pointer"
          } }} >
            <CardContent>
              <Typography sx={{ fontSize: "11px", fontWeight: 300, color : "inherit" }}>
                {dayOfWeek}
              </Typography>
              <Typography
                sx={{ fontSize: "21px", fontWeight: "300", textAlign: "end", color : "inherit" }}
              >
                {i}
              </Typography>
              <Button
                sx={{
                  backgroundColor:
                  status?.[0]?.status === "present" ? "#14BC10" : "#FF4B4B",
                  padding: "0px",
                  color: "white",
                  ":hover":{
                    backgroundColor: status?.[0]?.status === "present" ? "#14BC10" : "#FF4B4B",
                  }
                }}
                // onClick={() => handleAttendanceChange(i)}
              >
                {attendanceStatus}
              </Button>
            </CardContent>
          </Card>
        </Grid>,
      );
    }

    return days;
  };

  const handleNextMonth = () => {
    if(selectedMonth!==11){
      setSelectedMonth(selectedMonth+1)
      handleUpdateDetails(months[selectedMonth+1])
    }else{
      setSelectedMonth(0)
      handleUpdateDetails(months[0])
    }
  }

  const handlePreviousMonth = () => {
    if(selectedMonth !== 1){
      setSelectedMonth(selectedMonth-1)
      handleUpdateDetails(months[selectedMonth-1])
    }else{
      setSelectedMonth(0)
      handleUpdateDetails(months[0])
    }
  }



  return (
    <Box sx={{ height:  '66vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexShrink: 0 }}>
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-between" }}
          sx={{ px: "40px", py: "20px" }}
        >
          <Grid
            item
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Calendar View</Typography>
            <FormControl style={{ marginLeft: "5px" }}>
              <Select
                IconComponent={() => <ExpandMoreIcon sx={{ color : "#5611B1"}} /> }
                value={selectedMonth}
                onChange={handleMonthChange}
                size="small"
                sx={{
                  color: "#5611B1",
                  backgroundColor: "#DFC7FF",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  minWidth: "89px",
                  '& .MuiSelect-icon': {
                    top: '50%', 
                    right: '10px', 
                    color: "#0D6EFD",
                  },
                  "&.MuiSelect-nativeInput	":{
                     border : "none"
                  },
                  '& .MuiSelect-select': {
                    padding: '5px 10px',
                    display : "flex",
                    justifyContent : "center", 
                    boxShadow : "none"
                  },
                  '& .MuiInputBase-root': {
                    padding: '0px', 
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  }
                }}
                variant="outlined"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: "25px" }}>
        <Grid container spacing={2}>
          {generateDays()}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "flex-end", gap: "40px", verticalAlign: "end",pt:"40px",px:"25px"}} >
         <Box sx={{ display: selectedMonth ? "flex" : "none",cursor: "pointer"}} onClick={handlePreviousMonth} >
            <KeyboardArrowLeftIcon  sx={{ width : "24px", height : "24px"}} />
            <Typography sx={{ color : "#5611B1", fontSize: "15px", fontWeight : 700, lineHeight : "24px"}} >{months[selectedMonth-1]}</Typography>
         </Box>
         <Box sx={{ display: 'flex',cursor: "pointer"}} onClick={handleNextMonth} >
            <Typography  sx={{ color : "#5611B1", fontSize: "15px", fontWeight : 700, lineHeight : "24px"}} >{months[selectedMonth]}</Typography>
            <ChevronRightIcon sx={{ width : "24px", height : "24px", cursor: "pointer"}} />
         </Box>
      </Box>
    </Box>
  );
}

export default InstructorAttendance;
