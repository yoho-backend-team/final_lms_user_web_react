import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

const ImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 20,
});

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 8,
});

const CustomDialog = ({open,setWallpaperOpen}) => {
 

  return (
      <Dialog open={open} onClose={()=>setWallpaperOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Wallpaper</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" color="text.secondary">
            Changed wallpaper will appear on the background of the chat
          </Typography>
          <ImageContainer>
            <Image src="your-image-url" alt="Wallpaper Preview" />
          </ImageContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" component="label">
            Choose from Computer
            <input type="file" hidden />
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CustomDialog;
