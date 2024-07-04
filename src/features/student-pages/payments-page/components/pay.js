import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Rating from '@mui/material/Rating';
import courseImage from "../../../../assets/images/dummy/course.jpg";
import hours from "../../../../assets/images/icons/hours.svg";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [ratingValue, setRatingValue] = useState(4);
  const isXs = false;

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{
            color: '#151010',
            fontFamily: 'Nunito Sans',
            fontSize: isXs ? '18px' : '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: isXs ? '26px' : '32px'
          }}>
            Course Details
          </Typography>
          <hr style={{ borderTop: '1px solid #ccc', width: '100%' }} />
          <Box
            p={2}
            border={1}
            borderRadius={2}
            textAlign="center"
            sx={{
              borderRadius: '20px',
              border: '1px solid #C3C3C3',
              background: '#FFF',
              display: 'flex',
              alignItems: 'left',
              width: '100%',
              height: '96.515px',
              justifyContent: 'left',
              flexShrink: 0,
              padding: 'none !important'
            }}
          >
            <Box
              sx={{
                width: '40%',
                height: '100%',
                display: 'flex',
                backgroundImage: 'cover',
                backgroundAttachment: 'fixed',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <img
                src={courseImage}
                alt="courseImage"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                }}
              />
            </Box>

            <Box
              sx={{
                justifyContent: 'left',
                paddingLeft: '10px',
                paddingTop: '10px'
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#000',
                  fontFamily: 'Nunito Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '20px',
                }}
              >
                Java Full Professional Course...
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#000',
                  fontFamily: 'Nunito Sans',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '20px',
                  textAlign: 'left'
                }}
              >
                By Rajalakshmi Institute
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '5px',
                }}
              >
                <img
                  src={hours}
                  alt="hours"
                  style={{
                    width: '9.841px',
                    height: '9.841px',
                    marginRight: '5px',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: '#000',
                    fontFamily: 'Nunito Sans',
                    fontSize: '13px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '9.841px',
                  }}
                >
                  12hrs
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: '#474747',
                  fontFamily: 'Nunito Sans',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '9.841px',
                  textDecoration: 'line-through',
                  textAlign: 'right',
                  marginRight: '-10px'
                }}
              >
                ₹ 5,800
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Rating value={ratingValue} readOnly />
                <span style={{
                  fontFamily: 'Nunito Sans',
                  fontSize: '13px',
                  fontWeight: '350',
                  fontStyle: 'normal',
                  marginLeft: '-20px'
                }}>
                  ( 2,387 )
                </span>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#009919',
                    fontFamily: 'Nunito Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    lineHeight: '9.841px',
                    paddingTop: '5px',
                    marginRight: '-10px'
                  }}
                >
                  ₹ 3,450
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} row>
                <FormControlLabel value="gpay" control={<Radio />} label="G Pay" />
                <FormControlLabel value="phonepe" control={<Radio />} label="PhonePe" />
                <FormControlLabel value="card" control={<Radio />} label="Card" />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'card' && (
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Card number"
                  placeholder="1234 1234 1234 1234"
                  variant="outlined"
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry"
                      placeholder="MM / YY"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVC"
                      placeholder="CVC"
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Country"
                  select
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="India">India</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Postal code"
                  placeholder="04548"
                  variant="outlined"
                  margin="normal"
                />
              </Box>
            )}
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Pay
              </Button>
            </Box>
            <Box mt={1}>
              <Button variant="outlined" fullWidth>
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
