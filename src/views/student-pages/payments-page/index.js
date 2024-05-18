import React from 'react';
import { Box, Typography, Grid, Card, Divider ,Button} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Payments = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '50vh',
      }}
    >
      <Typography variant="h3" sx={{ color: 'black',marginTop:'50px' }}>
        Bill Invoice / Receipt
      </Typography>
      <Grid container spacing={2} padding={3}>
      <Grid item xs={12}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%', padding:2 }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: 'black', fontWeight: 'bold' }}>Email:</span> marketplace@edutech.in
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: 'black', fontWeight: 'bold' }}>Contact:</span> 09689779899
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: 'black', fontWeight: 'bold' }}>Website:</span> www.marketplace.com
      </div>
      </Box>
      </Grid>

      <Grid container spacing={2} padding={3}>
      <Grid item xs={12} md={4}>
      <Box>
        <Typography sx={{ color: 'black', fontWeight: 'bold', marginBottom: 2 }}>Student Details</Typography>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'black', fontWeight: 'bold' }}>Name:</span> Justine Dave M. Delos Reyes
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'black', fontWeight: 'bold' }}>Student ID:</span> Stu02311#
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'black', fontWeight: 'bold' }}>Email:</span> student@marketplace@edutech.com
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'black', fontWeight: 'bold' }}>Contact:</span> 9857362898
        </div>
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box>
        <Typography sx={{ color: 'black', fontWeight: 'bold', marginBottom: 2 }}>Course Details</Typography>
        <Box sx={{ '& > div': { marginBottom: 2 } }}>
          <div style={{ color: 'black' }}>Java Full Professional Course...</div>
          <div>
            <span style={{ color: 'black', fontWeight: 'bold' }}>By:</span> Rajalakshmi Institute
          </div>
          <div>
            <span style={{ color: 'black', fontWeight: 'bold' }}>Duration:</span> 6 Months
          </div>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box>
        <Typography sx={{ color: 'black', fontWeight: 'bold', marginBottom: 2 }}>Fees Details</Typography>
        <Box sx={{ '& > div': { marginBottom: 2 } }}> {/* Apply marginBottom to each child div */}
          <div style={{ color: '#32cd32', fontWeight: 'bold' }}>1,00,000</div>
          <div>
            <span style={{ color: 'black', fontWeight: 'bold' }}>Pending:</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>16,000</span>
          </div>
          <div>
            <span style={{ color: '#32cd32', fontWeight: 'bold' }}>Paid:</span> 84,000
          </div>
        </Box>
      </Box>
    </Grid>
      </Grid>
      <Grid container spacing={2} py={5} padding={3}>
        <Grid item xs={12}>
          <div>
            <span style={{ color: 'black', fontWeight: 'bold', paddingLeft: 4 }}>Paid Amount</span> 23 May 2024, 5:38pm
          </div>
          <Typography sx={{ color: '#32cd32', paddingLeft: 2 }}>$ 23,000</Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', height: '150%', marginBottom: 2,padding:2 }}>
  <Card
    sx={{
      width: '100%', 
      height: '150%', // Set Card height to 100%
      borderRadius: "0px", // Adjusted border radius
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      display: 'flex', // Add display flex to align content
      flexDirection: 'column', // Stack children vertically
      padding: 2, // Added padding to all sides
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Typography sx={{ color: '#00308F', fontWeight: 'bold', paddingLeft: 2, marginBottom: 2 }}>TRANSACTION</Typography>
    </Box>
    {/* <Divider sx={{ width: '100%', backgroundColor: 'darkblue' }} />  */}
    <Divider sx={{ width: '100%', backgroundColor: 'darkblue', marginBottom: 3 }} />

    <TableContainer>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow style={{ backgroundColor: '#00308F' }}>
            <TableCell style={{ color: 'white' }}>payment Type</TableCell>
            <TableCell style={{ color: 'white' }}>Gst</TableCell>
            <TableCell style={{ color: 'white' }}>Other Tax</TableCell>
            <TableCell style={{ color: 'white' }}>Total Amount</TableCell>
            <TableCell style={{ color: 'white' }}>Cash / Online</TableCell>
            <TableCell style={{ color: 'white' }}>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableRow style={{ backgroundColor: '#6CB4EE', color: 'black' }}> 
          <TableCell>Monthly</TableCell>
          <TableCell>1800.00</TableCell>
          <TableCell>200</TableCell>
          <TableCell>23,000</TableCell>
          <TableCell>Online</TableCell>
          <TableCell>Gpay</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
        </Card>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginTop={2}>
      <Grid item>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Status:</Typography>
      </Grid>
      <Grid item >
      <Button
      variant="contained"
      sx={{
        backgroundColor: '#32cd32', 
        color: '#ffffff', // White text color for better contrast
      }}
    >
      Payment Success
    </Button>

      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginTop={2}>
      <Grid item xs={2}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Signature</Typography>
  </Grid>
  </Grid>
  <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginTop={2}>
      <Grid item xs={2}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrLPjwltYNyYnTusgY2cC9sjvfmWfa0aj0LIywobmKd7lPIAEYOXjy5Q1JtSxpQmzbzk&usqp=CAU" alt="Signature" style={{ maxWidth: '50%', height: '50%' }} />
  </Grid>
  <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginTop={2}>
      <Grid item xs={6}>
      <Typography sx={{ color: 'black', fontWeight: 'bold',fontSize:'15px' }}>Thank You</Typography>
  </Grid>
  </Grid>
  </Grid>
  </Grid>
      </Box>
      </Grid>
    </Box>
    
  );
};

export default Payments;
