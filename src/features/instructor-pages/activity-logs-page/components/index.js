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

const StyledInput = styled('input')({
  padding: "11.8px 14.8px",
  border: "0.74px solid #C1C1C1",
  borderRadius: "11px",
  background: "#FFFFFF",
});

const TopBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  backgroundColor: "#e0f7fa", 
  padding: "10px",
  borderRadius: "8px",
  flexWrap: "wrap",
});

const ActivityLog = ({ data }) => {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [week, setWeek] = useState("Past Week");
  const [filteredData, setFilteredData] = useState(data?.data || []);

  useEffect(() => {
    const filterLogs = () => {
      let filtered = data?.data || [];

    
      if (fromDate) {
        filtered = filtered.filter(log => new Date(log.date) >= new Date(fromDate));
      }
      if (toDate) {
        filtered = filtered.filter(log => new Date(log.date) <= new Date(toDate));
      }

      
      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      const yearAgo = new Date();
      yearAgo.setFullYear(today.getFullYear() - 1);
      if (week === "Past Week") {
        filtered = filtered.filter(log => new Date(log.date) >= weekAgo);
      } else if (week === "Past Month") {
        filtered = filtered.filter(log => new Date(log.date) >= monthAgo);
      } else if (week === "Past Year") {
        filtered = filtered.filter(log => new Date(log.date) >= yearAgo);
      }

      setFilteredData(filtered);
    };

    filterLogs();
  }, [fromDate, toDate, week, data]);

  return (
    <Box sx={{ padding: "60px 40px 20px 40px", backgroundColor: "#F5F5F5" }}>
      <Box
        sx={{
          borderRadius: "18px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
          padding: "20px",
          
        }}
      >
        <TopBar>
          <Typography
            sx={{
              color: "#495057",
              fontSize: "24px",
              fontWeight: 700,
              
            }}
          >
            Activity Log
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap",}}>
            <FormControl>
              <FormLabel sx={{ fontSize: "12.8px" }}>From</FormLabel>
              <TextField
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputComponent: StyledInput }}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ fontSize: "12.8px" }}>To</FormLabel>
              <TextField
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputComponent: StyledInput }}
              />
            </FormControl>
            <FormControl>
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
        </TopBar>
        <Paper sx={{ boxShadow: "none", padding: 2 }}>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            <TimelineComponent activity_logs={filteredData} />
          </Box>
          <CustomPagination
            totalPages={data?.pagination?.totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ActivityLog;