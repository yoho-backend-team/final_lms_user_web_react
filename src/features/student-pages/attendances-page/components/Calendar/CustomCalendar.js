import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
import back from "../../../../../assets/images/pages/background_1.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CustomCalendar({ attendanceData,getAttedenceDetails, attendance_data }) {
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
    getAttedenceDetails(months[event?.target?.value])
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
    
      const status = attendance_data?.formattedAttendance?.attendance?.filter((i)=>new Date(i?.date).getDate() === date?.getDate())
      
      const attendanceStatus = status?.[0]?.status || "Absent";
      
      days.push(
        <Grid item xs={2.4} key={i} >
          <Card>
            <CardContent sx={{cursor:'pointer',p: '10px 33px 17px 11px',transition: 'background 0.3s ease',
              '&:hover': {
                background: '#0D6EFD',
                color: "white"
              }}}>
              <Typography sx={{ color: "inherit",textalign: 'center',fontfamily: 'Poppins',fontsize: '11.395px',fontstyle: 'normal',fontweight: '300',lineheight: 'normal',pb:"9px",width: '46.064px',height: '12.292px',flexshrink: 0}}>
                {dayOfWeek}
              </Typography>
              <Typography
                sx={{ color: "inherit", fontSize: "21px", fontWeight: "300", textAlign: "end",fontfamily: 'Poppins',pb:'11px',":hover":{ color: "white"}}}
              >
                {i}
              </Typography>
              <Button
                sx={{
                  backgroundColor:
                  status?.[0]?.status === "present" ? "#14BC10" : "#FF4B4B",
                  padding: "9px",
                  fontSize:"13px",
                  fontWeight:500,
                  lineHeight:'14px',
                  borderRadius:'9px',
                  color: "white",
                  fontfamily: "Public Sans",
                  display: 'flex',
                  width: '58px',
                  height: '18px',
                  padding: '4.383px 8.765px',
                  alignitems: 'center',
                  gap: '8.765px',
                  flexshrink: 0,
                }}
                // onClick={() => handleAttendanceChange(i)}
              >
                {attendanceStatus}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    }
 
    return days;
  };

  const handleNextMonth = () => {

    if(selectedMonth!==11){
      setSelectedMonth(selectedMonth+1)
      getAttedenceDetails(months[selectedMonth+1])
    }else{
      setSelectedMonth(0)
      getAttedenceDetails(months[0])
    }
  }

  const handlePreviousMonth = () => {
    if(selectedMonth !== 1){
      setSelectedMonth(selectedMonth-1)
      getAttedenceDetails(months[selectedMonth-1])
    }else{
      setSelectedMonth(0)
      getAttedenceDetails(months[0])
    }
  }
  
  return (
    <Box sx={{ height: '67vh', display: 'flex', flexDirection: 'column' }}>
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
            <FormControl
              style={{
                marginLeft: "11px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                IconComponent={(props) => <ExpandMoreIcon  sx={{ color: "#0D6EFD" }} />}
                value={selectedMonth}
                onChange={handleMonthChange}
                size="small"
                sx={{
                  color: "#0D6EFD",
                  backgroundColor: "#CCE1FF",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  minWidth: "89px",
                  padding: "0px", 
                  border: "none",
                  borderBottom: "none", 
                  borderRadius: "8px",
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
                // variant="filled"
                inputProps={{ 'aria-label': 'Select month' }}
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
            <Typography sx={{ color : "#0D6EFD", fontSize: "15px", fontWeight : 700, lineHeight : "24px"}} >{months[selectedMonth-1]}</Typography>
         </Box>
         <Box sx={{ display: 'flex',cursor: "pointer"}} onClick={handleNextMonth} >
            <Typography  sx={{ color : "#0D6EFD", fontSize: "15px", fontWeight : 700, lineHeight : "24px"}} >{months[selectedMonth]}</Typography>
            <ChevronRightIcon sx={{ width : "24px", height : "24px", cursor: "pointer"}} />
         </Box>
      </Box>
    </Box>
  );
}

export default CustomCalendar;
