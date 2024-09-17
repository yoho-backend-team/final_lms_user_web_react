import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Paper, FormControl, FormLabel, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import CustomPagination from './customPagination';
import TimelineComponent from './Timeline';
import { getAllStudentActivity } from '../services';

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
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [activityLogs, setActivityLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false); 
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchActivityLogs = async () => {
      setLoading(true); 
      try {
        const logs = await getAllStudentActivity();
        setActivityLogs(logs);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching activity logs:', error);
        setLoading(false); 
      }
    };

    fetchActivityLogs();
  }, []);

 
  useEffect(() => {
    const filterLogs = () => {
      let filtered = activityLogs;

      if (fromDate) {
        const from = new Date(formatDateToISO(fromDate));
        filtered = filtered.filter((log) => new Date(log.createdAt) >= from);
        
      }

      if (toDate) {
        const to = new Date(formatDateToISO(toDate));
        filtered = filtered.filter((log) => new Date(log.createdAt) <= to);
        
      }

      setFilteredLogs(filtered);
      setPage(1); 
    };

    filterLogs();
  }, [fromDate, toDate, activityLogs]);

  
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

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
                ) : (
                  <TimelineComponent logs={paginatedLogs} filterData={filteredLogs} />
                )}
              </Box>
              {!loading && (
                <CustomPagination
                  totalPages={totalPages}
                  currentPage={page}
                  setCurrentPage={setPage}
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
