import React, { useState } from 'react';
import { Grid, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Box, Typography, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSpinner } from 'context/SpinnerProvider';
import { changeInstructorPassword } from '../services';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const PasswordReset = () => {
  const [showCurrentPassword,setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSpinner, hideSpinner } = useSpinner();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validationSchema = Yup.object().shape({
    current_password : Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New Password is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Re-type New Password is required'),
  });

  const handleUpdatePassword = async (values, { resetForm }) => {
    try {
      showSpinner();
      const data = { oldPassword: values.current_password, newPassword : values?.confirmPassword }
    
      const response = await changeInstructorPassword(data);
      toast.success('Password changed successfully');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: '600', mb: 2 }}>
        Change Password
      </Typography>
      <Formik
        initialValues={{ password: '', confirmPassword: '', current_password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleUpdatePassword}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Grid
              item
              xs={12}
              gap={8}
              sx={{
                backgroundColor: '#eef1f7',
                padding: '40px 40px 40px 40px',
                display: 'flex',
                flexDirection: 'row',
              }}
              spacing={2}
            >
              <Grid item xs={12} md={12}>
                <FormControl fullWidth variant="outlined" error={touched.current_password && Boolean(errors.current_password)}>
                  <InputLabel htmlFor="current-password">Current Password</InputLabel>
                  <OutlinedInput
                    id="current-password"
                    name="current_password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    sx={{ backgroundColor: 'white' }}
                    value={values.current_password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>setShowCurrentPassword(!showCurrentPassword)}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password"
                  />
                  {touched.password && Boolean(errors.current_password) && (
                    <Typography variant="caption" color="error">
                      {errors.current_password}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth variant="outlined" error={touched.password && Boolean(errors.password)}>
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    sx={{ backgroundColor: 'white' }}
                    value={values.password}
                    onChange={handleChange}
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
                  {touched.password && Boolean(errors.password) && (
                    <Typography variant="caption" color="error">
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth variant="outlined" error={touched.confirmPassword && Boolean(errors.confirmPassword)}>
                  <InputLabel htmlFor="confirm-password">Re-type New Password</InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter your new password again"
                    sx={{ backgroundColor: 'white' }}
                    value={values.confirmPassword}
                    onChange={handleChange}
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
                  {touched.confirmPassword && Boolean(errors.confirmPassword) && (
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box>
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} type="submit">
                  Change Password
                </Button>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordReset;
