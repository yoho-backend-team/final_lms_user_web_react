import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Pagination,
  Paper,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomPagination from "./customPagination";
import TimelineComponent from "./Timeline";
import { getAllStudentActivity } from '../services';
import { formatDate, formatTime } from 'utils/formatDate';

const styledInput = styled('input')({
  padding: "11.8px 14.8px 12px 14.8px",
  border: "0.74px solid #C1C1C1",
  borderRadius: "11px",
  background: "#FFFFFF"
});

const ActivityStudentLog = () => {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [week, setWeek] = useState("Past Week");
  const [activityLogs, setActivityLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const logs = await getAllStudentActivity();
        setActivityLogs(logs);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
    };

    fetchActivityLogs();
  }, []);

  useEffect(() => {
    const filterLogs = () => {
      let filtered = [...activityLogs];
    
      // Convert fromDate and toDate to Date objects for comparison
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
    
      if (from && to) {
        filtered = filtered.filter(log => {
          const logDate = new Date(log.date);
          return logDate >= from && logDate <= to;
        });
      }
    
      // Handle week-based filtering
      const now = new Date();
      if (week === "Past Week") {
        const pastWeek = new Date();
        pastWeek.setDate(now.getDate() - 7);
        filtered = filtered.filter(log => new Date(log.date) >= pastWeek);
      } else if (week === "Past Month") {
        const pastMonth = new Date();
        pastMonth.setMonth(now.getMonth() - 1);
        filtered = filtered.filter(log => new Date(log.date) >= pastMonth);
      } else if (week === "Past Year") {
        const pastYear = new Date();
        pastYear.setFullYear(now.getFullYear() - 1);
        filtered = filtered.filter(log => new Date(log.date) >= pastYear);
      }
    
      setFilteredLogs(filtered);
    };

    filterLogs();
  }, [fromDate, toDate, week, activityLogs]);


  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
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
                <FormLabel sx={{ color: "#232323", fontWeight: 400, fontSize: "12.8px" }}>From</FormLabel>
                <TextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput }}
                  tabIndex={1}
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
                <FormLabel sx={{ color: "#232323", fontWeight: 400, fontSize: "12.8px" }}>To</FormLabel>
                <TextField
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput }}
                  tabIndex={2}
                />
              </FormControl>
              <FormControl>
                <TextField
                  select
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  sx={{ width: 150}}
                  tabIndex={3}
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
                <TimelineComponent logs={paginatedLogs} />
              </Box>
              <CustomPagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
              </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export default ActivityStudentLog;
