import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Paper,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import TimelineComponent from "features/instructor-pages/activity-logs-page/components/Timeline";
import CustomPagination from "features/instructor-pages/activity-logs-page/components/customPaginaton";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivity } from "features/instructor-pages/activity-logs-page/redux/thunks";
import { selectInstructorActivityLogs, selectLoading } from "features/instructor-pages/activity-logs-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";

const styledInput = styled('input')({
  padding: "11.8px 14.8px 12px 14.8px",
  border: "0.74px solid #C1C1C1",
  borderRadius: "11px",
  background: "#FFFFFF",
  cursor : "pointer"
});

const ActivityLogsPage = () => {
  const dispatch = useDispatch();
  const activityLogs = useSelector(selectInstructorActivityLogs);
  const loading = useSelector(selectLoading)
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [week, setWeek] = useState("Past Week");
  const { showSpinner , hideSpinner } = useSpinner()

  const updateActivitys = async (data) => {
    dispatch(getAllActivity(data));
  };

  useEffect(() => {
    updateActivitys();
  }, [dispatch]);

 const handleToChange = async(value) => {
   try {
     showSpinner()
      setToDate(value)
      const createdAt = { $gte : new Date(fromDate).toISOString(), $lte : new Date(value).toISOString()}
      console.log(typeof(createdAt?.$gte),typeof(createdAt.$lte))
      await updateActivitys({ timestamp : createdAt })
   } catch (error) {

   }finally{
     hideSpinner()
   }
 }

  return (
    <Box
      sx={{
        display: "flex",
        padding: "60px 40px 20px 40px",
      }}
    >
      <Box
        sx={{
          borderRadius: "18px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 45px 28px 30px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              Activity Log
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
          <FormControl
        sx={{
          display: "inline-flex",
          gap: "6px",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ color: "#232323", fontWeight: 400, fontSize: "12.8px" }}>
          From
        </FormLabel>
        <TextField
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          sx={{
            marginRight: 2,
            cursor: "pointer",  
            "& .MuiInputBase-input": {
              cursor: "pointer"  
            },
            '&::-webkit-calendar-picker-indicator': {
              display: 'none',
              '-webkit-appearance': 'none'
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl
        sx={{
          display: "inline-flex",
          gap: "6px",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ color: "#232323", fontWeight: 400, fontSize: "12.8px" }}>
          To
        </FormLabel>
        <TextField
          type="date"
          value={toDate}
          onChange={(e) => handleToChange(e.target.value)}
          disabled={!fromDate}  
          sx={{
            marginRight: 2,
            cursor: "pointer", 
            "& .MuiInputBase-input": {
              cursor: "pointer"  
            },
            '&::-webkit-calendar-picker-indicator': {
              display: 'none',
              '-webkit-appearance': 'none'
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
            <FormControl sx={{ display: "none" }}>
              <TextField
                select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                sx={{ width: 150 }}
              >
                <MenuItem value="Past Week">Past Week</MenuItem>
                <MenuItem value="Past Month">Past Month</MenuItem>
                <MenuItem value="Past Year">Past Year</MenuItem>
              </TextField>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Paper sx={{ boxShadow: "none" }}>
            <Box sx={{ maxHeight: 500, overflow: "auto", padding: 2 }}>
              <TimelineComponent activity_logs={activityLogs?.data} />
            </Box>
            <CustomPagination
              totalPages={activityLogs?.pagination?.totalPages}
              currentPage={activityLogs?.pagination?.currentPage}
              setCurrentPage={setPage}
              updateActivitys={updateActivitys}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityLogsPage;
