import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  // Timeline,
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
import CustomPagination from "./customPaginaton";
import TimelineComponent from "./Timeline";

const styledInput = styled('input')({
  padding : "11.8px 14.8px 12px 14.8px",
  border : "0.74px solid #C1C1C1",
  borderRadius : "11px",
  background : "#FFFFFF"
})

const ActivityLog = ({data}) => {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [week, setWeek] = useState("Past Week");
  


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
                  fontSize: "30px",
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
                <FormLabel sx={{ color: "#232323",fontWeight:400,fontSize:"12.8px"}} >From</FormLabel>
                <TextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  sx={{ marginRight: 2}}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput}}
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
                <FormLabel sx={{ color: "#232323",fontWeight:400,fontSize:"12.8px"}} >To</FormLabel>
                <TextField
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput }}
                />
              </FormControl>
              <FormControl sx={{ display : "none"}} >
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
                <TimelineComponent activity_logs={data?.data} />
              </Box>
              <CustomPagination totalPages={data?.pagination?.totalPages} currentPage={data?.pagination?.currentPage} setCurrentPage={setPage} />
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

export default ActivityLog;
