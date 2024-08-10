import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Box, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Box>
      <Typography sx={{ fontSize: "18px", fontWeight: "600", mb: 2 }}>Change Password</Typography>
      <Grid item xs={12} gap={8} sx={{ backgroundColor: "#eef1f7", padding : "40px 40px 40px 40px", display: "flex", flexDirection: "row"}} spacing={2}>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="new-password">New Password</InputLabel>
            <OutlinedInput
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              sx={{ backgroundColor: "white"}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="confirm-password">Re-type New Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter your new password again"
              sx={{ backgroundColor: "white"}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Re-type New Password"
            />
          </FormControl>
        </Grid>
      </Grid>
      </Box>
  );
};

export default PasswordReset;
