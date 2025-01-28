import React from 'react';
import bgstu from "../../../../../assets/images/background/studentmain.png"
import { Box, Grid, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
            <Grid item xs={12} 
            style={{ textAlign: 'center',
                     border: '2px solid #14c45a', 
                     borderRadius: '8px',
                     backgroundColor:'lightgray',
                     padding: '20px',
                      }}>
                <Box>
                    <CheckCircleIcon sx={{color:"#14c45a", width:'200px', height:'100px'}}/>         
                    <Typography variant="body1" 
                    sx={{ 
                    color: 'blue', 
                    fontSize: '24px', 
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700 
                    }}>
                        Successfully Paid
                    </Typography>
                </Box>
                <Box 
                sx={{ 
                    display: 'flex',
                     justifyContent: 'space-between', 
                     maxWidth: '400px', 
                     margin: '10px auto',
                     borderBottom: '2px solid #ddd', 
                     paddingBottom: '5px',
                      }}>
                <Typography 
                    variant="body1"
                 sx={{
                     color: '#495057',
                     fontSize: '14px', 
                     fontFamily: 'Nunito Sans',
                     fontWeight: 400
                    }}>
                        April Payment ( Monthly )
                </Typography>
                <Typography 
                    variant="body1" 
                 sx={{ 
                    color: '#495057', 
                    fontSize: '14px', 
                    fontFamily: 'Nunito Sans', 
                    fontWeight: 400 
                    }}>
                        21,000 INR
                </Typography>
                </Box>
                <Box 
                sx={{
                     display: 'flex', 
                     justifyContent: 'space-between', 
                     maxWidth: '400px', 
                     margin: '10px auto',
                     borderBottom: '2px solid #ddd',
                     }}>
                <Typography 
                 variant="body1"
                 sx={{
                     color: '#495057',
                     fontSize: '14px', 
                     fontFamily: 'Nunito Sans',
                     fontWeight: 400
                    }}>
                            GST tax
                </Typography>
                <Typography 
                variant="body1"
                 sx={{
                     color: '#495057', 
                     fontSize: '14px', 
                     fontFamily: 'Nunito Sans', 
                     fontWeight: 400
                     }}>
                        1800.00 INR
                 </Typography>
                </Box>
                <Box 
                sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     maxWidth: '400px', 
                     margin: '10px auto',
                     borderBottom: '2px solid #ddd', 
                     }}>
                <Typography 
                  variant="body1" 
                sx={{ 
                    color: '#495057',
                    fontSize: '14px', 
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400
                   }}>
                        Other Tax
                </Typography>
                <Typography
                     variant="body1"
                 sx={{ 
                    color: '#495057', 
                    fontSize: '14px', 
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400 
                    }}>
                        200 INR
                </Typography>
                </Box>
                <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    maxWidth: '400px', 
                    margin: '10px auto' ,
                    borderBottom: '2px solid #ddd', 
                    }}>
               <Typography 
                  variant="body1" 
                sx={{
                     color: '#151010', 
                     fontSize: '14px', 
                     fontFamily: 'Nunito Sans',
                      fontWeight: 400 
                      }}>
                        Total Amount
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: '#151010',
                         fontSize: '14px', 
                         fontFamily: 'Nunito Sans', 
                         fontWeight: 400 
                         }}>
                            23,000 INR
                </Typography>
                </Box>
                <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: '60px',
                    marginTop: '20px' 
                    }}>
                    <Button variant="contained" color="secondary" >Download Receipt</Button>
                    <Button variant="contained" color="secondary">Continue</Button>
                </Box>
              </Grid>
            
        
        </Grid>
    );
}

export default Success;
