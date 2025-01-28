import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";


const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [openCancelDialog, setOpenCancelDialog] = useState(false);


    const handleCancel = () => {
        setOpenCancelDialog(true);
      };
    
      const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
      };
    

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
      };
      
  
    return (   
        <Box  sx={{
          backgroundColor: "lightgray", 
          padding: "18px", 
          borderRadius: "8px", 
        }}>
        <Typography
          variant="body1"
          style={{
            color: "#151010",
            fontFamily: "Nunito Sans",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "32px",
          }}
        >
          Payment Method
        </Typography>
  
        <Grid container spacing={2} sx={{pl:2 ,pt:4}}>
          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              row
            >
            <Box
                border="1.5px solid #E0E0E0"
                borderRadius="6px"
                bgcolor="#FFF"
                gap="30px"
                marginRight="10px"
                display="flex"
                width="100px"
                height="49px"
                paddingLeft="10px"
                alignItems="center"
                >
                <FormControlLabel
                  value="gpay"
                  control={<Radio />}
                  label="G Pay"
                />
              </Box>
              <Box
                border="1.5px solid #E0E0E0"
                borderRadius="6px"
                bgcolor="#FFF"
                gap="30px"
                marginRight="10px"
                display="flex"
                width="120px"
                height="49px"
                paddingLeft="10px"
                alignItems="center"
                >
                <FormControlLabel
                  value="phonepe"
                  control={<Radio />}
                  label="PhonePe"
                />
              </Box>
              <Box
                border="1.5px solid #E0E0E0"
                borderRadius="6px"
                bgcolor="#FFF"
                gap="30px"
                marginRight="10px"
                display="flex"
                width="100px"
                height="49px"
                paddingLeft="10px"
                alignItems="center"
                flexShrink={0}
                marginBottom="30px"
                >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Card"
                />
              </Box>
            </RadioGroup>
          </FormControl>
  
          {paymentMethod === "card" && (
            <>
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    select
                    variant="outlined"
                    margin="normal"
                  >
                    <MenuItem value="India">India</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Postal code"
                    placeholder="04548"
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              </>
          )}

            {paymentMethod === "gpay" && (
            <>
            <TextField
                fullWidth
                label="UPI ID"
                placeholder="Enter UPI ID"
                variant="outlined"
                margin="normal"
            />
            </>
            )} 

          {paymentMethod === "phonepe" && (
            <>
            <TextField
                fullWidth
                label="UPI ID"
                placeholder="Enter UPI ID"
                variant="outlined"
                margin="normal"
            />
            </>
            )}

        </Grid>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right', gap: '16px', marginTop: '16px' }}>
        <Button variant="outlined" style={{ width: '100px' }}  onClick={handleCancel}>
        Cancel
      </Button>
          <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={handleCancel}>
            Pay
          </Button>
        </div>
        <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
        style={{ padding: "5px"}}
      >
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText
            style={{ color: "black" }}
            id="cancel-dialog-description"
          >
            Do you want to discard?
          </DialogContentText>
          <DialogContentText
            style={{ color: "#8B8B8B" ,paddingTop:'10px'}}
            id="cancel-dialog-description2"
          >
           Entered details will gone if discard
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseCancelDialog}
            style={{
              border: "1px solid #0043b0",
              borderRadius: "30px",
              width: "100px",
              height: "30px",
              fontSize: "12px",
              marginRight: "50px",
              color: "#0043b0",
              "&:hover": { color: "white", backgroundColor: "#005cf2" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseCancelDialog}
            style={{
              border: "1px solid #0043b0",
              borderRadius: "30px",
              width: "100px",
              height: "30px",
              fontSize: "12px",
              marginRight: "12px",
              color: "#FFFFFF",
              backgroundColor: "#005cf2",
              "&:hover": {
                color: "#000000",
                backgroundColor: "#005cf2",
              },
            }}
            autoFocus
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      </Box>

      

      
        
  )
}

export default PaymentMethod

