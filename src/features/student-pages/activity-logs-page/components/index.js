import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Paper, FormControl, FormLabel, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import CustomPagination from './customPagination';
import TimelineComponent from './Timeline';
import { fetchActivityLogs } from '../redux/thunks';
import { selectStudentActivityLogs } from '../redux/selectors';
import { useDispatch,useSelector } from 'react-redux';
import NoDataImage from '../../../../assets/no-data.jpg';

const styledInput = styled('input')({
  padding: '11.8px 14.8px 12px 14.8px',
  border: '0.74px solid #C1C1C1',
  borderRadius: '11px',
  background: '#FFFFFF',
});

const formatDateToISO = (dateStr) => {
  const [day, month, year] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};



const ActivityStudentLog = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const activityLogs = useSelector(selectStudentActivityLogs);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false); 
  const rowsPerPage = 5;


  const updateActivitys = async (data) => {
    dispatch(fetchActivityLogs(data));
  };

  useEffect(() => {
    updateActivitys();
  }, [dispatch]);


  console.log(activityLogs,"v")
 
  useEffect(() => {
    const filterLogs = () => {
      console.log('From Date:', fromDate); // Log fromDate
      console.log('To Date:', toDate); 
      let filtered = activityLogs?.data || [];

      if (fromDate) {
        const from = new Date(formatDateToISO(fromDate));
        filtered = filtered.filter((log) => new Date(log.createdAt) >= from);
        console.log('From Date:', filtered); // Log fromDate
       

        
        
      }

      if (toDate) {
        const to = new Date(formatDateToISO(toDate));
        filtered = filtered.filter((log) => new Date(log.createdAt) <= to);
        console.log('To Date:', filtered); 
        
      }

      setFilteredLogs(filtered);
      setPage(1); 
    };

    filterLogs();
  }, [fromDate, toDate, activityLogs]);

  
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
console.log(filteredLogs,"paginatedLogs")
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '60px 40px 20px 40px',
        }}
      >
        <Box
          sx={{
            borderRadius: '18px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.10)',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '30px 45px 28px 30px',
            }}
          >
            <Typography
              sx={{
                color: '#495057',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '24px',
              }}
            >
              Activity Log
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <FormControl
                sx={{
                  display: 'inline-flex',
                  gap: '6px',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormLabel sx={{ color: '#232323', fontWeight: 400, fontSize: '12.8px' }}>
                  From
                </FormLabel>
                <TextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    if (e.target.value && !toDate) {
                      setToDate(''); // Clear "To" date if "From" date is set and "To" date is not set
                    }
                  }}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput }}
                   placeholder="DD-MM-YYYY"
                />
              </FormControl>
              <FormControl
                sx={{
                  display: 'inline-flex',
                  gap: '6px',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormLabel sx={{ color: '#232323', fontWeight: 400, fontSize: '12.8px' }}>
                  To
                </FormLabel>
                <TextField
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  sx={{ marginRight: 2 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputComponent: styledInput }}
                  disabled={!fromDate} // Disable "To" date picker if "From" date is not selected
                   placeholder="DD-MM-YYYY"
                />
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Paper sx={{ boxShadow: 'none' }}>
              <Box sx={{ maxHeight: 500, overflow: 'auto', padding: 2 }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ): paginatedLogs.length > 0 ? (
                  <TimelineComponent logs={paginatedLogs} filterData={filteredLogs} />
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <img
        src={NoDataImage} // Replace with your empty state image path
        alt="No logs available"
        style={{ maxWidth: '150px', marginBottom: '16px' }} // Adjust size as needed
      />
      <Typography>No logs available for the selected date range.</Typography>
    </Box>
  )}
</Box>
              {!loading && (
                <CustomPagination
                 totalPages={activityLogs?.pagination?.totalPages}
              currentPage={activityLogs?.pagination?.currentPage}
              setCurrentPage={setPage}
                  updateActivitys={updateActivitys}
                />
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ActivityStudentLog;