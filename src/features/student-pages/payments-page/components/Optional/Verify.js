import { Box, Grid, Typography,   Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Button,} from '@mui/material';
import React, { useState } from 'react'

const Verify = ({paymentMethod}) => {
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    
    const handleCancel = () => {
        setOpenCancelDialog(true);
      };
    
      const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
      };
    
 
    return (
    <Box>
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
      Card Code
    </Typography>
    <Grid container spacing={2} sx={{pl:2 ,pt:4}}>

            <TextField
            fullWidth
            label="Card number"
            placeholder="#### #### #### ####"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
                shrink: true, 
            }}
            InputProps={{
                readOnly: true, 
            }}
            />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Code"
                    variant="outlined"
                    margin="normal"
                    />
                </Grid>                          
              </Grid>
  

         </Grid>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right', gap: '16px', marginTop: '16px' }}>
        <Button variant="outlined" style={{ width: '100px' }}  onClick={handleCancel}>
        Cancel
      </Button>
          <Button variant="contained" color="primary" style={{ width: '100px' }}>
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

export default Verify