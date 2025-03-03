// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Paper,
//   FormControl,
//   FormLabel,
// } from "@mui/material";
// import TimelineComponent from "features/instructor-pages/activity-logs-page/components/Timeline";
// import CustomPagination from "features/instructor-pages/activity-logs-page/components/customPaginaton";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllActivity } from "features/instructor-pages/activity-logs-page/redux/thunks";
// import {
//   selectInstructorActivityLogs,
//   selectLoading,
// } from "features/instructor-pages/activity-logs-page/redux/selectors";
// import { useSpinner } from "context/SpinnerProvider";

// const ActivityLogsPage = () => {
//   const dispatch = useDispatch();
//   const activityLogs = useSelector(selectInstructorActivityLogs);
//   const loading = useSelector(selectLoading);
//   const { showSpinner, hideSpinner } = useSpinner();

//   const [page, setPage] = useState(1);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const updateActivitys = async (data = {}) => {
//     dispatch(getAllActivity({ page, ...data }));
//   };

//   useEffect(() => {
//     updateActivitys();
//   }, [page]); // Fetch data when page changes

//   const handleToChange = async (value) => {
//     try {
//       showSpinner();
//       setToDate(value);
//       const createdAt = {
//         $gte: new Date(fromDate).toISOString(),
//         $lte: new Date(value).toISOString(),
//       };
//       await updateActivitys({ timestamp: createdAt });
//     } catch (error) {
//       console.error("Error updating activity logs:", error);
//     } finally {
//       hideSpinner();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", padding: "40px" }}>
//       <Box
//         sx={{
//           borderRadius: "18px",
//           backgroundColor: "#FFFFFF",
//           width: "100%",
//           height: "100vh",
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center", // Ensures vertical alignment
//             padding: "20px 40px",
//             borderBottom: "2px solid #E0E0E0", // Adds a subtle divider
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#495057",
//               fontSize: "32px",
//               fontWeight: "bold",
//               lineHeight: "40px",
//             }}
//           >
//             Activity Log
//           </Typography>

//           {/* Date Filters */}
//           <Box sx={{ display: "flex", gap: "20px" }}>
//             {/* From Date */}
//             <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
//               <FormLabel sx={{ color: "#232323", fontWeight: 500, fontSize: "16px" }}>
//                 From
//               </FormLabel>
//               <TextField
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 sx={{
//                   cursor: "pointer",
//                   "& .MuiInputBase-input": { cursor: "pointer" },
//                   backgroundColor: "#F9F9F9",
//                   borderRadius: "6px",
//                   padding: "5px",
//                 }}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </FormControl>

//             {/* To Date */}
//             <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
//               <FormLabel sx={{ color: "#232323", fontWeight: 500, fontSize: "16px" }}>
//                 To
//               </FormLabel>
//               <TextField
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => handleToChange(e.target.value)}
//                 disabled={!fromDate}
//                 sx={{
//                   cursor: "pointer",
//                   "& .MuiInputBase-input": { cursor: "pointer" },
//                   backgroundColor: "#F9F9F9",
//                   borderRadius: "6px",
//                   padding: "5px",
//                 }}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </FormControl>
//           </Box>
//         </Box>

//         {/* Activity Log Content */}
//         <Paper sx={{ boxShadow: "none", marginTop: "20px", padding: "20px" }}>
//           <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
//             <TimelineComponent activity_logs={activityLogs?.data} />
//           </Box>

//           {/* Pagination */}
//           <CustomPagination
//             totalPages={activityLogs?.pagination?.totalPages || 1}
//             currentPage={page}
//             setCurrentPage={setPage}
//             updateActivitys={updateActivitys}
//           />
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default ActivityLogsPage;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import TimelineComponent from "features/instructor-pages/activity-logs-page/components/Timeline";
import CustomPagination from "features/instructor-pages/activity-logs-page/components/customPaginaton";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivity } from "features/instructor-pages/activity-logs-page/redux/thunks";
import {
  selectInstructorActivityLogs,
  selectLoading,
} from "features/instructor-pages/activity-logs-page/redux/selectors";
import { useSpinner } from "context/SpinnerProvider";

const ActivityLogsPage = () => {
  const dispatch = useDispatch();
  const activityLogs = useSelector(selectInstructorActivityLogs);
  const loading = useSelector(selectLoading);
  const { showSpinner, hideSpinner } = useSpinner();

  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const updateActivityLogs = async (data = {}) => {
    dispatch(getAllActivity({ page, ...data }));
  };

  useEffect(() => {
    updateActivityLogs();
  }, [page]); // Fetch data when page changes

  const handleFromDateChange = (value) => {
    setFromDate(value);
    setToDate(""); // Reset 'To' date when 'From' date changes
  };

  const handleToChange = async (value) => {
    try {
      showSpinner();
      setToDate(value);
      const createdAt = {
        $gte: new Date(fromDate).toISOString(),
        $lte: new Date(value).toISOString(),
      };
      await updateActivityLogs({ timestamp: createdAt });
    } catch (error) {
      console.error("Error updating activity logs:", error);
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "40px" }}>
      <Box
        sx={{
          borderRadius: "5px",
          backgroundColor: "#FFFFFF",
          width: "100%",
          minHeight: "100vh",
          paddingBottom: "20px",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            borderBottom: "2px solid #E0E0E0",
          }}
        >
          <Typography
            sx={{
              color: "#495057",
              fontSize: "32px",
              fontWeight: "bold",
              lineHeight: "40px",
            }}
          >
            Activity Log
          </Typography>

          {/* Date Filters */}
          <Box sx={{ display: "flex", gap: "20px" }}>
            {/* From Date */}
            <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <FormLabel sx={{ color: "#232323", fontWeight: 500, fontSize: "16px" }}>
                From
              </FormLabel>
              <TextField
                type="date"
                value={fromDate}
                onChange={(e) => handleFromDateChange(e.target.value)}
                sx={{
                  cursor: "pointer",
                  "& .MuiInputBase-input": { cursor: "pointer" },
                  backgroundColor: "#F9F9F9",
                  borderRadius: "6px",
                }}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>

            {/* To Date */}
            <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
              <FormLabel sx={{ color: "#232323", fontWeight: 500, fontSize: "16px" }}>
                To
              </FormLabel>
              <TextField
                type="date"
                value={toDate}
                onChange={(e) => handleToChange(e.target.value)}
                disabled={!fromDate}
                sx={{
                  cursor: "pointer",
                  "& .MuiInputBase-input": { cursor: "pointer" },
                  backgroundColor: "#F9F9F9",
                  borderRadius: "6px",
                }}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Box>
        </Box>

        {/* Activity Log Content */}
        <Paper sx={{ boxShadow: "none", marginTop: "20px", padding: "20px" }}>
          <Box sx={{ maxHeight: "500px", overflowY: "auto", padding: "10px" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </Box>
            ) : activityLogs?.data?.length > 0 ? (
              <TimelineComponent activity_logs={activityLogs?.data} />
            ) : (
              <Typography sx={{ textAlign: "center", padding: "20px", color: "#6c757d" }}>
                No activity logs found for the selected filters.
              </Typography>
            )}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CustomPagination
              totalPages={activityLogs?.pagination?.totalPages || 1}
              currentPage={page}
              setCurrentPage={setPage}
              updateActivitys={updateActivityLogs}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ActivityLogsPage;
