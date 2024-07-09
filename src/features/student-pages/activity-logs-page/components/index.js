import React, { useState } from "react";
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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { TimelineOppositeContent } from "@mui/lab";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StudentActivityLog = () => {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [week, setWeek] = useState("Past Week");
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const activityLogs = [
    {
      id: 1,
      type: "Accessing the Account details",
      status: "Success",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
    {
      id: 2,
      type: "Accessing the Account details",
      status: "Failed",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
    {
      id: 3,
      type: "Delete Process",
      status: "Success",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
    {
      id: 4,
      type: "Delete Process",
      status: "Failed",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
    {
      id: 5,
      type: "Password Change",
      status: "Success",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
    {
      id: 6,
      type: "Password Change",
      status: "Failed",
      date: "11-07-2023",
      time: "4:30 am",
      user: "ABC",
    },
  ];

  const paginatedLogs = activityLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <CheckCircleIcon color="primary" />;
      case "Failed":
        return <CancelIcon color="error" />;
      default:
        return <AccessTimeIcon color="action" />;
    }
  };

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
                <FormLabel>From</FormLabel>
                <TextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  sx={{ marginRight: 2 }}
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
                <FormLabel>To</FormLabel>
                <TextField
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
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
          </Box>
          <Box>
            <Paper sx={{ boxShadow: "none" }}>
              <Box sx={{ maxHeight: 500, overflow: "auto", padding: 2 }}>
                <Timeline position="right" sx={{ alignItems: "flex-start" }}>
                  {paginatedLogs.map((log, index) => (
                    <TimelineItem key={log.id}>
                      <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                          {log.date}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot>{getStatusIcon(log.status)}</TimelineDot>
                        {index < paginatedLogs.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box>
                            <Typography variant="h6" component="span">
                              {log.type}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              borderTop: "1px solid #e0e0e0",
                              marginTop: 1,
                              paddingTop: 1,
                              overflowY: "auto",
                            }}
                          >
                            <Typography variant="body2" color="textSecondary">
                              Time: {log.time} | User: {log.user}
                            </Typography>
                            <Typography>{log.status}</Typography>
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
            </Paper>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", pr: "35px" }}
            >
              <Pagination
                count={Math.ceil(activityLogs.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{ marginTop: 2 }}
              />
            </Box>
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

export default StudentActivityLog;
